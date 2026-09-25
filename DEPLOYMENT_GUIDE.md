# HSDigitalStore — Vercel Deployment & Production Runbook

## 1. Vercel Project Setup
1. Push the `HSDigitalStore` repository to GitHub or GitLab.
2. In Vercel Dashboard, click **Add New Project** and select the repository.
3. **Framework Preset:** `Next.js`.
4. **Root Directory:** `./` (or `HSDigitalStore` if deploying from monorepo parent).
5. **Build Command:** `npm run build`.
6. **Output Directory:** `.next`.

## 2. Environment Variables Configuration
In Vercel -> Project Settings -> Environment Variables, configure:
```env
# Database
DATABASE_URL=postgresql://user:password@ep-host.region.neon.tech/neondb?sslmode=require

# Application Auth Secret (min 32 characters)
AUTH_SECRET=generate_a_random_32_character_hex_string_here

# Base Domain
NEXT_PUBLIC_SITE_URL=https://hsdigitalstore.com

# Stripe (Live Mode)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal (Live Mode)
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_WEBHOOK_ID=...
PAYPAL_ENVIRONMENT=production

# Print-on-Demand (Printify)
PRINTIFY_API_KEY=...
PRINTIFY_SHOP_ID=...

# Transactional Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM="HS Digital Store <orders@hsdigitalstore.com>"

# Object Storage
BLOB_READ_WRITE_TOKEN=...
```

## 3. Database Migrations
Run the Drizzle migrations against your production database:
```bash
npx drizzle-kit push
```

## 4. Custom Domain & DNS
1. Add your domain `hsdigitalstore.com` in Vercel **Domains** settings.
2. Configure DNS A Record (`76.76.21.21`) and CNAME for `www`.
3. Vercel automatically issues and renews Let's Encrypt SSL certificates.

## 5. Webhook Endpoints Registration
- **Stripe Dashboard:** Register `https://hsdigitalstore.com/api/webhooks/payment/stripe` for `checkout.session.completed`.
- **PayPal Developer Dashboard:** Register `https://hsdigitalstore.com/api/webhooks/payment/paypal` for `PAYMENT.CAPTURE.COMPLETED`.
- **Printify Dashboard:** Connect store webhooks for shipment tracking status updates.
