export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'HS Digital Store <orders@hsdigitalstore.com>';

  if (!apiKey || apiKey.includes('placeholder') || apiKey.includes('mock')) {
    console.log(`[EMAIL LOG - DEV/MOCK MODE]`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    return true;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
      }),
    });

    return res.ok;
  } catch (error) {
    console.error('Failed to send transactional email:', error);
    return false;
  }
}

export function generateOrderConfirmationEmail(order: any): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const hasDigital = order.items.some((i: any) => i.productType === 'DIGITAL' || i.productType === 'BUNDLE');
  const hasPod = order.items.some((i: any) => i.productType === 'POD');

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #F6F1E8; margin: 0; padding: 20px; color: #102D5C; }
    .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2DDD5; }
    .header { background: #102D5C; color: #F6F1E8; padding: 32px 24px; text-align: center; }
    .content { padding: 32px 24px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge-digital { background: #E0F2FE; color: #0369A1; }
    .badge-pod { background: #CCFBF1; color: #0F766E; }
    .btn { display: inline-block; background: #102D5C; color: #FFFFFF !important; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 16px; }
    .footer { background: #FAF7F2; padding: 20px; text-align: center; font-size: 12px; color: #6B7B96; border-top: 1px solid #ECE7DE; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">HSDigitalStore</h1>
      <p style="margin: 6px 0 0 0; opacity: 0.9;">Thank you for your order!</p>
    </div>
    <div class="content">
      <p>Hello <strong>${order.customerName}</strong>,</p>
      <p>Your order <strong>#${order.orderNumber}</strong> has been received and confirmed.</p>
      
      ${
        hasDigital
          ? `
      <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 12px; padding: 16px; margin: 20px 0;">
        <h3 style="margin: 0 0 8px 0; color: #92400E;">⚡ Instant Downloads Available</h3>
        <p style="margin: 0; font-size: 14px; color: #78350F;">
          Your high-resolution files are ready to download right now in your account library.
        </p>
        <a href="${siteUrl}/account/downloads" class="btn" style="background: #102D5C;">Access My Downloads</a>
      </div>
      `
          : ''
      }

      ${
        hasPod
          ? `
      <div style="background: #F0FDFA; border: 1px solid #99F6E4; border-radius: 12px; padding: 16px; margin: 20px 0;">
        <h3 style="margin: 0 0 8px 0; color: #115E59;">📦 Print-on-Demand Production</h3>
        <p style="margin: 0; font-size: 14px; color: #134E4A;">
          Your physical items have been submitted to our archival printing lab. You will receive tracking once shipped.
        </p>
      </div>
      `
          : ''
      }

      <h3>Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${order.items
          .map(
            (item: any) => `
          <tr style="border-bottom: 1px solid #ECE7DE;">
            <td style="padding: 12px 0;">
              <strong>${item.productTitle}</strong><br/>
              <span class="badge ${item.productType === 'DIGITAL' ? 'badge-digital' : 'badge-pod'}">${item.productType}</span>
              ${item.variantDescription ? `<span style="font-size: 12px; color: #6B7B96;">${item.variantDescription}</span>` : ''}
            </td>
            <td style="text-align: right; padding: 12px 0;">
              $${((item.unitPrice * item.quantity) / 100).toFixed(2)}
            </td>
          </tr>
        `
          )
          .join('')}
      </table>

      <div style="margin-top: 20px; text-align: right;">
        <p style="margin: 4px 0;">Subtotal: $${(order.subtotal / 100).toFixed(2)}</p>
        ${order.discount ? `<p style="margin: 4px 0; color: #0E9F6E;">Discount: -$${(order.discount / 100).toFixed(2)}</p>` : ''}
        ${order.shipping ? `<p style="margin: 4px 0;">Shipping: $${(order.shipping / 100).toFixed(2)}</p>` : ''}
        ${order.tax ? `<p style="margin: 4px 0;">Tax: $${(order.tax / 100).toFixed(2)}</p>` : ''}
        <h3 style="margin: 8px 0; color: #102D5C;">Total Paid: $${(order.total / 100).toFixed(2)}</h3>
      </div>
    </div>
    <div class="footer">
      <p>Questions? Reply directly to this email or contact support@hsdigitalstore.com</p>
      <p>&copy; ${new Date().getFullYear()} HS Digital Store. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}
