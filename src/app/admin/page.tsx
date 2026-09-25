import React from 'react';
import Link from 'next/link';
import { DollarSign, ShoppingBag, Download, Package, ArrowUpRight, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { storeData } from '@/services/store-data';

export const metadata = {
  title: 'Admin Commerce Dashboard | HS Digital Store',
};

export default function AdminDashboardPage() {
  const stats = storeData.getAdminStats();
  const recentOrders = storeData.getOrders().slice(0, 5);
  const products = storeData.getProducts();

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-navy">Commerce Dashboard</h1>
          <p className="text-xs sm:text-sm text-navy-secondary mt-1">
            Real-time sales, order fulfillment, and digital asset entitlements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="bg-navy hover:bg-navy-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4 text-brand-yellow" />
            <span>Create New Product</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-brand card-shadow space-y-2">
          <div className="flex items-center justify-between text-navy-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Sales</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-navy">
            ${(stats.totalRevenueCents / 100).toFixed(2)}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>All time verified revenue</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand card-shadow space-y-2">
          <div className="flex items-center justify-between text-navy-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-brand-teal" />
          </div>
          <p className="text-2xl font-black text-navy">{stats.totalOrders}</p>
          <p className="text-[11px] text-navy-muted">
            Avg. Order Value: ${(stats.averageOrderValue / 100).toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand card-shadow space-y-2">
          <div className="flex items-center justify-between text-navy-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Digital Revenue</span>
            <Download className="w-4 h-4 text-brand-cyan" />
          </div>
          <p className="text-2xl font-black text-navy">
            ${(stats.digitalRevenue / 100).toFixed(2)}
          </p>
          <p className="text-[11px] text-brand-cyan font-bold">Instant high-margin downloads</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand card-shadow space-y-2">
          <div className="flex items-center justify-between text-navy-muted">
            <span className="text-xs font-bold uppercase tracking-wider">POD Revenue</span>
            <Package className="w-4 h-4 text-brand-yellow" />
          </div>
          <p className="text-2xl font-black text-navy">
            ${(stats.podRevenue / 100).toFixed(2)}
          </p>
          <p className="text-[11px] text-navy-muted">
            Pending Fulfillment: {stats.pendingFulfillmentCount}
          </p>
        </div>
      </div>

      {/* Two Column Layout: Recent Orders & Catalog Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-brand card-shadow space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand">
            <h2 className="text-base font-bold text-navy">Recent Customer Orders</h2>
            <Link href="/admin/orders" className="text-xs font-bold text-brand-teal hover:underline">
              View All Orders →
            </Link>
          </div>

          <div className="divide-y divide-brand/60">
            {recentOrders.map((ord: any) => (
              <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy">#{ord.orderNumber}</span>
                    <span className="text-navy-muted">• {ord.customerName}</span>
                  </div>
                  <span className="text-[11px] text-navy-muted">{ord.items.length} item(s)</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-navy">${(ord.total / 100).toFixed(2)}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ord.status === 'PAID'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operations Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-brand card-shadow space-y-4">
            <h2 className="text-base font-bold text-navy">Store Catalog Status</h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-brand/60">
                <span className="text-navy-secondary">Published Products</span>
                <span className="font-bold text-navy">{stats.activeProductsCount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand/60">
                <span className="text-navy-secondary">Custom Design Inquiries</span>
                <span className="font-bold text-navy">{stats.customOrdersCount}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-navy-secondary">Primary Payment Gateway</span>
                <span className="font-bold text-emerald-700">Stripe Active (USD)</span>
              </div>
            </div>

            <Link
              href="/admin/products"
              className="w-full bg-navy text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 hover:bg-navy-dark transition-colors"
            >
              <span>Manage Products</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
