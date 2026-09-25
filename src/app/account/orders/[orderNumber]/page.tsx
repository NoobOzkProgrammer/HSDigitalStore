import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Download, Package, Truck, ShieldCheck, FileText } from 'lucide-react';
import { storeData } from '@/services/store-data';

interface OrderDetailPageProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderNumber } = await params;
  const order = storeData.getOrderByNumber(orderNumber);

  if (!order) {
    notFound();
  }

  const hasDigital = order.items.some((i: any) => i.productType === 'DIGITAL' || i.productType === 'BUNDLE');
  const hasPod = order.items.some((i: any) => i.productType === 'POD');
  const entitlements = storeData.getEntitlements(order.customerEmail);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-muted hover:text-navy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Orders</span>
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-teal">
              Confirmed Order
            </span>
            <h1 className="text-2xl font-black text-navy mt-1">Order #{order.orderNumber}</h1>
            <p className="text-xs text-navy-muted mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Payment {order.paymentStatus}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-navy text-white">
              Status {order.status}
            </span>
          </div>
        </div>

        {/* POD Tracking Banner if applicable */}
        {hasPod && (
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-brand flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-brand-teal" />
              <div>
                <p className="font-bold text-navy">USPS Standard Tracking</p>
                <p className="text-navy-muted">Tracking # 9400 1000 2948 1029 4810 24</p>
              </div>
            </div>
            <span className="font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              In Production
            </span>
          </div>
        )}

        {/* Items Table */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-navy uppercase tracking-wider">Ordered Items</h2>
          <div className="space-y-3">
            {order.items.map((item: any) => (
              <div
                key={item.id}
                className="p-4 bg-[#FAF7F2] rounded-2xl border border-brand flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy text-sm">{item.productTitle}</span>
                    <span className="text-navy-muted">({item.productType})</span>
                  </div>
                  {item.variantDescription && (
                    <p className="text-navy-muted mt-0.5">Size/Option: {item.variantDescription}</p>
                  )}
                  <p className="text-navy-muted mt-0.5">SKU: {item.sku}</p>
                </div>

                <div className="text-right">
                  <p className="font-extrabold text-navy text-sm">
                    ${((item.unitPrice * item.quantity) / 100).toFixed(2)}
                  </p>
                  <p className="text-[11px] text-navy-muted">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="pt-4 border-t border-brand max-w-xs ml-auto space-y-2 text-xs">
          <div className="flex justify-between text-navy-secondary">
            <span>Subtotal</span>
            <span className="font-bold text-navy">${(order.subtotal / 100).toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Discount</span>
              <span>-${(order.discount / 100).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-navy-secondary">
            <span>Shipping</span>
            <span>${(order.shipping / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-navy-secondary">
            <span>Tax</span>
            <span>${(order.tax / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-black text-navy pt-2 border-t border-brand">
            <span>Total Paid</span>
            <span>${(order.total / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Downloads Section if Digital */}
      {hasDigital && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand card-shadow space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand">
            <h2 className="text-lg font-bold text-navy flex items-center gap-2">
              <Download className="w-5 h-5 text-brand-cyan" />
              <span>Digital Downloads for this Order</span>
            </h2>
            <Link href="/account/downloads" className="text-xs font-bold text-brand-teal hover:underline">
              Download Library →
            </Link>
          </div>

          <div className="space-y-3">
            {entitlements.map((ent: any) => (
              <div key={ent.id} className="space-y-2">
                <p className="text-xs font-bold text-navy">{ent.productTitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ent.files.map((file: any, idx: number) => (
                    <a
                      key={idx}
                      href={`/api/downloads/file?token=${Buffer.from(`${ent.id}:${file.filename}:${Date.now()}`).toString('base64')}`}
                      download
                      className="p-3 bg-[#FAF7F2] hover:bg-cream border border-brand rounded-xl flex items-center justify-between text-xs font-bold text-navy"
                    >
                      <span className="truncate pr-2">{file.filename}</span>
                      <span className="text-brand-teal shrink-0">Download ↓</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
