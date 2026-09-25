'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, Palette, Layers, Clock, ShieldCheck } from 'lucide-react';

export default function CustomOrdersPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [productType, setProductType] = useState('Printable Wall Art');
  const [designRequest, setDesignRequest] = useState('');
  const [desiredSize, setDesiredSize] = useState('24x36 inches');
  const [intendedUse, setIntendedUse] = useState('Personal Home Décor');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/custom-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          productType,
          designRequest,
          desiredSize,
          intendedUse,
          deadline,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-yellow bg-navy px-3 py-1 rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Bespoke Design Studio
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
          Custom Art & Design Requests
        </h1>
        <p className="text-sm text-navy-secondary leading-relaxed">
          Need a personalized aspect ratio, custom Samsung Frame TV piece, bespoke anime character illustration, or personalized toddler activity pack? Let our studio create it for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="bg-white p-8 rounded-3xl border border-brand card-shadow text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-navy">Request Received!</h2>
              <p className="text-xs sm:text-sm text-navy-secondary leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{name}</strong>! Our creative director will review your project details and respond to <strong>{email}</strong> within 24 to 48 hours with a proof estimate.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-navy text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-navy-dark transition-colors"
              >
                Browse Ready-to-Download Art
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand card-shadow space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-navy block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Lee"
                    className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-navy block mb-1">Product Category</label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  >
                    <option value="Printable Wall Art">Printable Wall Art (Custom Size)</option>
                    <option value="Samsung Frame TV">Samsung Frame TV (3840x2160)</option>
                    <option value="Original Anime Illustration">Original Anime Character / Scene</option>
                    <option value="Clipart & PNG Bundle">Custom Clipart / PNG Set</option>
                    <option value="Print-on-Demand Physical">Physical Printed Poster / Canvas</option>
                    <option value="Toddler Printable Activity">Toddler Activity / Learning Binder</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Target Size / Dimensions</label>
                  <input
                    type="text"
                    value={desiredSize}
                    onChange={(e) => setDesiredSize(e.target.value)}
                    placeholder="e.g. 24x36 in, 4K 16:9, or 5x7"
                    className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="font-bold text-navy block mb-1">Describe Your Vision / Request</label>
                <textarea
                  required
                  rows={4}
                  value={designRequest}
                  onChange={(e) => setDesignRequest(e.target.value)}
                  placeholder="Tell us about the colors, aesthetic (e.g. cyberpunk, Japanese watercolor, boho botanical), subject matter, and any specific text..."
                  className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-navy block mb-1">Intended Usage</label>
                  <select
                    value={intendedUse}
                    onChange={(e) => setIntendedUse(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  >
                    <option value="Personal Home Décor">Personal Home Décor</option>
                    <option value="Gift for Friend/Family">Gift for Friend/Family</option>
                    <option value="Commercial End Product">Small Business Commercial End Product</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Desired Deadline (Optional)</label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="e.g. In 2 weeks or by Oct 15"
                    className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy hover:bg-navy-dark text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {loading ? 'Submitting Request...' : 'Submit Design Request'}
                <ArrowRight className="w-4 h-4 text-brand-yellow" />
              </button>
            </form>
          )}
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-brand card-shadow space-y-4">
            <h3 className="font-black text-navy text-lg">Our Custom Order Process</h3>

            <div className="space-y-4 text-xs">
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-lg bg-navy text-white font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-navy">Submit Details</h4>
                  <p className="text-navy-muted">Share your dimensions, preferred aesthetic, and color palette.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-lg bg-navy text-white font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-navy">Studio Review & Quote</h4>
                  <p className="text-navy-muted">We verify technical feasibility and email you a fixed quote and delivery timeline.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-lg bg-navy text-white font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-navy">Draft Proof & Delivery</h4>
                  <p className="text-navy-muted">You receive preview watermarked drafts for revision before full 300 DPI delivery.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-brand text-[11px] text-navy-secondary space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-navy">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Intellectual Property Safety</span>
              </div>
              <p>
                We only produce 100% original artwork. We do not recreate trademarked franchise characters (e.g. Disney, Pokémon, Marvel) without direct licenses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
