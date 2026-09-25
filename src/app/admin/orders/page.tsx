import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Package, Download, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { storeData } from '@/services/store-data';

export const metadata = {
  title: 'Orders & Fulfillment Management | HS Digital Store Admin',
};

export default function AdminOrdersPage() {
  const orders = storeData.getOrders();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy">Customer Orders & Fulfillment</h1>
          <p className="text-xs text-navy-muted">
            Inspect order items snapshot, track POD submissions, and manage digital entitlements.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-brand card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-brand text-navy uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-4">Order #</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items Breakdown</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Fulfillment</th>
                <th className="py-3.5 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand/60 text-navy">
              {orders.map((ord: any) => (
                <tr key={ord.id} className="hover:bg-cream/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold">
                    #{ord.orderNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold block">{ord.customerName}</span>
                    <span className="text-[11px] text-navy-muted">{ord.customerEmail}</span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="space-y-1">
                      {ord.items.map((i: any) => (
                        <div key={i.id} className="flex items-center gap-1.5 truncate">
                          {i.productType === 'POD' ? (
                            <Package className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                          ) : (
                            <Download className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                          )}
                          <span className="truncate">{i.productTitle}</span>
                          <span className="text-navy-muted">({i.quantity})</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-navy text-sm">
                    ${(ord.total / 100).toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        ord.paymentStatus === 'SUCCEEDED'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        ord.fulfillmentStatus === 'FULFILLED'
                          ? 'bg-emerald-100 text-emerald-900'
                          : ord.fulfillmentStatus === 'PROCESSING'
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {ord.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-navy-muted whitespace-nowrap">
                    {new Date(ord.createdAt).toLocaleDateString()}
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
