import { NextRequest, NextResponse } from 'next/server';
import { handlePaymentSuccess } from '@/services/payment';
import { podService } from '@/services/pod';
import { sendEmail, generateOrderConfirmationEmail } from '@/services/email';

const processedPayPalEvents = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const eventId = payload.id || `pp_${Date.now()}`;

    // Idempotency check
    if (processedPayPalEvents.has(eventId)) {
      return NextResponse.json({ received: true, note: 'Duplicate event skipped' });
    }
    processedPayPalEvents.add(eventId);

    const eventType = payload.event_type;

    if (eventType === 'PAYMENT.CAPTURE.COMPLETED' || eventType === 'CHECKOUT.ORDER.APPROVED') {
      const customId = payload.resource?.custom_id;
      const orderNumber = payload.resource?.invoice_id || customId;

      if (orderNumber) {
        const order = await handlePaymentSuccess(orderNumber, 'PAYPAL', payload.resource?.id || eventId);

        if (order.items.some((i: any) => i.productType === 'POD')) {
          await podService.submitOrder(order);
        }

        await sendEmail({
          to: order.customerEmail,
          subject: `Order Confirmed #${order.orderNumber} — HS Digital Store`,
          html: generateOrderConfirmationEmail(order),
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('PayPal webhook error:', error);
    return new NextResponse(`PayPal webhook error: ${error.message}`, { status: 500 });
  }
}
