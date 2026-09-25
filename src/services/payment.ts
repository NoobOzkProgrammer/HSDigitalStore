import Stripe from 'stripe';
import { storeData } from './store-data';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_mock_key';
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2026-03-23' as any,
});

export interface PaymentIntentResult {
  clientSecret?: string;
  checkoutUrl?: string;
  paymentId: string;
  orderNumber: string;
}

export async function createCheckoutPayment(
  orderId: string,
  provider: 'STRIPE' | 'PAYPAL'
): Promise<PaymentIntentResult> {
  const order = storeData.getOrderById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  if (provider === 'STRIPE') {
    // If running in development with mock keys, provide instant testing URL or create actual Stripe Session if live
    const isMock = !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder') || process.env.STRIPE_SECRET_KEY.includes('mock');

    if (isMock) {
      return {
        paymentId: `pi_mock_${Date.now()}`,
        checkoutUrl: `/checkout/success?orderNumber=${order.orderNumber}&mock_paid=true`,
        orderNumber: order.orderNumber,
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productTitle,
            description: item.variantDescription || undefined,
          },
          unit_amount: item.unitPrice,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      customer_email: order.customerEmail,
      client_reference_id: order.id,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?orderNumber=${order.orderNumber}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout?cancelled=true`,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    });

    return {
      paymentId: session.id,
      checkoutUrl: session.url || undefined,
      orderNumber: order.orderNumber,
    };
  }

  // PayPal Flow
  return {
    paymentId: `paypal_order_${Date.now()}`,
    checkoutUrl: `/checkout/success?orderNumber=${order.orderNumber}&paypal_mock=true`,
    orderNumber: order.orderNumber,
  };
}

export async function handlePaymentSuccess(orderIdOrNumber: string, paymentProvider: string, paymentId: string) {
  let order = storeData.getOrderById(orderIdOrNumber);
  if (!order) {
    order = storeData.getOrderByNumber(orderIdOrNumber);
  }

  if (!order) {
    throw new Error(`Order ${orderIdOrNumber} not found.`);
  }

  if (order.status === 'PAID') {
    // Idempotent: already processed
    return order;
  }

  const updated = storeData.updateOrderStatus(order.id, {
    status: 'PAID',
    paymentStatus: 'SUCCEEDED',
    fulfillmentStatus: order.items.some((i: any) => i.productType === 'POD') ? 'PROCESSING' : 'FULFILLED',
    paidAt: new Date().toISOString(),
  });

  return updated;
}
