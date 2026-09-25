import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Package, Sparkles, CheckCircle2, Tv, ShieldCheck, Palette, FileText, Star } from 'lucide-react';
import { storeData } from '@/services/store-data';
import { ProductCard } from '@/components/product/product-card';

export default function HomePage() {
  const featuredProducts = storeData.getProducts({ featured: true }).slice(0, 4);
  const bestSellers = storeData.getProducts({ bestSeller: true }).slice(0, 4);
  const categories = storeData.getCategories();
  const blogPosts = storeData.getBlogPosts().slice(0, 3);
  const reviews = storeData.getReviews().slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#F6F1E8] border-b border-brand py-16 sm:py-24">
        {/* Subtle decorative background vector */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'url(/brand/hero/hero-background-light.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/90 border border-brand px-3.5 py-1.5 rounded-full text-xs font-bold text-navy shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Instant 300 DPI Digital Downloads & Archival Physical Prints</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy tracking-tight leading-[1.1]">
                Creative Artwork Designed for{' '}
                <span className="text-brand-teal underline decoration-brand-yellow decoration-wavy decoration-2">
                  Modern Living.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-navy-secondary max-w-2xl leading-relaxed">
                Transform your walls and Samsung Frame TV with high-resolution digital art, original anime illustrations, transparent PNG clipart packs, and museum-grade physical posters.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop?category=printable-wall-art"
                  className="bg-navy hover:bg-navy-dark text-white font-bold px-7 py-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4 text-brand-yellow" />
                  <span>Shop Digital Products</span>
                </Link>

                <Link
                  href="/shop?category=print-on-demand"
                  className="bg-white hover:bg-cream-surface border-2 border-navy text-navy font-bold px-7 py-4 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-2 text-sm"
                >
                  <Package className="w-4 h-4 text-brand-teal" />
                  <span>Shop Physical Prints</span>
                </Link>
              </div>

              {/* Trust Features Strip */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-brand/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="font-extrabold text-navy text-sm sm:text-base">300 DPI</p>
                  <p className="text-[11px] text-navy-muted">Ultra-Sharp Quality</p>
                </div>
                <div>
                  <p className="font-extrabold text-navy text-sm sm:text-base">5 Ratios</p>
                  <p className="text-[11px] text-navy-muted">Fits Every Frame</p>
                </div>
                <div>
                  <p className="font-extrabold text-navy text-sm sm:text-base">Lifetime</p>
                  <p className="text-[11px] text-navy-muted">Download Re-access</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card Stack Motif */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-72 sm:w-84 aspect-[4/5] rounded-3xl overflow-hidden card-shadow border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80"
                  alt="Original anime cyberpunk artwork"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-yellow bg-black/40 px-2 py-0.5 rounded">
                    Featured Original
                  </span>
                  <p className="font-bold text-base mt-1">Neo-Tokyo Cyber Samurai</p>
                  <p className="text-xs text-gray-200">5 ratios included • $5.99</p>
                </div>
              </div>

              {/* Offset Angled Card Behind */}
              <div className="absolute -left-4 sm:-left-8 top-10 w-64 sm:w-72 aspect-[4/5] bg-brand-teal/20 rounded-3xl border-2 border-brand-teal/40 -rotate-6 -z-10" />
              <div className="absolute -right-4 sm:-right-8 -bottom-4 w-64 sm:w-72 aspect-[4/5] bg-brand-yellow/30 rounded-3xl border-2 border-brand-yellow/50 rotate-8 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TILES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-teal">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy mt-1">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-brand-teal transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 8).map((cat: any) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group bg-white rounded-2xl p-5 border border-brand card-shadow card-shadow-hover flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-navy group-hover:bg-brand-yellow transition-colors mb-4">
                {cat.slug.includes('frame') ? (
                  <Tv className="w-6 h-6 text-navy" />
                ) : cat.slug.includes('anime') ? (
                  <Palette className="w-6 h-6 text-navy" />
                ) : cat.slug.includes('pod') ? (
                  <Package className="w-6 h-6 text-navy" />
                ) : (
                  <Download className="w-6 h-6 text-navy" />
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-navy text-sm sm:text-base group-hover:text-brand-teal transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-navy-muted line-clamp-2 mt-1">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (NEW & BEST SELLERS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-yellow bg-navy px-2.5 py-1 rounded-full">
              Hand-Picked Picks
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy mt-2">
              Featured Creations
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-brand-teal transition-colors"
          >
            <span>Explore Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. DIGITAL DOWNLOADS FEATURE CALLOUT */}
      <section className="bg-white border-y border-brand py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-cyan bg-navy px-3 py-1 rounded-full">
                Instant Delivery System
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
                How Our Digital Downloads Work
              </h2>
              <p className="text-sm sm:text-base text-navy-secondary leading-relaxed">
                No waiting for shipping or damaged mail. As soon as your purchase completes, your private download vault is activated with access to multiple standard aspect ratios.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center shrink-0 text-cyan-800 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm">Purchase Securely</h4>
                    <p className="text-xs text-navy-muted">Pay with Card, Apple Pay, or PayPal on our 256-bit SSL encrypted checkout.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center shrink-0 text-yellow-800 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm">Instant File Unlocking</h4>
                    <p className="text-xs text-navy-muted">Files are immediately available on screen and sent to your email with a personal download library.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0 text-teal-800 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm">Print Anywhere You Like</h4>
                    <p className="text-xs text-navy-muted">Print at home, upload to Walgreens/FedEx, or send to fine-art giclée labs for stunning results.</p>
                  </div>
                </div>
              </div>

              <Link
                href="/shop?category=printable-wall-art"
                className="inline-flex items-center gap-2 bg-navy text-white text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-navy-dark transition-all shadow-sm"
              >
                Browse Printable Downloads <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-brand card-shadow space-y-6">
              <h3 className="font-black text-navy text-xl">What Is In Every Wall Art Download?</h3>
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-navy">
                <div className="p-3 bg-white rounded-xl border border-brand">
                  <span className="text-brand-teal font-extrabold text-sm block">2:3 Ratio</span>
                  <span>4x6, 8x12, 12x18, 16x24, 20x30, 24x36 in</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-brand">
                  <span className="text-brand-teal font-extrabold text-sm block">3:4 Ratio</span>
                  <span>6x8, 9x12, 12x16, 15x20, 18x24 in</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-brand">
                  <span className="text-brand-teal font-extrabold text-sm block">4:5 Ratio</span>
                  <span>4x5, 8x10, 12x15, 16x20 in</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-brand">
                  <span className="text-brand-teal font-extrabold text-sm block">ISO Format</span>
                  <span>A5, A4, A3, A2, A1 European Standard</span>
                </div>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                <strong>Bonus Included:</strong> Free comprehensive printing guide PDF with paper weight recommendations, color profile calibration, and frame buying tips.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ORIGINAL ANIME & MANGA ART SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'url(/brand/patterns/card-pattern-dark.svg)', backgroundRepeat: 'repeat' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-yellow bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> 100% Original Creations
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Original Anime & Manga-Inspired Artwork
              </h2>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                We believe in authentic original creative design. Explore our signature collection of original cyberpunk warriors, samurai aesthetics, neo-Tokyo streetscapes, and kawaii characters created in-house without infringing on licensed franchises.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop?category=original-anime-manga-art"
                  className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-navy font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md"
                >
                  Explore Original Anime Collection <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-56 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-brand-teal card-shadow relative">
                <Image
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80"
                  alt="Original Manga Character Art"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy-muted">
              Community Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy mt-1">
              Top Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-brand-teal transition-colors"
          >
            <span>See Everything</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. WHY SHOP WITH US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-teal">
            The Studio Standard
          </span>
          <h2 className="text-3xl font-black text-navy">
            Why Choose HS Digital Store?
          </h2>
          <p className="text-sm text-navy-secondary">
            Built from our passion for independent digital design and dependable commercial service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-brand card-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-navy font-bold">
              <Download className="w-5 h-5 text-brand-cyan" />
            </div>
            <h3 className="font-bold text-navy text-base">Instant 300 DPI Delivery</h3>
            <p className="text-xs text-navy-secondary leading-relaxed">
              No compression or fuzzy screenshots. Receive uncompressed 300 DPI files prepared specifically for professional printing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand card-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-navy font-bold">
              <Tv className="w-5 h-5 text-navy" />
            </div>
            <h3 className="font-bold text-navy text-base">Samsung Frame TV Ready</h3>
            <p className="text-xs text-navy-secondary leading-relaxed">
              Native 3840 x 2160 files color-calibrated to look like real oil and canvas brushwork on smart displays.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand card-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-navy font-bold">
              <Package className="w-5 h-5 text-brand-teal" />
            </div>
            <h3 className="font-bold text-navy text-base">Museum-Grade POD Option</h3>
            <p className="text-xs text-navy-secondary leading-relaxed">
              Want physical prints? Order archival giclée posters printed on 250 gsm paper fulfilled straight to your home.
            </p>
          </div>
        </div>
      </section>

      {/* 8. VERIFIED CUSTOMER REVIEWS */}
      <section className="bg-[#FAF7F2] border-y border-brand py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="flex items-center justify-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy">
              Loved by Creators & Art Collectors
            </h2>
            <p className="text-xs text-navy-muted">Real verified reviews from creative shoppers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-2xl border border-brand card-shadow space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ✓ Verified Purchase
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-navy-secondary italic leading-relaxed">
                  "{rev.review}"
                </p>
                <div className="pt-2 border-t border-brand/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-navy">{rev.customerName}</span>
                  <span className="text-navy-muted">{new Date(rev.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BLOG & PRINTING GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-teal">
              Studio Knowledgebase
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy mt-1">
              Printing Guides & Tutorials
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-brand-teal transition-colors"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post: any) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-brand overflow-hidden card-shadow card-shadow-hover flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full bg-cream overflow-hidden">
                <Image
                  src={post.featuredImage || '/brand/social/og-default.png'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-brand-teal uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-navy group-hover:text-brand-teal transition-colors text-base leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-navy-muted line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-navy group-hover:translate-x-1 transition-transform">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border-2 border-brand-teal/30 rounded-3xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden card-shadow">
          <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
            Ready to Elevate Your Space?
          </h2>
          <p className="text-sm sm:text-base text-navy-secondary max-w-xl mx-auto">
            Discover original art you can print in minutes or have museum-quality posters shipped directly to your door.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="bg-navy hover:bg-navy-dark text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95 text-sm"
            >
              Explore All Products
            </Link>
            <Link
              href="/custom-orders"
              className="bg-white border-2 border-navy text-navy hover:bg-black/5 font-bold px-8 py-3.5 rounded-xl transition-all text-sm"
            >
              Request Custom Design
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
