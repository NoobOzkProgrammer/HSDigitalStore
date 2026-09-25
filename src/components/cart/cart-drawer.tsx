'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Download, Package } from 'lucide-react';
import { useCart } from '@/context/cart-context';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-brand">
          {/* Header */}
          <div className="p-5 bg-white border-b border-brand flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-navy" />
              <h2 className="text-lg font-bold text-navy">Shopping Cart ({totalItems})</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-navy-muted hover:text-navy rounded-lg hover:bg-black/5 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-brand-yellow/20 rounded-full flex items-center justify-center mx-auto text-brand-yellow">
                  <ShoppingBag className="w-8 h-8 text-navy" />
                </div>
                <h3 className="text-lg font-bold text-navy">Your cart is empty</h3>
                <p className="text-sm text-navy-secondary max-w-xs mx-auto">
                  Explore our instant high-resolution printable art, Frame TV files, and original anime collections.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-navy-dark transition-all shadow-sm"
                >
                  Explore Catalog <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId || 'base'}`}
                  className="bg-white rounded-xl p-4 border border-brand card-shadow flex gap-4 relative"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-cream rounded-lg overflow-hidden relative shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-navy truncate" title={item.title}>
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="text-navy-muted hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Product Type Badge */}
                      <div className="mt-1 flex items-center gap-1.5">
                        {item.productType === 'DIGITAL' || item.productType === 'BUNDLE' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">
                            <Download className="w-3 h-3 text-brand-cyan" /> Digital Download
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                            <Package className="w-3 h-3 text-brand-teal" /> Physical POD
                          </span>
                        )}
                        {item.variantTitle && (
                          <span className="text-xs text-navy-muted truncate">({item.variantTitle})</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-brand rounded-lg bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          className="p-1 text-navy-muted hover:text-navy"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-navy">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          className="p-1 text-navy-muted hover:text-navy"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-extrabold text-navy">
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-brand space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-navy-secondary">
                  <span>Subtotal</span>
                  <span className="font-bold text-navy">${(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-navy-muted">
                  <span>Taxes & shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-dark text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-[0.98]"
                >
                  Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-center gap-2 text-[11px] text-navy-muted pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>256-bit SSL Secure Checkout • Instant Digital Delivery</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
