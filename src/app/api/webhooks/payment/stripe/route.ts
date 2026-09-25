import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { handlePaymentSuccess } from '@/services/payment';
import { podService } from '@/services/pod';
import { sendEmail, generateOrderConfirmationEmail } from '@/services/email';
import { storeData } from '@/services/store-data';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-03-23' as any,
});

// Idempotency cache for processed webhook events
const processedEvents = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    // Verify signature if secret configured
    if (webhookSecret && !webhookSecret.includes('placeholder') && signature) {
      try {
        event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
      }
    } else {
      // Dev/fallback mode
      event = JSON.parse(rawBody);
    }

    // Idempotency Check
    if (processedEvents.has(event.id)) {
      return NextResponse.json({ received: true, note: 'Duplicate event skipped' });
    }
    processedEvents.add(event.id);

    // Handle payment events
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      const orderNumber = session.metadata?.orderNumber;

      if (orderId || orderNumber) {
        const order = await handlePaymentSuccess(orderId || orderNumber!, 'STRIPE', session.id);

        // Submit POD fulfillment if physical items exist
        if (order.items.some((i: any) => i.productType === 'POD')) {
          await podService.submitOrder(order);
        }

        // Send confirmation email
        await sendEmail({
          to: order.customerEmail,
          subject: `Order Confirmed #${order.orderNumber} — HS Digital Store`,
          html: generateOrderConfirmationEmail(order),
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Stripe webhook processing error:', err);
    return new NextResponse(`Webhook Handler Error: ${err.message}`, { status: 500 });
  }
}
