'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Plus, Minus, Zap, Download, Package } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { InitialProduct } from '@/db/seed-data';

interface ProductPurchaseSectionProps {
  product: InitialProduct;
}

export function ProductPurchaseSection({ product }: ProductPurchaseSectionProps) {
  const router = useRouter();
  const { addItem, setIsOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const isFavorited = isInWishlist(product.id);

  // Price calculations
  const basePrice = product.basePrice + (selectedVariant ? selectedVariant.priceAdjustment : 0);
  const salePrice = product.salePrice
    ? product.salePrice + (selectedVariant ? selectedVariant.priceAdjustment : 0)
    : undefined;
  const effectivePrice = salePrice || basePrice;

  const handleAddToCart = (openDrawer = true) => {
    addItem({
      productId: product.id,
      variantId: selectedVariant?.sku,
      title: product.title,
      variantTitle: selectedVariant?.title,
      price: effectivePrice,
      image: product.images[0]?.url || '/brand/social/og-default.png',
      productType: product.productType,
      quantity,
    });
    if (openDrawer) {
      setIsOpen(true);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart(false);
    router.push('/checkout');
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-3xl border border-brand card-shadow">
      {/* Price Display */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-black text-navy">
          ${(effectivePrice / 100).toFixed(2)}
        </span>
        {salePrice && (
          <span className="text-base text-navy-muted line-through font-medium">
            ${(basePrice / 100).toFixed(2)}
          </span>
        )}
        <span className="text-xs font-bold text-brand-teal ml-auto">
          {product.productType === 'DIGITAL' || product.productType === 'BUNDLE'
            ? '⚡ Instant Digital Delivery'
            : '📦 Made-to-Order Physical POD'}
        </span>
      </div>

      {/* POD Variant Selector (e.g. Sizes) */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-navy uppercase tracking-wider block">
            Select Size & Option:
          </label>
          <div className="grid grid-cols-1 gap-2">
            {product.variants.map((v) => (
              <button
                key={v.sku}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                  selectedVariant?.sku === v.sku
                    ? 'border-navy bg-navy text-white shadow-sm'
                    : 'border-brand bg-[#FAF7F2] text-navy hover:bg-cream'
                }`}
              >
                <span>{v.title}</span>
                <span>${((product.basePrice + v.priceAdjustment) / 100).toFixed(2)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Wishlist Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-brand rounded-xl bg-[#FAF7F2] p-1">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 text-navy-muted hover:text-navy transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 text-sm font-extrabold text-navy">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 text-navy-muted hover:text-navy transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`flex-1 p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            isFavorited
              ? 'border-red-200 bg-red-50 text-red-600'
              : 'border-brand bg-[#FAF7F2] text-navy hover:bg-cream'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          <span>{isFavorited ? 'In Wishlist' : 'Save to Wishlist'}</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => handleAddToCart(true)}
          className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-dark text-white font-black py-4 px-6 rounded-xl transition-all shadow-md active:scale-[0.99]"
        >
          <ShoppingBag className="w-5 h-5 text-brand-yellow" />
          <span>Add to Cart</span>
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-navy font-black py-4 px-6 rounded-xl transition-all shadow-md active:scale-[0.99]"
        >
          <Zap className="w-5 h-5 fill-current" />
          <span>Instant Buy Now</span>
        </button>
      </div>
    </div>
  );
}
