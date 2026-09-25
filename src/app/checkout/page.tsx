'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Download, Package, ArrowRight, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/cart-context';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentProvider, setPaymentProvider] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountCents: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Shipping state
  const hasPhysical = items.some((i) => i.productType === 'POD' || i.productType === 'PHYSICAL');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('');

  // Preliminary calculations for display
  const discountAmount = appliedCoupon ? appliedCoupon.discountCents : 0;
  const shippingAmount = hasPhysical ? (subtotal >= 5000 ? 0 : 499) : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.07);
  const finalTotal = taxableAmount + shippingAmount + taxAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === 'WELCOME15') {
      const discount = Math.round((subtotal * 15) / 100);
      setAppliedCoupon({ code: 'WELCOME15', discountCents: discount });
    } else if (couponCode.trim().toUpperCase() === 'CREATIVE5') {
      if (subtotal >= 2000) {
        setAppliedCoupon({ code: 'CREATIVE5', discountCents: 500 });
      } else {
        setCouponError('CREATIVE5 requires a minimum order of $20.00');
      }
    } else {
      setCouponError('Invalid coupon code or expired');
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError('Please agree to the terms and digital refund policy to continue.');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
          })),
          customer: { email, name, phone },
          shippingAddress: hasPhysical
            ? {
                line1: address1,
                line2: address2,
                city,
                state,
                postalCode: zip,
                country: 'US',
              }
            : undefined,
          couponCode: appliedCoupon?.code,
          paymentProvider,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize checkout.');
      }

      // Clear local cart and redirect to provider or success
      clearCart();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        router.push(`/checkout/success?orderNumber=${data.orderNumber}`);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during checkout.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-black text-navy">Your Cart is Empty</h1>
        <p className="text-sm text-navy-secondary">Add some printable artwork or Frame TV files before checking out.</p>
        <Link
          href="/shop"
          className="inline-block bg-navy text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-navy-dark transition-colors"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title */}
        <div className="border-b border-brand pb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy">Secure Checkout</h1>
            <p className="text-xs text-navy-muted">Guaranteed 256-bit encrypted checkout</p>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>SSL Encrypted</span>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Customer & Shipping Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-3xl border border-brand card-shadow space-y-4">
              <h2 className="text-base font-bold text-navy flex items-center gap-2">
                <span>1. Contact & Customer Details</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-navy block mb-1">Email Address (for download delivery)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3.5 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-navy"
                  />
                  <p className="text-[11px] text-navy-muted mt-1">
                    Your high-resolution files will be immediately emailed and attached to this address.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-navy block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3.5 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-navy block mb-1">Phone Number (optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3.5 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address (Conditioned on Physical items) */}
            {hasPhysical ? (
              <div className="bg-white p-6 rounded-3xl border border-brand card-shadow space-y-4">
                <h2 className="text-base font-bold text-navy flex items-center gap-2">
                  <Package className="w-4 h-4 text-brand-teal" />
                  <span>2. Shipping Address (Physical POD items)</span>
                </h2>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-navy block mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      placeholder="123 Main St"
                      className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3.5 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-navy block mb-1">Apt, Suite, Unit (optional)</label>
                    <input
                      type="text"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      placeholder="Apt 4B"
                      className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3.5 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="font-bold text-navy block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Los Angeles"
                        className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3.5 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-navy"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-navy block mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="CA"
                        className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3.5 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-navy"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-navy block mb-1">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="90001"
                        className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3.5 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-navy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-cyan-50/70 border border-cyan-200 rounded-2xl flex items-center gap-3 text-xs text-cyan-900">
                <Download className="w-5 h-5 text-brand-cyan shrink-0" />
                <div>
                  <strong>All items in your cart are instant digital downloads.</strong> No shipping address is required. Files will unlock immediately.
                </div>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="bg-white p-6 rounded-3xl border border-brand card-shadow space-y-4">
              <h2 className="text-base font-bold text-navy">
                {hasPhysical ? '3. Payment Selection' : '2. Payment Selection'}
              </h2>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentProvider('STRIPE')}
                  className={`p-4 rounded-2xl border text-left font-bold flex flex-col justify-between transition-all ${
                    paymentProvider === 'STRIPE'
                      ? 'border-navy bg-navy text-white shadow-sm'
                      : 'border-brand bg-[#FAF7F2] text-navy hover:bg-cream'
                  }`}
                >
                  <span className="text-sm">Credit / Debit Card</span>
                  <span className="text-[10px] opacity-80 mt-2">Visa, MC, Amex, Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentProvider('PAYPAL')}
                  className={`p-4 rounded-2xl border text-left font-bold flex flex-col justify-between transition-all ${
                    paymentProvider === 'PAYPAL'
                      ? 'border-navy bg-navy text-white shadow-sm'
                      : 'border-brand bg-[#FAF7F2] text-navy hover:bg-cream'
                  }`}
                >
                  <span className="text-sm">PayPal Checkout</span>
                  <span className="text-[10px] opacity-80 mt-2">PayPal balance & cards</span>
                </button>
              </div>

              {/* Agreement */}
              <div className="pt-2">
                <label className="flex items-start gap-2 text-xs text-navy-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 rounded text-navy focus:ring-navy"
                  />
                  <span>
                    I agree to the{' '}
                    <Link href="/policies/terms" className="underline font-bold text-navy" target="_blank">
                      Terms of Service
                    </Link>{' '}
                    and understand that digital downloads are delivered immediately upon successful payment.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-brand card-shadow space-y-5">
              <h2 className="text-base font-bold text-navy pb-3 border-b border-brand">
                Order Summary ({items.length} items)
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId || 'base'}`} className="flex gap-3 text-xs">
                    <div className="relative w-12 h-12 rounded-lg bg-cream overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-navy truncate">{item.title}</p>
                      <p className="text-[11px] text-navy-muted">
                        Qty: {item.quantity} • {item.productType}
                        {item.variantTitle && ` (${item.variantTitle})`}
                      </p>
                    </div>
                    <div className="font-bold text-navy">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Input */}
              <div className="pt-3 border-t border-brand space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code (e.g. WELCOME15)"
                    className="flex-1 bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-xs uppercase font-bold text-navy placeholder:normal-case placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-navy hover:bg-navy-dark text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Coupon {appliedCoupon.code} applied (-${(appliedCoupon.discountCents / 100).toFixed(2)})</span>
                  </div>
                )}
                {couponError && <p className="text-xs text-red-600 font-medium">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-brand text-xs">
                <div className="flex justify-between text-navy-secondary">
                  <span>Subtotal</span>
                  <span className="font-bold text-navy">${(subtotal / 100).toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-${(discountAmount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-navy-secondary">
                  <span>Shipping</span>
                  <span>{hasPhysical ? (shippingAmount === 0 ? 'FREE' : `$${(shippingAmount / 100).toFixed(2)}`) : '$0.00 (Digital)'}</span>
                </div>
                <div className="flex justify-between text-navy-secondary">
                  <span>Estimated Tax</span>
                  <span>${(taxAmount / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-navy pt-2 border-t border-brand">
                  <span>Total Due</span>
                  <span>${(finalTotal / 100).toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-dark text-white font-black py-4 px-6 rounded-xl transition-all shadow-md active:scale-[0.99] disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Complete Purchase & Download</span>
                    <ArrowRight className="w-4 h-4 text-brand-yellow" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-navy-muted">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Instant access to digital files immediately after payment.</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
