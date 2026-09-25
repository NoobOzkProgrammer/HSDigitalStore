import { pgTable, text, integer, boolean, timestamp, jsonb, primaryKey } from 'drizzle-orm/pg-core';

// 1. Products
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  shortDescription: text('short_description'),
  description: text('description').notNull(),
  productType: text('product_type').notNull(), // 'DIGITAL' | 'POD' | 'PHYSICAL' | 'BUNDLE'
  status: text('status').notNull().default('DRAFT'), // 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED'
  sku: text('sku').notNull().unique(),
  basePrice: integer('base_price').notNull(), // Integer cents (e.g. 899 = $8.99)
  salePrice: integer('sale_price'), // Nullable integer cents
  currency: text('currency').notNull().default('USD'),
  featured: boolean('featured').notNull().default(false),
  newArrival: boolean('new_arrival').notNull().default(false),
  bestSeller: boolean('best_seller').notNull().default(false),
  rightsStatus: text('rights_status').notNull().default('UNREVIEWED'), // 'UNREVIEWED' | 'ORIGINAL' | 'LICENSED' | 'PUBLIC_DOMAIN' | 'REQUIRES_REVIEW' | 'REJECTED'
  rightsOwner: text('rights_owner'),
  licenseReference: text('license_reference'),
  licenseNotes: text('license_notes'),
  reviewedBy: text('reviewed_by'),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  licenseType: text('license_type').notNull().default('PERSONAL'), // 'PERSONAL' | 'COMMERCIAL_SMALL' | 'COMMERCIAL_EXTENDED'
  tags: jsonb('tags').notNull().default([]), // string[]
  specs: jsonb('specs').notNull().default({}), // Aspect ratios, resolutions, DPI, file types, etc.
  seoTitle: text('seo_title'),
  metaDescription: text('meta_description'),
  canonicalUrl: text('canonical_url'),
  socialTitle: text('social_title'),
  socialDescription: text('social_description'),
  socialImage: text('social_image'),
  noIndex: boolean('no_index').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  archivedAt: timestamp('archived_at', { withTimezone: true }),
});

// 2. Product Variants
export const productVariants = pgTable('product_variants', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  sku: text('sku').notNull(),
  title: text('title').notNull(),
  options: jsonb('options').notNull().default({}), // e.g. { size: '18x24', frame: 'Natural Wood' }
  priceAdjustment: integer('price_adjustment').notNull().default(0), // Cent difference from basePrice
  salePrice: integer('sale_price'),
  active: boolean('active').notNull().default(true),
  provider: text('provider').notNull().default('INTERNAL'), // 'INTERNAL' | 'PRINTIFY'
  providerProductId: text('provider_product_id'),
  providerVariantId: text('provider_variant_id'),
  providerCost: integer('provider_cost').notNull().default(0), // Wholesale cost in cents
  weight: integer('weight').notNull().default(0), // Grams
  stockStatus: text('stock_status').notNull().default('IN_STOCK'), // 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_DEMAND'
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// 3. Product Images
export const productImages = pgTable('product_images', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  storageKey: text('storage_key').notNull(),
  url: text('url').notNull(),
  altText: text('alt_text').notNull(),
  width: integer('width').notNull().default(1200),
  height: integer('height').notNull().default(1200),
  position: integer('position').notNull().default(0),
  imageRole: text('image_role').notNull().default('GALLERY'), // 'FEATURED' | 'GALLERY' | 'MOCKUP' | 'DETAIL' | 'LIFESTYLE'
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// 4. Categories
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  image: text('image'),
  parentId: text('parent_id'),
  seoTitle: text('seo_title'),
  metaDescription: text('meta_description'),
  noIndex: boolean('no_index').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// 5. Collections
export const collections = pgTable('collections', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  bannerImage: text('banner_image'),
  featured: boolean('featured').notNull().default(false),
  seoTitle: text('seo_title'),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// 6. Junction Tables
export const productCategories = pgTable('product_categories', {
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  categoryId: text('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
}, (t) => ({
  pk: primaryKey({ columns: [t.productId, t.categoryId] }),
}));

export const productCollections = pgTable('product_collections', {
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  collectionId: text('collection_id').notNull().references(() => collections.id, { onDelete: 'cascade' }),
}, (t) => ({
  pk: primaryKey({ columns: [t.productId, t.collectionId] }),
}));

// 7. Digital Assets (Source Files stored privately in Object Storage)
export const digitalAssets = pgTable('digital_assets', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  filename: text('filename').notNull(),
  storageKey: text('storage_key').notNull(),
  fileType: text('file_type').notNull(), // 'ZIP', 'PDF', 'PNG', etc.
  fileSize: integer('file_size').notNull().default(0), // Bytes
  version: text('version').notNull().default('1.0'),
  active: boolean('active').notNull().default(true),
  downloadLimit: integer('download_limit').notNull().default(10),
  accessDurationDays: integer('access_duration_days').notNull().default(365),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// 8. Users (Customer & Admin RBAC)
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('CUSTOMER'), // 'CUSTOMER' | 'SUPPORT' | 'ADMIN' | 'SUPER_ADMIN'
  emailVerified: boolean('email_verified').notNull().default(false),
  resetToken: text('reset_token'),
  resetTokenExpires: timestamp('reset_token_expires', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// 9. Orders
export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(), // e.g. HSD-100284
  customerId: text('customer_id').references(() => users.id),
  customerEmail: text('customer_email').notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone'),
  status: text('status').notNull().default('PENDING_PAYMENT'), // 'PENDING_PAYMENT' | 'PAID' | 'PROCESSING' | 'PARTIALLY_FULFILLED' | 'FULFILLED' | 'CANCELLED' | 'PARTIALLY_REFUNDED' | 'REFUNDED' | 'PAYMENT_FAILED' | 'FULFILLMENT_FAILED'
  paymentStatus: text('payment_status').notNull().default('PENDING'),
  fulfillmentStatus: text('fulfillment_status').notNull().default('UNFULFILLED'),
  currency: text('currency').notNull().default('USD'),
  subtotal: integer('subtotal').notNull().default(0), // Cents
  discount: integer('discount').notNull().default(0), // Cents
  shipping: integer('shipping').notNull().default(0), // Cents
  tax: integer('tax').notNull().default(0), // Cents
  total: integer('total').notNull().default(0), // Cents
  shippingAddress: jsonb('shipping_address'), // { line1, line2, city, state, postalCode, country }
  billingAddress: jsonb('billing_address'),
  couponCode: text('coupon_code'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  paidAt: timestamp('paid_at', { withTimezone: true }),
  fulfilledAt: timestamp('fulfilled_at', { withTimezone: true }),
  refundedAt: timestamp('refunded_at', { withTimezone: true }),
});

// 10. Order Items (Immutable Snapshots)
export const orderItems = pgTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: text('product_id').notNull(),
  variantId: text('variant_id'),
  productTitle: text('product_title').notNull(),
  sku: text('sku').notNull(),
  variantDescription: text('variant_description'),
  quantity: integer('quantity').notNull().default(1),
  unitPrice: integer('unit_price').notNull().default(0), // Cents
  discount: integer('discount').notNull().default(0),
  tax: integer('tax').notNull().default(0),
  productType: text('product_type').notNull(), // 'DIGITAL' | 'POD' | 'PHYSICAL' | 'BUNDLE'
  provider: text('provider').notNull().default('INTERNAL'),
  providerProductId: text('provider_product_id'),
  providerVariantId: text('provider_variant_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// 11. Download Entitlements
export const downloadEntitlements = pgTable('download_entitlements', {
  id: text('id').primaryKey(),
  customerId: text('customer_id').references(() => users.id),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  orderItemId: text('order_item_id').notNull().references(() => orderItems.id, { onDelete: 'cascade' }),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  digitalAssetId: text('digital_asset_id').notNull().references(() => digitalAssets.id, { onDelete: 'cascade' }),
  grantedAt: timestamp('granted_at', { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  allowedDownloads: integer('allowed_downloads').notNull().default(10),
  downloadCount: integer('download_count').notNull().default(0),
  status: text('status').notNull().default('ACTIVE'), // 'ACTIVE' | 'EXPIRED' | 'REVOKED'
});

// 12. Download Logs
export const downloadLogs = pgTable('download_logs', {
  id: text('id').primaryKey(),
  entitlementId: text('entitlement_id').notNull().references(() => downloadEntitlements.id, { onDelete: 'cascade' }),
  digitalAssetId: text('digital_asset_id').notNull(),
  customerId: text('customer_id'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow(),
});

// 13. Payments
export const payments = pgTable('payments', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  provider: text('provider').notNull(), // 'STRIPE' | 'PAYPAL'
  providerPaymentId: text('provider_payment_id').notNull(),
  providerCustomerId: text('provider_customer_id'),
  status: text('status').notNull().default('PENDING'), // 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'PARTIALLY_REFUNDED' | 'REFUNDED' | 'DISPUTED'
  currency: text('currency').notNull().default('USD'),
  amount: integer('amount').notNull().default(0), // Cents
  amountRefunded: integer('amount_refunded').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  paidAt: timestamp('paid_at', { withTimezone: true }),
  failedAt: timestamp('failed_at', { withTimezone: true }),
});

// 14. Webhook Events (Idempotency Tracking)
export const webhookEvents = pgTable('webhook_events', {
  id: text('id').primaryKey(),
  provider: text('provider').notNull(),
  externalEventId: text('external_event_id').notNull().unique(),
  eventType: text('event_type').notNull(),
  receivedAt: timestamp('received_at', { withTimezone: true }).notNull().defaultNow(),
  processingStatus: text('processing_status').notNull().default('PENDING'), // 'PENDING' | 'PROCESSED' | 'FAILED'
  attempts: integer('attempts').notNull().default(1),
  lastError: text('last_error'),
});

// 15. Shipments (POD & Physical tracking)
export const shipments = pgTable('shipments', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  provider: text('provider').notNull().default('PRINTIFY'),
  carrier: text('carrier').notNull().default('USPS'),
  service: text('service').notNull().default('Standard'),
  trackingNumber: text('tracking_number').notNull(),
  trackingUrl: text('tracking_url'),
  status: text('status').notNull().default('LABEL_CREATED'), // 'LABEL_CREATED' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'FAILED'
  shippedAt: timestamp('shipped_at', { withTimezone: true }).notNull().defaultNow(),
  deliveredAt: timestamp('delivered_at', { withTimezone: true }),
});

// 16. Coupons
export const coupons = pgTable('coupons', {
  id: text('id').primaryKey(),
  code: text('code').notNull().unique(), // e.g. SAVE20
  discountType: text('discount_type').notNull().default('PERCENTAGE'), // 'PERCENTAGE' | 'FIXED'
  discountValue: integer('discount_value').notNull().default(0), // Percentage (20 = 20%) or Cents ($5.00 = 500)
  minOrderAmount: integer('min_order_amount').notNull().default(0), // Cents
  maxUses: integer('max_uses'),
  timesUsed: integer('times_used').notNull().default(0),
  digitalOnly: boolean('digital_only').notNull().default(false),
  physicalOnly: boolean('physical_only').notNull().default(false),
  active: boolean('active').notNull().default(true),
  startDate: timestamp('start_date', { withTimezone: true }),
  endDate: timestamp('end_date', { withTimezone: true }),
});

// 17. Reviews
export const reviews = pgTable('reviews', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  customerId: text('customer_id').references(() => users.id),
  customerName: text('customer_name').notNull(),
  orderId: text('order_id'),
  rating: integer('rating').notNull().default(5),
  review: text('review').notNull(),
  status: text('status').notNull().default('PENDING'), // 'PENDING' | 'APPROVED' | 'REJECTED'
  verifiedPurchase: boolean('verified_purchase').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// 18. Custom Orders
export const customOrders = pgTable('custom_orders', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  productType: text('product_type').notNull(),
  designRequest: text('design_request').notNull(),
  desiredSize: text('desired_size'),
  intendedUse: text('intended_use'),
  deadline: text('deadline'),
  notes: text('notes'),
  status: text('status').notNull().default('NEW'), // 'NEW' | 'REVIEWING' | 'ACCEPTED' | 'DECLINED' | 'COMPLETED'
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// 19. Blog Posts
export const blogPosts = pgTable('blog_posts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  body: text('body').notNull(),
  author: text('author').notNull().default('HS Digital Store Creative Team'),
  featuredImage: text('featured_image'),
  category: text('category').notNull(),
  tags: jsonb('tags').notNull().default([]),
  status: text('status').notNull().default('DRAFT'), // 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED'
  seoTitle: text('seo_title'),
  metaDescription: text('meta_description'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// 20. Store Settings
export const storeSettings = pgTable('store_settings', {
  id: text('id').primaryKey(),
  storeName: text('store_name').notNull().default('HS Digital Store'),
  supportEmail: text('support_email').notNull().default('support@hsdigitalstore.com'),
  announcementText: text('announcement_text').notNull().default('Instant Digital Downloads • High-Resolution Artwork & Printables'),
  announcementActive: boolean('announcement_active').notNull().default(true),
  defaultCurrency: text('default_currency').notNull().default('USD'),
  freeShippingThreshold: integer('free_shipping_threshold').notNull().default(5000), // Cents ($50)
  socialLinks: jsonb('social_links').notNull().default({}),
  defaultSeoTitle: text('default_seo_title').notNull().default('HS Digital Store | Printable Art, Digital Downloads & Creative POD'),
  defaultSeoDescription: text('default_seo_description').notNull().default('Shop premium digital wall art, Samsung Frame TV art, original anime artwork, PNG clipart, and print-on-demand goods.'),
});

// 21. Admin Audit Logs
export const adminAuditLogs = pgTable('admin_audit_logs', {
  id: text('id').primaryKey(),
  adminId: text('admin_id').notNull(),
  adminEmail: text('admin_email').notNull(),
  action: text('action').notNull(),
  objectType: text('object_type').notNull(),
  objectId: text('object_id').notNull(),
  metadata: jsonb('metadata').notNull().default({}),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow(),
});

// 22. Wishlist Items
export const wishlistItems = pgTable('wishlist_items', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
