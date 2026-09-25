import { initialProducts, initialCategories, initialCollections, initialBlogPosts, InitialProduct } from '@/db/seed-data';

// Internal in-memory store instance with initial seed data
class StoreDatabase {
  private products: InitialProduct[] = JSON.parse(JSON.stringify(initialProducts));
  private categories = JSON.parse(JSON.stringify(initialCategories));
  private collections = JSON.parse(JSON.stringify(initialCollections));
  private blogPosts = JSON.parse(JSON.stringify(initialBlogPosts));
  private orders: any[] = [
    {
      id: 'ord-001',
      orderNumber: 'HSD-100291',
      customerId: 'usr-customer-1',
      customerEmail: 'alex.rivera@example.com',
      customerName: 'Alex Rivera',
      status: 'PAID',
      paymentStatus: 'SUCCEEDED',
      fulfillmentStatus: 'FULFILLED',
      currency: 'USD',
      subtotal: 599,
      discount: 0,
      shipping: 0,
      tax: 48,
      total: 647,
      createdAt: new Date('2026-09-20T14:30:00Z').toISOString(),
      paidAt: new Date('2026-09-20T14:30:15Z').toISOString(),
      items: [
        {
          id: 'item-001',
          productId: 'prod-001',
          productTitle: 'Neo-Tokyo Cyber Samurai — Original Anime Wall Art',
          sku: 'HSD-ART-001',
          quantity: 1,
          unitPrice: 599,
          productType: 'DIGITAL',
        },
      ],
    },
    {
      id: 'ord-002',
      orderNumber: 'HSD-100292',
      customerId: 'usr-customer-2',
      customerEmail: 'sarah.miller@example.com',
      customerName: 'Sarah Miller',
      status: 'PROCESSING',
      paymentStatus: 'SUCCEEDED',
      fulfillmentStatus: 'PROCESSING',
      currency: 'USD',
      subtotal: 3600,
      discount: 500,
      shipping: 499,
      tax: 288,
      total: 3887,
      createdAt: new Date('2026-09-24T09:15:00Z').toISOString(),
      paidAt: new Date('2026-09-24T09:15:20Z').toISOString(),
      items: [
        {
          id: 'item-002',
          productId: 'prod-006',
          variantId: 'HSD-POD-006-18X24',
          productTitle: 'Neo-Tokyo Cyber Samurai — Museum-Quality Archival Poster',
          sku: 'HSD-POD-006-18X24',
          variantDescription: '18 x 24 inches (45 x 60 cm)',
          quantity: 1,
          unitPrice: 3600,
          productType: 'POD',
          provider: 'PRINTIFY',
          providerProductId: 'printify_prod_7781',
          providerVariantId: 'printify_var_9912',
        },
      ],
    },
  ];

  private coupons: any[] = [
    {
      id: 'coup-1',
      code: 'WELCOME15',
      discountType: 'PERCENTAGE',
      discountValue: 15,
      minOrderAmount: 0,
      maxUses: 1000,
      timesUsed: 42,
      digitalOnly: false,
      physicalOnly: false,
      active: true,
    },
    {
      id: 'coup-2',
      code: 'CREATIVE5',
      discountType: 'FIXED',
      discountValue: 500, // $5.00
      minOrderAmount: 2000,
      maxUses: 500,
      timesUsed: 19,
      digitalOnly: false,
      physicalOnly: false,
      active: true,
    },
  ];

  private entitlements: any[] = [
    {
      id: 'ent-001',
      customerId: 'usr-customer-1',
      customerEmail: 'alex.rivera@example.com',
      orderId: 'ord-001',
      productId: 'prod-001',
      productTitle: 'Neo-Tokyo Cyber Samurai — Original Anime Wall Art',
      grantedAt: new Date('2026-09-20T14:30:15Z').toISOString(),
      expiresAt: new Date('2027-09-20T14:30:15Z').toISOString(),
      allowedDownloads: 10,
      downloadCount: 1,
      status: 'ACTIVE',
      files: [
        {
          filename: 'NeoTokyo_Samurai_2x3_Ratio_300DPI.zip',
          fileType: 'ZIP',
          fileSize: 42100000,
          storageKey: 'assets/prod-001/2x3.zip',
        },
        {
          filename: 'NeoTokyo_Samurai_3x4_Ratio_300DPI.zip',
          fileType: 'ZIP',
          fileSize: 36500000,
          storageKey: 'assets/prod-001/3x4.zip',
        },
        {
          filename: 'NeoTokyo_Samurai_4x5_Ratio_300DPI.zip',
          fileType: 'ZIP',
          fileSize: 31200000,
          storageKey: 'assets/prod-001/4x5.zip',
        },
        {
          filename: 'HSDigitalStore_Printing_Instructions.pdf',
          fileType: 'PDF',
          fileSize: 1450000,
          storageKey: 'assets/shared/printing_guide.pdf',
        },
      ],
    },
  ];

  private reviews: any[] = [
    {
      id: 'rev-001',
      productId: 'prod-001',
      customerId: 'usr-customer-1',
      customerName: 'Alex R.',
      rating: 5,
      review: 'Incredible sharpness! I printed the 24x36 at my local lab on matte archival paper and the neon reflections pop vividly. Outstanding quality.',
      status: 'APPROVED',
      verifiedPurchase: true,
      createdAt: new Date('2026-09-21').toISOString(),
    },
    {
      id: 'rev-002',
      productId: 'prod-002',
      customerId: 'usr-customer-3',
      customerName: 'Marcus T.',
      rating: 5,
      review: 'Looks like real oil paint on the Samsung Frame TV! The 4K resolution fits without any black bars.',
      status: 'APPROVED',
      verifiedPurchase: true,
      createdAt: new Date('2026-09-22').toISOString(),
    },
  ];

  private customOrders: any[] = [];
  private auditLogs: any[] = [
    {
      id: 'aud-001',
      adminEmail: 'admin@hsdigitalstore.com',
      action: 'INITIAL_STORE_SETUP',
      objectType: 'SYSTEM',
      objectId: 'INIT',
      metadata: { note: 'Independent commerce system initialized' },
      timestamp: new Date().toISOString(),
    },
  ];

  // PRODUCTS
  getProducts(filters?: {
    category?: string;
    collection?: string;
    productType?: string;
    search?: string;
    status?: string;
    sort?: string;
    featured?: boolean;
    bestSeller?: boolean;
    newArrival?: boolean;
  }) {
    let list = [...this.products];

    // Filter by status (default only published for storefront)
    if (filters?.status) {
      list = list.filter((p) => p.status === filters.status);
    } else {
      list = list.filter((p) => p.status === 'PUBLISHED');
    }

    if (filters?.category) {
      list = list.filter((p) => p.categorySlugs.includes(filters.category!));
    }

    if (filters?.collection) {
      list = list.filter((p) => p.collectionSlugs.includes(filters.collection!));
    }

    if (filters?.productType) {
      list = list.filter((p) => p.productType === filters.productType);
    }

    if (filters?.featured) {
      list = list.filter((p) => p.featured);
    }

    if (filters?.bestSeller) {
      list = list.filter((p) => p.bestSeller);
    }

    if (filters?.newArrival) {
      list = list.filter((p) => p.newArrival);
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters?.sort) {
      if (filters.sort === 'price-low') {
        list.sort((a, b) => (a.salePrice || a.basePrice) - (b.salePrice || b.basePrice));
      } else if (filters.sort === 'price-high') {
        list.sort((a, b) => (b.salePrice || b.basePrice) - (a.salePrice || a.basePrice));
      } else if (filters.sort === 'newest') {
        list.reverse();
      }
    }

    return list;
  }

  getProductBySlug(slug: string) {
    return this.products.find((p) => p.slug === slug);
  }

  getProductById(id: string) {
    return this.products.find((p) => p.id === id);
  }

  createProduct(data: InitialProduct) {
    this.products.unshift(data);
    this.logAudit('admin@hsdigitalstore.com', 'PRODUCT_CREATE', 'PRODUCT', data.id, { title: data.title });
    return data;
  }

  updateProduct(id: string, updates: Partial<InitialProduct>) {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      this.products[idx] = { ...this.products[idx], ...updates };
      this.logAudit('admin@hsdigitalstore.com', 'PRODUCT_UPDATE', 'PRODUCT', id, updates);
      return this.products[idx];
    }
    return null;
  }

  deleteProduct(id: string) {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      const removed = this.products.splice(idx, 1)[0];
      this.logAudit('admin@hsdigitalstore.com', 'PRODUCT_DELETE', 'PRODUCT', id, { title: removed.title });
      return true;
    }
    return false;
  }

  // CATEGORIES
  getCategories() {
    return this.categories;
  }

  getCategoryBySlug(slug: string) {
    return this.categories.find((c: any) => c.slug === slug);
  }

  // COLLECTIONS
  getCollections() {
    return this.collections;
  }

  getCollectionBySlug(slug: string) {
    return this.collections.find((c: any) => c.slug === slug);
  }

  // COUPONS
  getCoupons() {
    return this.coupons;
  }

  getCouponByCode(code: string) {
    return this.coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);
  }

  createCoupon(data: any) {
    const coupon = { id: `coup-${Date.now()}`, ...data };
    this.coupons.unshift(coupon);
    return coupon;
  }

  // ORDERS
  getOrders() {
    return this.orders;
  }

  getOrderById(id: string) {
    return this.orders.find((o) => o.id === id);
  }

  getOrderByNumber(orderNumber: string) {
    return this.orders.find((o) => o.orderNumber === orderNumber);
  }

  getOrdersByEmail(email: string) {
    return this.orders.filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase());
  }

  createOrder(orderData: any) {
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `HSD-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      ...orderData,
    };
    this.orders.unshift(newOrder);

    // If order is paid, generate download entitlements immediately for digital items
    if (newOrder.status === 'PAID') {
      this.grantEntitlementsForOrder(newOrder);
    }

    return newOrder;
  }

  updateOrderStatus(orderId: string, updates: { status?: string; paymentStatus?: string; fulfillmentStatus?: string; paidAt?: string; refundedAt?: string }) {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      Object.assign(order, updates);
      if (updates.status === 'PAID' && updates.paymentStatus === 'SUCCEEDED') {
        this.grantEntitlementsForOrder(order);
      }
      this.logAudit('system', 'ORDER_STATUS_UPDATE', 'ORDER', orderId, updates);
      return order;
    }
    return null;
  }

  // DIGITAL ENTITLEMENTS
  grantEntitlementsForOrder(order: any) {
    order.items.forEach((item: any) => {
      const prod = this.getProductById(item.productId);
      if (prod && (prod.productType === 'DIGITAL' || prod.productType === 'BUNDLE') && prod.digitalAssets) {
        const entitlement = {
          id: `ent-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          customerId: order.customerId || null,
          customerEmail: order.customerEmail,
          orderId: order.id,
          orderNumber: order.orderNumber,
          productId: prod.id,
          productTitle: prod.title,
          grantedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          allowedDownloads: 10,
          downloadCount: 0,
          status: 'ACTIVE',
          files: prod.digitalAssets,
        };
        this.entitlements.unshift(entitlement);
      }
    });
  }

  getEntitlements(customerEmail?: string) {
    if (customerEmail) {
      return this.entitlements.filter((e) => e.customerEmail.toLowerCase() === customerEmail.toLowerCase());
    }
    return this.entitlements;
  }

  getEntitlementById(id: string) {
    return this.entitlements.find((e) => e.id === id);
  }

  recordDownload(entitlementId: string, filename: string) {
    const ent = this.entitlements.find((e) => e.id === entitlementId);
    if (ent && ent.status === 'ACTIVE') {
      if (ent.downloadCount >= ent.allowedDownloads) {
        throw new Error('Download limit exceeded for this file.');
      }
      ent.downloadCount += 1;
      return {
        success: true,
        downloadUrl: `/api/downloads/file?token=${Buffer.from(`${entitlementId}:${filename}:${Date.now()}`).toString('base64')}`,
        remainingDownloads: ent.allowedDownloads - ent.downloadCount,
      };
    }
    throw new Error('Entitlement not active or expired.');
  }

  // REVIEWS
  getReviews(productId?: string) {
    if (productId) {
      return this.reviews.filter((r) => r.productId === productId && r.status === 'APPROVED');
    }
    return this.reviews;
  }

  createReview(data: any) {
    const review = {
      id: `rev-${Date.now()}`,
      status: 'APPROVED', // Can default to APPROVED or PENDING moderation
      createdAt: new Date().toISOString(),
      ...data,
    };
    this.reviews.unshift(review);
    return review;
  }

  // BLOG POSTS
  getBlogPosts() {
    return this.blogPosts;
  }

  getBlogPostBySlug(slug: string) {
    return this.blogPosts.find((b: any) => b.slug === slug);
  }

  // CUSTOM ORDERS
  getCustomOrders() {
    return this.customOrders;
  }

  createCustomOrder(data: any) {
    const req = {
      id: `cust-${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      ...data,
    };
    this.customOrders.unshift(req);
    return req;
  }

  // ADMIN ANALYTICS & AUDIT
  getAdminStats() {
    const totalOrders = this.orders.length;
    const paidOrders = this.orders.filter((o) => o.status === 'PAID' || o.status === 'PROCESSING' || o.status === 'FULFILLED');
    const totalRevenueCents = paidOrders.reduce((sum, o) => sum + o.total, 0);
    const averageOrderValue = paidOrders.length > 0 ? Math.round(totalRevenueCents / paidOrders.length) : 0;
    
    let digitalRevenue = 0;
    let podRevenue = 0;

    paidOrders.forEach((o) => {
      o.items.forEach((item: any) => {
        if (item.productType === 'POD') {
          podRevenue += item.unitPrice * (item.quantity || 1);
        } else {
          digitalRevenue += item.unitPrice * (item.quantity || 1);
        }
      });
    });

    return {
      totalRevenueCents,
      totalOrders,
      averageOrderValue,
      digitalRevenue,
      podRevenue,
      activeProductsCount: this.products.filter((p) => p.status === 'PUBLISHED').length,
      customOrdersCount: this.customOrders.length,
      pendingFulfillmentCount: this.orders.filter((o) => o.fulfillmentStatus === 'PROCESSING').length,
    };
  }

  getAuditLogs() {
    return this.auditLogs;
  }

  logAudit(adminEmail: string, action: string, objectType: string, objectId: string, metadata: any) {
    this.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      adminEmail,
      action,
      objectType,
      objectId,
      metadata,
      timestamp: new Date().toISOString(),
    });
  }
}

// Global singleton instance
const globalForStore = globalThis as unknown as { storeDb: StoreDatabase };
export const storeData = globalForStore.storeDb || new StoreDatabase();
if (process.env.NODE_ENV !== 'production') globalForStore.storeDb = storeData;
