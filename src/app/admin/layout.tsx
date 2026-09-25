import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Palette,
  FileText,
  Settings,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { getSession } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-[#F0EBE1] flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-navy text-white flex flex-col shrink-0 border-r border-brand-teal/20">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 relative shrink-0">
              <Image src="/brand/marks/hs-mark.svg" alt="HS Mark" fill className="object-contain" />
            </div>
            <div>
              <span className="font-black text-sm text-white tracking-tight block">
                HSDigital<span className="text-brand-yellow">Admin</span>
              </span>
              <span className="text-[10px] text-gray-300 uppercase tracking-wider block">
                Commerce Operations
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 text-xs font-semibold">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-brand-cyan" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
          >
            <Package className="w-4 h-4 text-brand-yellow" />
            <span>Products & Catalog</span>
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>Orders & Fulfillment</span>
          </Link>

          <Link
            href="/admin/coupons"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
          >
            <Tag className="w-4 h-4 text-purple-400" />
            <span>Discount Coupons</span>
          </Link>

          <Link
            href="/admin/custom-orders"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Custom Order Requests</span>
          </Link>

          <Link
            href="/admin/audit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Audit & Security Logs</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-gray-300 hover:bg-white/5 transition-colors"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <div className="px-3 py-2 text-[11px] text-gray-400">
            <span>Logged in: </span>
            <strong className="text-white block truncate">{session?.email || 'admin@hsdigitalstore.com'}</strong>
          </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
