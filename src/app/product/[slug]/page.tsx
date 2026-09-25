import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Download, Package, ShieldCheck, Star, Sparkles, FileText, CheckCircle2, AlertCircle, RefreshCw, Printer } from 'lucide-react';
import { storeData } from '@/services/store-data';
import { ProductCard } from '@/components/product/product-card';
import { ProductPurchaseSection } from '@/components/product/product-purchase-section';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = storeData.getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const title = product.seoTitle || `${product.title} | HS Digital Store`;
  const description = product.metaDescription || product.shortDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.images[0]?.url || '/brand/social/og-default.png',
          alt: product.images[0]?.altText || product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = storeData.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = storeData.getReviews(product.id);
  const relatedProducts = storeData.getProducts({ category: product.categorySlugs[0] }).filter((p) => p.id !== product.id).slice(0, 4);

  // Generate JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images.map((img) => img.url),
    description: product.shortDescription,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: ((product.salePrice || product.basePrice) / 100).toFixed(2),
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
      url: `https://hsdigitalstore.com/product/${product.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: reviews.length || 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-bold text-navy-muted">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-navy">Shop</Link>
          <span>/</span>
          {product.categorySlugs[0] && (
            <>
              <Link href={`/shop?category=${product.categorySlugs[0]}`} className="hover:text-navy capitalize">
                {product.categorySlugs[0].replace(/-/g, ' ')}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-navy truncate max-w-xs">{product.title}</span>
        </div>

        {/* Product Main Display Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square w-full bg-white rounded-3xl overflow-hidden border border-brand card-shadow">
              <Image
                src={product.images[0]?.url || '/brand/social/og-default.png'}
                alt={product.images[0]?.altText || product.title}
                fill
                priority
                className="object-cover"
              />

              {/* Watermark overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
                <Image
                  src="/brand/marks/hs-mark.svg"
                  alt="Watermark"
                  width={200}
                  height={200}
                />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {product.productType === 'DIGITAL' || product.productType === 'BUNDLE' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-cyan-950 bg-white/95 backdrop-blur-sm border border-cyan-300 px-3 py-1.5 rounded-full shadow-sm">
                    <Download className="w-3.5 h-3.5 text-brand-cyan" /> DIGITAL DOWNLOAD • NO PHYSICAL SHIPPING
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-teal-950 bg-white/95 backdrop-blur-sm border border-teal-300 px-3 py-1.5 rounded-full shadow-sm">
                    <Package className="w-3.5 h-3.5 text-brand-teal" /> PHYSICAL PRINT • SHIPPED TO DOOR
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-brand bg-white shrink-0"
                  >
                    <Image
                      src={img.url}
                      alt={img.altText}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Pricing, Variants & Purchase Action */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-brand-teal">
                  SKU: {product.sku}
                </span>
                <span className="text-brand-border">•</span>
                <div className="flex items-center text-amber-500 text-xs gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-navy">5.0</span>
                  <span className="text-navy-muted">({reviews.length || 1} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-navy leading-tight">
                {product.title}
              </h1>

              <p className="text-sm text-navy-secondary leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Client interactive purchase component with variant selection and cart add */}
            <ProductPurchaseSection product={product} />

            {/* Trust and Guarantee Box */}
            <div className="p-4 bg-white rounded-2xl border border-brand card-shadow space-y-3 text-xs text-navy">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Instant Digital Download:</strong> Files unlock immediately after checkout.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0" />
                <span><strong>Lifetime Re-Download Access:</strong> Stored securely in your customer library.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Printer className="w-4 h-4 text-brand-teal shrink-0" />
                <span><strong>Ultra 300 DPI Resolution:</strong> Scalable to 5 standard gallery frame ratios.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Product Specifications and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 border-t border-brand">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand card-shadow space-y-6">
              <h2 className="text-2xl font-black text-navy">Product Overview & Specifications</h2>
              <div className="prose prose-navy max-w-none text-sm leading-relaxed text-navy-secondary space-y-4 whitespace-pre-line">
                {product.description}
              </div>

              {/* Technical Specs Table */}
              <div className="pt-6 border-t border-brand">
                <h3 className="text-lg font-bold text-navy mb-4">Detailed Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-brand">
                    <span className="font-bold text-navy block">Resolution & Quality</span>
                    <span className="text-navy-muted">300 DPI True Photographic Density</span>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-brand">
                    <span className="font-bold text-navy block">Aspect Ratios Included</span>
                    <span className="text-navy-muted">2:3, 3:4, 4:5, ISO (A1-A5), 11:14</span>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-brand">
                    <span className="font-bold text-navy block">License Permitted</span>
                    <span className="text-navy-muted">Personal & Small Commercial (End Products)</span>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-brand">
                    <span className="font-bold text-navy block">Recommended Paper</span>
                    <span className="text-navy-muted">Archival Matte 230gsm or Semi-Gloss Luster</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand card-shadow space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-navy">Customer Reviews</h2>
                  <p className="text-xs text-navy-muted">Genuine verified reviews from art buyers</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              {reviews.length === 0 ? (
                <p className="text-xs text-navy-muted italic">Be the first to review this artwork after purchase!</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-brand space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-navy">{rev.customerName}</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          ✓ Verified Purchase
                        </span>
                      </div>
                      <p className="text-navy-secondary italic">{rev.review}</p>
                      <span className="text-[10px] text-navy-muted block">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Printing & Licensing FAQs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-brand card-shadow space-y-4">
              <h3 className="font-black text-navy text-lg">Digital Printing FAQ</h3>

              <div className="space-y-3 text-xs text-navy-secondary">
                <div>
                  <h4 className="font-bold text-navy">Where can I print this?</h4>
                  <p className="mt-0.5">At home on photo paper, or upload to Walgreens, Staples, FedEx, or online labs like FinerWorks and Mpix.</p>
                </div>

                <div>
                  <h4 className="font-bold text-navy">Will colors match my screen?</h4>
                  <p className="mt-0.5">Colors may differ slightly depending on monitor calibration and printer profile. All files use standard sRGB.</p>
                </div>

                <div>
                  <h4 className="font-bold text-navy">Can I re-download my files later?</h4>
                  <p className="mt-0.5">Yes! You can log in to your account anytime and re-download your files from your library.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-brand">
            <h2 className="text-2xl font-black text-navy">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
