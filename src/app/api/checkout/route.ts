import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { storeData } from '@/services/store-data';
import { createCheckoutPayment } from '@/services/payment';

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.number().int().positive(),
    })
  ).min(1, 'Cart cannot be empty'),
  customer: z.object({
    email: z.string().email(),
    name: z.string().min(2),
    phone: z.string().optional(),
  }),
  shippingAddress: z
    .object({
      line1: z.string(),
      line2: z.string().optional(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
      country: z.string(),
    })
    .optional(),
  couponCode: z.string().optional(),
  paymentProvider: z.enum(['STRIPE', 'PAYPAL']).default('STRIPE'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = checkoutSchema.parse(body);

    // 1. Authoritative Server-side Price & Inventory Calculation
    let subtotalCents = 0;
    const orderItems: any[] = [];
    let hasPhysicalItems = false;

    for (const item of validated.items) {
      const product = storeData.getProductById(item.productId);
      if (!product || product.status !== 'PUBLISHED') {
        return NextResponse.json(
          { error: `Product ${item.productId} is unavailable or archived.` },
          { status: 400 }
        );
      }

      let unitPrice = product.salePrice || product.basePrice;
      let variantDesc: string | undefined = undefined;
      let variantSku = product.sku;

      if (item.variantId && product.variants) {
        const variant = product.variants.find((v) => v.sku === item.variantId);
        if (variant) {
          unitPrice = (variant.salePrice || product.basePrice) + variant.priceAdjustment;
          variantDesc = variant.title;
          variantSku = variant.sku;
        }
      }

      if (product.productType === 'POD' || product.productType === 'PHYSICAL') {
        hasPhysicalItems = true;
      }

      subtotalCents += unitPrice * item.quantity;
      orderItems.push({
        productId: product.id,
        variantId: item.variantId,
        productTitle: product.title,
        sku: variantSku,
        variantDescription: variantDesc,
        quantity: item.quantity,
        unitPrice,
        productType: product.productType,
      });
    }

    // 2. Validate Physical Shipping Requirement
    if (hasPhysicalItems && !validated.shippingAddress?.line1) {
      return NextResponse.json(
        { error: 'Shipping address is required for physical print-on-demand products.' },
        { status: 400 }
      );
    }

    // 3. Authoritative Coupon Verification
    let discountCents = 0;
    if (validated.couponCode) {
      const coupon = storeData.getCouponByCode(validated.couponCode);
      if (coupon) {
        if (subtotalCents >= coupon.minOrderAmount) {
          if (coupon.discountType === 'PERCENTAGE') {
            discountCents = Math.round((subtotalCents * coupon.discountValue) / 100);
          } else {
            discountCents = Math.min(subtotalCents, coupon.discountValue);
          }
        }
      }
    }

    // 4. Shipping Calculation
    const freeShippingThreshold = 5000; // $50 in cents
    let shippingCents = 0;
    if (hasPhysicalItems) {
      shippingCents = subtotalCents >= freeShippingThreshold ? 0 : 499; // $4.99 standard USPS
    }

    // 5. Estimated Tax (U.S. standard online transaction rate ~7%)
    const taxableAmount = Math.max(0, subtotalCents - discountCents);
    const taxCents = Math.round(taxableAmount * 0.07);

    // 6. Trusted Total in Cents
    const totalCents = taxableAmount + shippingCents + taxCents;

    // 7. Persist Pending Order in Database
    const order = storeData.createOrder({
      customerEmail: validated.customer.email,
      customerName: validated.customer.name,
      customerPhone: validated.customer.phone,
      status: 'PENDING_PAYMENT',
      paymentStatus: 'PENDING',
      fulfillmentStatus: hasPhysicalItems ? 'UNFULFILLED' : 'PENDING_DIGITAL',
      currency: 'USD',
      subtotal: subtotalCents,
      discount: discountCents,
      shipping: shippingCents,
      tax: taxCents,
      total: totalCents,
      shippingAddress: validated.shippingAddress,
      couponCode: validated.couponCode,
      items: orderItems,
    });

    // 8. Generate Payment Session
    const paymentResult = await createCheckoutPayment(order.id, validated.paymentProvider);

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
      checkoutUrl: paymentResult.checkoutUrl,
      paymentId: paymentResult.paymentId,
    });
  } catch (error: any) {
    console.error('Checkout processing error:', error);
    return NextResponse.json(
      { error: error.message || 'Checkout failed to process.' },
      { status: 500 }
    );
  }
}
