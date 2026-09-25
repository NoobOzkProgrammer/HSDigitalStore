import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Palette, Download, Package, ShieldCheck, ArrowRight, Heart } from 'lucide-react';

export const metadata = {
  title: 'About Our Studio & Creative Mission | HS Digital Store',
  description:
    'Learn about HS Digital Store: an independent U.S. design studio dedicated to high-resolution printable wall art, Frame TV art, and original creative collections.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Headline */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-teal bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Independent Creative Studio
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy tracking-tight leading-tight">
          Accessible Art & Digital Design for Everyday Living.
        </h1>
        <p className="text-base sm:text-lg text-navy-secondary leading-relaxed">
          We bridge the gap between bespoke digital creativity and immediate home décor, giving art lovers complete freedom to print, display, and create on their own terms.
        </p>
      </div>

      {/* Brand Visual Stack Banner */}
      <div className="relative aspect-[21/9] w-full bg-navy rounded-3xl overflow-hidden card-shadow border border-brand flex items-center justify-center p-8 text-center text-white">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: 'url(/brand/patterns/card-pattern-dark.svg)', backgroundRepeat: 'repeat' }}
        />
        <div className="relative z-10 max-w-xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Our Creative Philosophy</h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Great art shouldn't require exorbitant gallery markups or weeks waiting on overseas shipping. By designing ultra-sharp 300 DPI digital files and offering museum-quality made-to-order physical prints, we empower our customers to curate personalized spaces in minutes.
          </p>
        </div>
      </div>

      {/* Core Studio Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-brand card-shadow space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-navy font-bold">
            <Download className="w-6 h-6 text-brand-cyan" />
          </div>
          <h3 className="font-bold text-navy text-lg">Instant Gratification</h3>
          <p className="text-xs text-navy-secondary leading-relaxed">
            Download your files seconds after checkout. We package every piece with multiple aspect ratios so you never have to crop awkwardly or guess framing dimensions.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-brand card-shadow space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center text-navy font-bold">
            <Palette className="w-6 h-6 text-navy" />
          </div>
          <h3 className="font-bold text-navy text-lg">Authentic Original Art</h3>
          <p className="text-xs text-navy-secondary leading-relaxed">
            From moody cyberpunk cityscapes and anime-inspired samurai warriors to tranquil minimalist botanicals, all of our original collections are designed with care and attention to detail.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-brand card-shadow space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-navy font-bold">
            <Package className="w-6 h-6 text-brand-teal" />
          </div>
          <h3 className="font-bold text-navy text-lg">Growing Physical Collection</h3>
          <p className="text-xs text-navy-secondary leading-relaxed">
            Prefer hands-off delivery? Our print-on-demand archival posters are produced on 250 gsm fine-art paper and safely tubed to your doorstep.
          </p>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-brand text-center space-y-4 card-shadow">
        <h2 className="text-2xl font-black text-navy">Explore Our Creations</h2>
        <p className="text-xs sm:text-sm text-navy-secondary max-w-md mx-auto">
          Start building your dream gallery wall or upgrade your Samsung Frame TV display today.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-navy text-white text-xs font-bold px-7 py-3.5 rounded-xl hover:bg-navy-dark transition-all shadow-md"
        >
          <span>Shop The Entire Store</span>
          <ArrowRight className="w-4 h-4 text-brand-yellow" />
        </Link>
      </div>
    </div>
  );
}
