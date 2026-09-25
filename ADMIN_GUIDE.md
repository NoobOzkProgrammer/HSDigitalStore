# HSDigitalStore — Store Administrator Operational Guide

## 1. Accessing the Admin Portal
- **URL:** `/admin`
- **Default Super Admin:** `admin@hsdigitalstore.com`
- **Default Password:** `AdminHS2026!`
- **Role Verification:** Protected server-side via JWT session cookies (`src/lib/auth.ts`). Unauthorized users attempting access are redirected to `/account/login`.

## 2. Managing the Product Catalog (`/admin/products`)
- **Creating Products:** Click **"Add New Product"** or visit `/admin/products/new`.
- **Supported Product Types:**
  - `DIGITAL`: Instant 300 DPI high-resolution downloads (Printable wall art, Frame TV art, PNG clipart, planners).
  - `POD`: Print-on-Demand physical goods (Museum archival matte posters, framed canvas) fulfilled via Printify.
  - `BUNDLE`: Multi-asset packages with combined digital entitlements.
- **Price Handling:** Always entered in standard dollars; stored authoritatively in integer cents in PostgreSQL (`$7.99` = `799` cents) to avoid JavaScript floating-point errors.
- **Intellectual Property (IP) Review:**
  - `ORIGINAL`: Confirmed 100% in-house creative design.
  - `LICENSED`: Verified commercial license purchased.
  - `REQUIRES_REVIEW`: Held in draft/review state to prevent unintentional publication.

## 3. Order Fulfillment & Entitlements (`/admin/orders`)
- **Order State Hierarchy:** `PENDING_PAYMENT` -> `PAID` -> `PROCESSING` -> `FULFILLED`.
- **Digital Orders:** Automatically transition to `FULFILLED` the moment Stripe or PayPal payment webhook succeeds. Entitlements are created immediately.
- **POD Physical Orders:** Order state becomes `PROCESSING`, and the Printify API submission job is dispatched to queue production and obtain carrier tracking (USPS).

## 4. Discount Coupons (`/admin/coupons`)
- Create percentage (e.g. `WELCOME15` for 15% off) or fixed dollar amount (e.g. `CREATIVE5` for $5.00 off) coupons.
- Configure minimum order thresholds (e.g. minimum $20.00 cart).
- Coupons are calculated and validated exclusively server-side during checkout.

## 5. Custom Design Requests (`/admin/custom-orders`)
- Review incoming bespoke requests from the `/custom-orders` public intake form.
- Inspect customer specifications: dimensions, aesthetic, intended usage, and target deadlines.
- Update request status: `NEW` -> `REVIEWING` -> `ACCEPTED` -> `COMPLETED`.

## 6. Audit & Security Trail (`/admin/audit`)
- Every price update, product creation, deletion, and digital download execution is recorded with operator ID, target object, and timestamp.
