'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart, User, Search, Menu, X, Sparkles, Download, Layers } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { CartDrawer } from '@/components/cart/cart-drawer';

export function Header() {
  const { totalItems, setIsOpen } = useCart();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-navy text-white text-xs sm:text-sm py-2 px-4 text-center border-b border-brand-teal/20 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-yellow shrink-0 animate-pulse" />
          <span className="font-medium">
            Instant 300 DPI Digital Downloads • High-Resolution Artwork & Frame TV Art
          </span>
          <span className="hidden md:inline text-brand-cyan">|</span>
          <span className="hidden md:inline text-brand-yellow font-semibold">
            Use code WELCOME15 for 15% off
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#F6F1E8]/95 backdrop-blur-md border-b border-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-navy hover:bg-black/5"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 relative">
                  <Image
                    src="/brand/marks/hs-mark.svg"
                    alt="HSDigitalStore Logo Mark"
                    width={44}
                    height={44}
                    priority
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-navy leading-none">
                    HSDigital<span className="text-brand-teal">Store</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-navy-muted">
                    Creative Marketplace
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-navy">
              <Link href="/shop" className="hover:text-brand-teal transition-colors">
                Shop All
              </Link>
              <Link href="/shop?category=printable-wall-art" className="hover:text-brand-teal transition-colors flex items-center gap-1">
                Printable Art
              </Link>
              <Link href="/shop?category=frame-tv-art" className="hover:text-brand-teal transition-colors">
                Frame TV
              </Link>
              <Link href="/shop?category=original-anime-manga-art" className="hover:text-brand-teal transition-colors">
                Anime Art
              </Link>
              <Link href="/shop?category=clipart-png" className="hover:text-brand-teal transition-colors">
                Clipart & PNG
              </Link>
              <Link href="/shop?category=print-on-demand" className="hover:text-brand-teal transition-colors">
                Physical Prints
              </Link>
              <Link href="/blog" className="hover:text-brand-teal transition-colors">
                Blog
              </Link>
              <Link href="/custom-orders" className="hover:text-brand-teal transition-colors text-brand-teal flex items-center gap-1">
                Custom Orders
              </Link>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-navy hover:text-brand-teal hover:bg-black/5 rounded-full transition-colors"
                aria-label="Search Catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                className="p-2 text-navy hover:text-brand-teal hover:bg-black/5 rounded-full transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-brand-yellow text-navy text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="p-2 text-navy hover:text-brand-teal hover:bg-black/5 rounded-full transition-colors"
                aria-label="My Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-navy text-white hover:bg-navy-dark px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm active:scale-95"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-brand-yellow" />
                <span className="hidden sm:inline">Cart</span>
                <span className="bg-brand-yellow text-navy text-xs font-black px-1.5 py-0.2 rounded-full min-w-5 text-center">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>

          {/* Expandable Search Input */}
          {searchOpen && (
            <div className="py-3 px-2 border-t border-brand animate-in fade-in slide-in-from-top-2 duration-200">
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search printable art, Frame TV, clipart, anime prints..."
                  className="w-full pl-11 pr-24 py-2.5 bg-white border border-brand rounded-xl text-navy placeholder:text-navy-muted focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent text-sm shadow-sm"
                  autoFocus
                />
                <Search className="w-5 h-5 text-navy-muted absolute left-3.5" />
                <button
                  type="submit"
                  className="absolute right-2 bg-navy text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-navy-dark transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Slideout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-brand bg-[#FAF7F2] px-6 py-6 space-y-4">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-navy hover:text-brand-teal text-base"
            >
              Shop All Products
            </Link>
            <Link
              href="/shop?category=printable-wall-art"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium text-navy-secondary hover:text-brand-teal text-sm pl-2"
            >
              • Printable Wall Art
            </Link>
            <Link
              href="/shop?category=frame-tv-art"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium text-navy-secondary hover:text-brand-teal text-sm pl-2"
            >
              • Samsung Frame TV Art
            </Link>
            <Link
              href="/shop?category=original-anime-manga-art"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium text-navy-secondary hover:text-brand-teal text-sm pl-2"
            >
              • Original Anime & Manga
            </Link>
            <Link
              href="/shop?category=clipart-png"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium text-navy-secondary hover:text-brand-teal text-sm pl-2"
            >
              • Clipart & PNG Bundles
            </Link>
            <Link
              href="/shop?category=print-on-demand"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium text-navy-secondary hover:text-brand-teal text-sm pl-2"
            >
              • Print-on-Demand Physical Prints
            </Link>
            <Link
              href="/shop?category=digital-bundles"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium text-navy-secondary hover:text-brand-teal text-sm pl-2"
            >
              • Value Bundles
            </Link>
            <div className="pt-2 border-t border-brand space-y-2">
              <Link
                href="/custom-orders"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-semibold text-brand-teal"
              >
                Custom Design Requests
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-semibold text-navy"
              >
                Blog & Printing Guides
              </Link>
              <Link
                href="/account/downloads"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-semibold text-navy"
              >
                My Download Library
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-semibold text-xs text-navy-muted pt-2"
              >
                Store Admin Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
