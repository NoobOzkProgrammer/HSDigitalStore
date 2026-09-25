'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, ShieldCheck, AlertCircle } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState(`HSD-${Math.floor(100 + Math.random() * 900)}`);
  const [basePrice, setBasePrice] = useState('7.99');
  const [salePrice, setSalePrice] = useState('');
  const [productType, setProductType] = useState<'DIGITAL' | 'POD' | 'PHYSICAL' | 'BUNDLE'>('DIGITAL');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'ARCHIVED'>('PUBLISHED');
  const [rightsStatus, setRightsStatus] = useState<'ORIGINAL' | 'LICENSED' | 'PUBLIC_DOMAIN' | 'REQUIRES_REVIEW'>('ORIGINAL');
  const [licenseType, setLicenseType] = useState<'PERSONAL' | 'COMMERCIAL_SMALL' | 'COMMERCIAL_EXTENDED'>('PERSONAL');
  const [category, setCategory] = useState('printable-wall-art');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const baseCents = Math.round(parseFloat(basePrice) * 100);
      const saleCents = salePrice ? Math.round(parseFloat(salePrice) * 100) : undefined;

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          shortDescription,
          description,
          sku,
          basePrice: baseCents,
          salePrice: saleCents,
          productType,
          status,
          rightsStatus,
          licenseType,
          categorySlugs: [category],
          imageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error creating product');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-muted hover:text-navy mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
        <h1 className="text-3xl font-black text-navy">Create New Product</h1>
        <p className="text-xs text-navy-muted">Add a new digital asset or print-on-demand listing to the catalog.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand card-shadow space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-navy block mb-1">Product Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Japanese Cyber Samurai Original Print"
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>

            <div>
              <label className="font-bold text-navy block mb-1">URL Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="japanese-cyber-samurai-original-print"
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-navy block mb-1">SKU</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-navy block mb-1">Base Price ($ USD)</label>
              <input
                type="number"
                step="0.01"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>

            <div>
              <label className="font-bold text-navy block mb-1">Sale Price ($ USD, optional)</label>
              <input
                type="number"
                step="0.01"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="Leave blank for regular price"
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-navy block mb-1">Product Type</label>
              <select
                value={productType}
                onChange={(e: any) => setProductType(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
              >
                <option value="DIGITAL">DIGITAL (Downloadable)</option>
                <option value="POD">POD (Print-on-Demand Physical)</option>
                <option value="BUNDLE">BUNDLE (Multi-Asset Pack)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-navy block mb-1">Status</label>
              <select
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
              >
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="DRAFT">DRAFT</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-navy block mb-1">Primary Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
              >
                <option value="printable-wall-art">Printable Wall Art</option>
                <option value="frame-tv-art">Samsung Frame TV Art</option>
                <option value="original-anime-manga-art">Original Anime & Manga Art</option>
                <option value="clipart-png">Clipart & PNG</option>
                <option value="sublimation-graphics">Sublimation Graphics</option>
                <option value="print-on-demand">Print-on-Demand Physical</option>
              </select>
            </div>
          </div>

          {/* IP Review & License fields */}
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-brand space-y-3">
            <h3 className="text-xs font-bold text-navy flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Intellectual Property & Licensing Governance</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-navy block mb-1">IP Rights Status</label>
                <select
                  value={rightsStatus}
                  onChange={(e: any) => setRightsStatus(e.target.value)}
                  className="w-full bg-white border border-brand rounded-xl px-3 py-2 text-navy"
                >
                  <option value="ORIGINAL">ORIGINAL (100% Original Studio Art)</option>
                  <option value="LICENSED">LICENSED (Commercial License Acquired)</option>
                  <option value="PUBLIC_DOMAIN">PUBLIC DOMAIN (Classic / Historical)</option>
                  <option value="REQUIRES_REVIEW">REQUIRES_REVIEW (Hold from live)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-navy block mb-1">Customer License Granted</label>
                <select
                  value={licenseType}
                  onChange={(e: any) => setLicenseType(e.target.value)}
                  className="w-full bg-white border border-brand rounded-xl px-3 py-2 text-navy"
                >
                  <option value="PERSONAL">Personal Use (Wall Art / Frame TV)</option>
                  <option value="COMMERCIAL_SMALL">Small Commercial (Up to 500 units)</option>
                  <option value="COMMERCIAL_EXTENDED">Extended Commercial License</option>
                </select>
              </div>
            </div>
          </div>

          <div className="text-xs">
            <label className="font-bold text-navy block mb-1">Short Description</label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="e.g. Original cyberpunk character design formatted in 5 high-res aspect ratios."
              className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
            />
          </div>

          <div className="text-xs">
            <label className="font-bold text-navy block mb-1">Full Description (Markdown)</label>
            <textarea
              rows={5}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed product descriptions, what is included, ratio guides, printing tips..."
              className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
            />
          </div>

          <div className="text-xs">
            <label className="font-bold text-navy block mb-1">Product Featured Image URL</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy hover:bg-navy-dark text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4 text-brand-yellow" />
          <span>{loading ? 'Saving to Database...' : 'Save & Publish Product'}</span>
        </button>
      </form>
    </div>
  );
}
