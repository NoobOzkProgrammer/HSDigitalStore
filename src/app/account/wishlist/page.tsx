'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/wishlist-context';
import { useCart } from '@/context/cart-context';
import { storeData } from '@/services/store-data';
import { ProductCard } from '@/components/product/product-card';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const allProducts = storeData.getProducts();
  const favoritedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-muted hover:text-navy mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Account</span>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-navy">My Wishlist</h1>
            <p className="text-sm text-navy-secondary">
              Keep track of designs, clipart bundles, and prints you want to purchase.
            </p>
          </div>
          <span className="text-xs font-bold bg-[#FAF7F2] border border-brand px-3 py-1 rounded-full text-navy">
            {favoritedProducts.length} saved items
          </span>
        </div>
      </div>

      {favoritedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-brand card-shadow space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy">Your wishlist is empty</h2>
          <p className="text-sm text-navy-secondary">
            Click the heart icon on any artwork or printable pack to save it here for later.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-navy text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-navy-dark transition-all"
          >
            Explore Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoritedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
