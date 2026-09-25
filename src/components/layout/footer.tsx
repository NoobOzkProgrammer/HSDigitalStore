'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send, CheckCircle2, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy text-white pt-16 pb-12 border-t border-brand-teal/20 relative overflow-hidden">
      {/* Subtle background card pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'url(/brand/patterns/card-pattern-dark.svg)', backgroundRepeat: 'repeat' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="w-56 h-12 relative">
                <Image
                  src="/brand/logo-inverse.svg"
                  alt="HSDigitalStore"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
              Premium independent creative marketplace and design studio. Specializing in high-resolution printable wall art, Samsung Frame TV art, original anime artwork, and archival made-to-order physical prints.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-brand-yellow bg-white/5 border border-brand-yellow/30 px-3 py-1 rounded-full font-medium">
                <Sparkles className="w-3.5 h-3.5" /> U.S. Independent Studio
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-brand-cyan bg-white/5 border border-brand-cyan/30 px-3 py-1 rounded-full font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Instant Delivery
              </span>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-brand-yellow mb-4">
              Shop Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/shop?category=printable-wall-art" className="hover:text-brand-cyan transition-colors">
                  Printable Wall Art
                </Link>
              </li>
              <li>
                <Link href="/shop?category=frame-tv-art" className="hover:text-brand-cyan transition-colors">
                  Samsung Frame TV Art
                </Link>
              </li>
              <li>
                <Link href="/shop?category=original-anime-manga-art" className="hover:text-brand-cyan transition-colors">
                  Original Anime & Manga
                </Link>
              </li>
              <li>
                <Link href="/shop?category=clipart-png" className="hover:text-brand-cyan transition-colors">
                  Clipart & PNG Bundles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sublimation-graphics" className="hover:text-brand-cyan transition-colors">
                  Sublimation Graphics
                </Link>
              </li>
              <li>
                <Link href="/shop?category=planners-productivity" className="hover:text-brand-cyan transition-colors">
                  Digital Planners
                </Link>
              </li>
              <li>
                <Link href="/shop?category=kids-toddler-activities" className="hover:text-brand-cyan transition-colors">
                  Toddler Activities
                </Link>
              </li>
              <li>
                <Link href="/shop?category=print-on-demand" className="hover:text-brand-cyan transition-colors">
                  Museum Archival Prints
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support & Account */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-brand-cyan mb-4">
              Help & Resources
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/account/downloads" className="hover:text-white transition-colors">
                  My Download Library
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Order Status & Tracking
                </Link>
              </li>
              <li>
                <Link href="/custom-orders" className="hover:text-white transition-colors">
                  Custom Design Requests
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Printing Guides & Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-yellow transition-colors text-xs text-gray-400 pt-2 block">
                  Staff Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-4">
              Join the Creative Studio
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Subscribe for new release drops, seasonal discount codes, and free printing cheat sheets.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You are subscribed! Check your inbox for your 15% welcome code.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bg-brand-yellow hover:bg-brand-yellow-hover text-navy font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Join
                  </button>
                </div>
                <p className="text-[11px] text-gray-400">
                  Zero spam. Unsubscribe anytime with 1 click.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Policies and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
            <Link href="/policies/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/policies/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/policies/digital-downloads" className="hover:text-white transition-colors">
              Digital Download Policy
            </Link>
            <Link href="/policies/license" className="hover:text-white transition-colors">
              Commercial & Personal Licenses
            </Link>
            <Link href="/policies/refunds" className="hover:text-white transition-colors">
              Refund & Return Policy
            </Link>
            <Link href="/policies/copyright" className="hover:text-white transition-colors">
              IP & Copyright Policy
            </Link>
          </div>

          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} HS Digital Store. All rights reserved.</p>
            <p className="text-[11px] text-gray-500 mt-1">
              Independent U.S. Design Studio & Print-on-Demand Creative Marketplace.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
