import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Download, Package, Sparkles, ShieldCheck, AlertTriangle } from 'lucide-react';
import { storeData } from '@/services/store-data';

export const metadata = {
  title: 'Products Management | HS Digital Store Admin',
};

export default function AdminProductsPage() {
  const products = storeData.getProducts({ status: undefined }); // all products

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy">Products & Catalog</h1>
          <p className="text-xs text-navy-muted">
            Manage digital assets, POD physical mappings, prices, and IP review status.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="bg-navy hover:bg-navy-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4 text-brand-yellow" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-brand card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-brand text-navy uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-4">Artwork</th>
                <th className="py-3.5 px-4">Title & SKU</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">IP Rights</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand/60 text-navy">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-cream/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-12 rounded-xl bg-cream overflow-hidden border border-brand">
                      <Image
                        src={p.images[0]?.url || '/brand/social/og-default.png'}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <Link
                      href={`/product/${p.slug}`}
                      target="_blank"
                      className="font-bold hover:text-brand-teal line-clamp-1"
                    >
                      {p.title}
                    </Link>
                    <span className="text-[11px] text-navy-muted block font-mono">{p.sku}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        p.productType === 'DIGITAL'
                          ? 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                          : p.productType === 'POD'
                          ? 'bg-teal-50 text-teal-800 border border-teal-200'
                          : 'bg-purple-50 text-purple-800 border border-purple-200'
                      }`}
                    >
                      {p.productType === 'DIGITAL' ? (
                        <Download className="w-3 h-3 text-brand-cyan" />
                      ) : (
                        <Package className="w-3 h-3 text-brand-teal" />
                      )}
                      {p.productType}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-extrabold text-navy">
                    ${((p.salePrice || p.basePrice) / 100).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        p.rightsStatus === 'ORIGINAL'
                          ? 'bg-emerald-50 text-emerald-800'
                          : p.rightsStatus === 'LICENSED'
                          ? 'bg-blue-50 text-blue-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      {p.rightsStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        p.status === 'PUBLISHED'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/product/${p.slug}`}
                      className="text-brand-teal hover:underline font-bold px-2 py-1"
                    >
                      View Live
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
