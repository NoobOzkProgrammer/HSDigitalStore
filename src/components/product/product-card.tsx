'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Download, Package, Star, Sparkles } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { InitialProduct } from '@/db/seed-data';

interface ProductCardProps {
  product: InitialProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const featuredImage = product.images?.[0]?.url || '/brand/social/og-default.png';
  const effectivePrice = product.salePrice || product.basePrice;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      title: product.title,
      price: effectivePrice,
      image: featuredImage,
      productType: product.productType,
      quantity: 1,
    });
  };

  return (
    <div className="group bg-white rounded-2xl border border-brand overflow-hidden card-shadow card-shadow-hover flex flex-col h-full relative">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full bg-[#FAF7F2] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={featuredImage}
            alt={product.images?.[0]?.altText || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.productType === 'DIGITAL' || product.productType === 'BUNDLE' ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-900 bg-white/95 backdrop-blur-sm border border-cyan-300 px-2.5 py-1 rounded-full shadow-sm">
              <Download className="w-3 h-3 text-brand-cyan" /> Digital Download
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-900 bg-white/95 backdrop-blur-sm border border-teal-300 px-2.5 py-1 rounded-full shadow-sm">
              <Package className="w-3 h-3 text-brand-teal" /> Physical Print
            </span>
          )}

          {product.bestSeller && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-navy bg-brand-yellow px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
              <Sparkles className="w-2.5 h-2.5" /> Best Seller
            </span>
          )}

          {product.salePrice && (
            <span className="inline-flex items-center text-[10px] font-black text-white bg-red-600 px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all shadow-sm ${
            isFavorited
              ? 'bg-red-50 text-red-600'
              : 'bg-white/80 text-navy hover:bg-white hover:text-red-500'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags / Subtitle */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-teal">
              {product.tags?.[0] || 'Studio Asset'}
            </span>
            <div className="flex items-center text-amber-500 text-xs gap-0.5 ml-auto">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-navy text-[11px]">5.0</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm sm:text-base font-bold text-navy hover:text-brand-teal transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-navy-muted line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-4 mt-4 border-t border-brand/60 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-navy">
                ${(effectivePrice / 100).toFixed(2)}
              </span>
              {product.salePrice && (
                <span className="text-xs text-navy-muted line-through">
                  ${(product.basePrice / 100).toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-navy-muted">
              {product.productType === 'DIGITAL' ? 'Instant Access' : 'Ships to Door'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 bg-navy hover:bg-navy-dark text-white text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all shadow-sm active:scale-95"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
