# HSDigitalStore — Commerce Integrations & API Architecture

## 1. Database Layer (PostgreSQL & Drizzle ORM)
- **Engine:** PostgreSQL (Optimized for Neon Serverless, Supabase, or Vercel Postgres).
- **ORM:** Drizzle ORM (`drizzle-orm`, `drizzle-kit`).
- **Configuration File:** `drizzle.config.ts`.
- **Schema:** Defined in `src/db/schema.ts` (22 tables with strict foreign keys, constraints, and audit trails).
- **Fallback / Resilient Service:** Built-in repository singleton in `src/services/store-data.ts` guarantees continuous local development and testing even prior to setting remote PostgreSQL credentials.

## 2. Payment Gateway (Stripe & PayPal)
- **Merchant Location:** United States (USD settlement).
- **Payment Abstraction:** `src/services/payment.ts`.
- **Stripe Checkout:**
  - Server generates checkout session with authoritative line item prices.
  - Webhook route: `/api/webhooks/payment/stripe`.
  - Signature verification using `STRIPE_WEBHOOK_SECRET`.
  - Idempotency guard prevents duplicate order or download generation.
- **PayPal Checkout:**
  - REST API capture and approval workflows.
  - Webhook route: `/api/webhooks/payment/paypal`.

## 3. Print-on-Demand (Printify API)
- **Service Implementation:** `src/services/pod.ts`.
- **Flow:** When an order contains `POD` items, `podService.submitOrder(order)` sends the formatted shipping payload and item variant mappings directly to Printify.
- **Mixed Cart Execution:** Digital items unlock in real-time, while POD items enter asynchronous production without blocking the customer.

## 4. Transactional Email (Resend)
- **Service Implementation:** `src/services/email.ts`.
- **Templates:** Branded HTML notifications matching the Deep Navy / Golden Yellow palette:
  - Order Confirmation with itemized receipt.
  - Digital Delivery link to `/account/downloads`.
  - POD Production & Shipping Tracking notification.

## 5. Private Digital Asset Storage (Vercel Private Blob / S3)
- **Private vs. Public Distinction:**
  - Public `/public/brand/`: Logos, mockups, social cards, watermarks.
  - Private `/assets/`: High-resolution uncompressed 300 DPI master ZIPs, Frame TV 4K JPGs, and PDF guides.
- **Download Verification Route:** `/api/downloads/file?token=...`
  - Validates entitlement existence.
  - Enforces active status and non-expiration.
  - Decrements download quota (default: 10 downloads per file).
  - Logs operator IP and timestamp.
