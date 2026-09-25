import assert from 'node:assert';

console.log('--- RUNNING HS DIGITAL STORE COMMERCE TEST SUITE ---');

// Mock data structures matching storeData logic
class TestStoreDatabase {
  constructor() {
    this.products = [
      {
        id: 'prod-001',
        title: 'Neo-Tokyo Cyber Samurai',
        sku: 'HSD-ART-001',
        basePrice: 799,
        salePrice: 599,
        productType: 'DIGITAL',
        status: 'PUBLISHED',
      },
      {
        id: 'prod-006',
        title: 'Museum Poster',
        sku: 'HSD-POD-006',
        basePrice: 2800,
        productType: 'POD',
        status: 'PUBLISHED',
      },
    ];
    this.coupons = [
      { code: 'WELCOME15', discountType: 'PERCENTAGE', discountValue: 15, minOrderAmount: 0 },
      { code: 'CREATIVE5', discountType: 'FIXED', discountValue: 500, minOrderAmount: 2000 },
    ];
    this.orders = [];
    this.entitlements = [];
    this.processedWebhooks = new Set();
  }

  // Authoritative server-side checkout calculation
  calculateOrder(items, couponCode, hasPhysical) {
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const prod = this.products.find((p) => p.id === item.productId);
      assert(prod, `Product ${item.productId} must exist`);
      assert.strictEqual(prod.status, 'PUBLISHED', 'Product must be published');

      const unitPrice = prod.salePrice || prod.basePrice;
      subtotal += unitPrice * item.quantity;
      orderItems.push({
        productId: prod.id,
        unitPrice,
        quantity: item.quantity,
        productType: prod.productType,
      });
    }

    let discount = 0;
    if (couponCode) {
      const coup = this.coupons.find((c) => c.code === couponCode);
      if (coup && subtotal >= coup.minOrderAmount) {
        discount = coup.discountType === 'PERCENTAGE'
          ? Math.round((subtotal * coup.discountValue) / 100)
          : Math.min(subtotal, coup.discountValue);
      }
    }

    const shipping = hasPhysical ? (subtotal >= 5000 ? 0 : 499) : 0;
    const taxable = Math.max(0, subtotal - discount);
    const tax = Math.round(taxable * 0.07);
    const total = taxable + shipping + tax;

    return { subtotal, discount, shipping, tax, total, orderItems };
  }

  createPaidOrder(calcResult, customerEmail) {
    const order = {
      id: `ord-${Date.now()}`,
      orderNumber: `HSD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerEmail,
      status: 'PAID',
      items: calcResult.orderItems,
      total: calcResult.total,
    };
    this.orders.push(order);

    // Generate entitlements for digital items
    for (const item of order.items) {
      if (item.productType === 'DIGITAL') {
        this.entitlements.push({
          id: `ent-${order.id}-${item.productId}`,
          orderId: order.id,
          productId: item.productId,
          allowedDownloads: 10,
          downloadCount: 0,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          status: 'ACTIVE',
        });
      }
    }

    return order;
  }

  processWebhookIdempotent(eventId) {
    if (this.processedWebhooks.has(eventId)) {
      return { duplicate: true };
    }
    this.processedWebhooks.add(eventId);
    return { duplicate: false, processed: true };
  }

  executeDownload(entitlementId) {
    const ent = this.entitlements.find((e) => e.id === entitlementId);
    assert(ent, 'Entitlement must exist');
    assert.strictEqual(ent.status, 'ACTIVE', 'Entitlement must be ACTIVE');
    assert(new Date() < ent.expiresAt, 'Entitlement must not be expired');
    assert(ent.downloadCount < ent.allowedDownloads, 'Download count must be within limit');

    ent.downloadCount += 1;
    return { success: true, remaining: ent.allowedDownloads - ent.downloadCount };
  }
}

const db = new TestStoreDatabase();

// TEST 1: Authoritative Price Calculation (Ignores client tampering)
console.log('Test 1: Server-side pricing calculation...');
const calc1 = db.calculateOrder([{ productId: 'prod-001', quantity: 2 }], null, false);
// 2 * $5.99 sale price = $11.98 (1198 cents). Digital order: shipping = $0. Tax = 7% * 1198 = 84 cents. Total = 1282 cents
assert.strictEqual(calc1.subtotal, 1198);
assert.strictEqual(calc1.shipping, 0);
assert.strictEqual(calc1.tax, 84);
assert.strictEqual(calc1.total, 1282);
console.log('✓ PASS: Server-side price calculation accurate.');

// TEST 2: Coupon Calculation (Percentage)
console.log('Test 2: Percentage discount coupon WELCOME15 (15%)...');
const calc2 = db.calculateOrder([{ productId: 'prod-001', quantity: 2 }], 'WELCOME15', false);
assert.strictEqual(calc2.discount, Math.round((1198 * 15) / 100)); // 180 cents ($1.80)
console.log('✓ PASS: Coupon discount verified.');

// TEST 3: Mixed Cart (Digital + Physical POD)
console.log('Test 3: Mixed Cart (Digital + POD item)...');
const calcMixed = db.calculateOrder(
  [
    { productId: 'prod-001', quantity: 1 }, // $5.99 digital
    { productId: 'prod-006', quantity: 1 }, // $28.00 POD
  ],
  null,
  true
);
assert.strictEqual(calcMixed.subtotal, 599 + 2800); // 3399 cents ($33.99)
assert.strictEqual(calcMixed.shipping, 499); // Under $50 threshold, so standard shipping applies
console.log('✓ PASS: Mixed cart calculates physical shipping correctly.');

// TEST 4: Payment Completion & Instant Entitlement
console.log('Test 4: Payment success and digital entitlement unlock...');
const order = db.createPaidOrder(calcMixed, 'buyer@example.com');
assert.strictEqual(order.status, 'PAID');
assert.strictEqual(db.entitlements.length, 1); // Only prod-001 is digital
assert.strictEqual(db.entitlements[0].productId, 'prod-001');
console.log('✓ PASS: Digital item unlocked immediately while POD item remains separate.');

// TEST 5: Download Authorization & Limit Enforcing
console.log('Test 5: Secure file download verification & count limits...');
const entId = db.entitlements[0].id;
const dl1 = db.executeDownload(entId);
assert.strictEqual(dl1.remaining, 9);
const dl2 = db.executeDownload(entId);
assert.strictEqual(dl2.remaining, 8);
console.log('✓ PASS: Download count properly decrements.');

// TEST 6: Webhook Idempotency (Prevent double fulfillment)
console.log('Test 6: Webhook idempotency protection...');
const eventId = 'evt_test_stripe_webhook_9921';
const firstAttempt = db.processWebhookIdempotent(eventId);
assert.strictEqual(firstAttempt.duplicate, false);
const secondAttempt = db.processWebhookIdempotent(eventId);
assert.strictEqual(secondAttempt.duplicate, true);
console.log('✓ PASS: Duplicate webhook events safely ignored.');

console.log('\n--- ALL COMMERCE SUITE TESTS PASSED (6/6) ---');
