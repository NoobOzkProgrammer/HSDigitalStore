import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, ArrowRight, Package, Download, CheckCircle2 } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { storeData } from '@/services/store-data';

export const metadata = {
  title: 'My Orders | HS Digital Store',
};

export default async function OrdersListPage() {
  const session = await getSession();
  const customerEmail = session?.email || 'alex.rivera@example.com';
  const orders = storeData.getOrdersByEmail(customerEmail);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-muted hover:text-navy mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Account</span>
        </Link>
        <h1 className="text-3xl font-black text-navy">Order History</h1>
        <p className="text-sm text-navy-secondary">
          Track physical print-on-demand shipments and review digital order receipts.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-brand card-shadow space-y-4">
          <ShoppingBag className="w-12 h-12 text-navy-muted mx-auto" />
          <h2 className="text-xl font-bold text-navy">No orders found</h2>
          <p className="text-sm text-navy-secondary max-w-sm mx-auto">
            You haven't placed any orders yet. Discover our latest artwork and printable collections.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-navy text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-navy-dark transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord: any) => (
            <div
              key={ord.id}
              className="bg-white rounded-3xl p-6 border border-brand card-shadow space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand">
                <div>
                  <span className="font-mono font-bold text-navy text-sm">Order #{ord.orderNumber}</span>
                  <p className="text-xs text-navy-muted mt-0.5">
                    Placed on {new Date(ord.createdAt).toLocaleDateString()} at{' '}
                    {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {ord.status}
                  </span>
                  <span className="text-base font-extrabold text-navy">
                    ${(ord.total / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {ord.items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-2">
                      {item.productType === 'POD' ? (
                        <Package className="w-4 h-4 text-brand-teal shrink-0" />
                      ) : (
                        <Download className="w-4 h-4 text-brand-cyan shrink-0" />
                      )}
                      <span className="font-bold text-navy">{item.productTitle}</span>
                      <span className="text-navy-muted">× {item.quantity}</span>
                    </div>
                    <span className="font-bold text-navy">
                      ${((item.unitPrice * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-brand flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-navy-muted">
                  {ord.items.some((i: any) => i.productType === 'POD') ? (
                    <span className="inline-flex items-center gap-1 text-teal-800 font-semibold">
                      <Package className="w-3.5 h-3.5 text-brand-teal" /> Physical POD Fulfillment: {ord.fulfillmentStatus}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-cyan-800 font-semibold">
                      <Download className="w-3.5 h-3.5 text-brand-cyan" /> Instant Downloads Unlocked
                    </span>
                  )}
                </div>

                <Link
                  href={`/account/orders/${ord.orderNumber}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-brand-teal"
                >
                  <span>View Full Order Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
