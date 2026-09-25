import React from 'react';
import Link from 'next/link';
import { Download, ShoppingBag, Heart, User, ShieldCheck, ArrowRight, Clock, Package } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { storeData } from '@/services/store-data';

export const metadata = {
  title: 'My Account Dashboard | HS Digital Store',
};

export default async function AccountPage() {
  const session = await getSession();

  // If not logged in, prompt or show guest order lookup + sample logged in state
  const customerEmail = session?.email || 'alex.rivera@example.com';
  const customerName = session?.name || 'Alex Rivera';

  const orders = storeData.getOrdersByEmail(customerEmail);
  const entitlements = storeData.getEntitlements(customerEmail);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-cream border-2 border-brand flex items-center justify-center text-navy font-black text-xl">
            {customerName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-navy">{customerName}</h1>
              {session?.role === 'SUPER_ADMIN' || session?.role === 'ADMIN' ? (
                <span className="text-[10px] font-black uppercase text-navy bg-brand-yellow px-2 py-0.5 rounded-full">
                  Admin Access
                </span>
              ) : null}
            </div>
            <p className="text-xs text-navy-muted">{customerEmail}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/account/downloads"
            className="bg-navy hover:bg-navy-dark text-white text-xs font-bold px-5 py-3 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4 text-brand-yellow" />
            <span>My Downloads ({entitlements.length})</span>
          </Link>
          <Link
            href="/account/orders"
            className="bg-white hover:bg-cream border border-brand text-navy text-xs font-bold px-5 py-3 rounded-xl transition-all"
          >
            Order History ({orders.length})
          </Link>
          {!session && (
            <Link
              href="/account/login"
              className="text-xs font-bold text-brand-teal hover:underline px-2"
            >
              Sign In to Different Account
            </Link>
          )}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/account/downloads"
          className="bg-white p-6 rounded-3xl border border-brand card-shadow card-shadow-hover space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-800 group-hover:bg-brand-yellow transition-colors">
            <Download className="w-5 h-5 text-navy" />
          </div>
          <h3 className="font-bold text-navy text-base">Digital Download Library</h3>
          <p className="text-xs text-navy-muted leading-relaxed">
            Access, re-download, and view updated revisions of your high-res 300 DPI files and guides.
          </p>
          <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-teal">
            <span>Open Library ({entitlements.length} files)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/account/orders"
          className="bg-white p-6 rounded-3xl border border-brand card-shadow card-shadow-hover space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 group-hover:bg-brand-yellow transition-colors">
            <ShoppingBag className="w-5 h-5 text-navy" />
          </div>
          <h3 className="font-bold text-navy text-base">Orders & Shipments</h3>
          <p className="text-xs text-navy-muted leading-relaxed">
            View past receipts, track physical print-on-demand shipments, and check order statuses.
          </p>
          <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-teal">
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/account/wishlist"
          className="bg-white p-6 rounded-3xl border border-brand card-shadow card-shadow-hover space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-brand-yellow transition-colors">
            <Heart className="w-5 h-5 text-navy" />
          </div>
          <h3 className="font-bold text-navy text-base">Saved Wishlist</h3>
          <p className="text-xs text-navy-muted leading-relaxed">
            Review your favorite art prints and clipart packs saved for future projects and downloads.
          </p>
          <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-teal">
            <span>View Wishlist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand card-shadow space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-brand">
          <h2 className="text-lg font-bold text-navy">Recent Purchases</h2>
          <Link href="/account/orders" className="text-xs font-bold text-brand-teal hover:underline">
            View All
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-navy-muted py-6 text-center">No orders found under this account.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((ord: any) => (
              <div
                key={ord.id}
                className="p-4 bg-[#FAF7F2] rounded-2xl border border-brand flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <span className="font-bold text-navy text-sm block">#{ord.orderNumber}</span>
                  <span className="text-navy-muted">
                    Placed on {new Date(ord.createdAt).toLocaleDateString()} • {ord.items.length} item(s)
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-navy text-sm">
                    ${(ord.total / 100).toFixed(2)}
                  </span>
                  <span className="inline-block px-2.5 py-1 rounded-full font-bold text-[11px] bg-emerald-100 text-emerald-800">
                    {ord.status}
                  </span>
                  <Link
                    href={`/account/orders/${ord.orderNumber}`}
                    className="bg-navy hover:bg-navy-dark text-white font-bold px-4 py-2 rounded-xl"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
