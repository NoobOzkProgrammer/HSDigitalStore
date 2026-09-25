import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Download, Package, ArrowRight, ShieldCheck, Mail, FileText } from 'lucide-react';
import { storeData } from '@/services/store-data';
import { handlePaymentSuccess } from '@/services/payment';

interface SuccessPageProps {
  searchParams: Promise<{
    orderNumber?: string;
    mock_paid?: string;
    session_id?: string;
  }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const orderNumber = params.orderNumber;

  if (!orderNumber) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-navy">Order Confirmation</h1>
        <p className="text-sm text-navy-secondary">No order reference provided.</p>
        <Link href="/" className="inline-block bg-navy text-white text-xs font-bold px-6 py-2.5 rounded-xl">
          Return to Home
        </Link>
      </div>
    );
  }

  // Authoritatively update order state to PAID on success if arriving from payment flow
  const order = await handlePaymentSuccess(orderNumber, 'STRIPE', params.session_id || 'mock_session');
  const entitlements = storeData.getEntitlements(order.customerEmail);

  const hasDigital = order.items.some((i: any) => i.productType === 'DIGITAL' || i.productType === 'BUNDLE');
  const hasPod = order.items.some((i: any) => i.productType === 'POD');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Success Banner */}
      <div className="bg-white rounded-3xl p-8 border border-brand card-shadow text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-black uppercase tracking-wider text-brand-teal">
          Payment Confirmed
        </span>

        <h1 className="text-3xl font-black text-navy">Thank You for Your Order!</h1>

        <p className="text-sm text-navy-secondary max-w-md mx-auto">
          We have sent your receipt and download access instructions to{' '}
          <strong className="text-navy">{order.customerEmail}</strong>.
        </p>

        <div className="inline-block bg-[#FAF7F2] border border-brand px-4 py-2 rounded-xl text-xs font-mono font-bold text-navy">
          Order Reference: #{order.orderNumber}
        </div>
      </div>

      {/* Instant Digital Download Hub */}
      {hasDigital && (
        <div className="bg-white rounded-3xl p-8 border-2 border-brand-teal/40 card-shadow space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-800">
                <Download className="w-5 h-5 text-brand-cyan" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-navy">Instant Digital Downloads Ready</h2>
                <p className="text-xs text-navy-muted">Click below to download your 300 DPI high-resolution files</p>
              </div>
            </div>
            <Link
              href="/account/downloads"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:underline"
            >
              <span>View In Download Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4 pt-2">
            {entitlements.map((ent: any) => (
              <div key={ent.id} className="bg-[#FAF7F2] p-5 rounded-2xl border border-brand space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-navy text-sm">{ent.productTitle}</h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Entitlement Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {ent.files.map((file: any, idx: number) => (
                    <a
                      key={idx}
                      href={`/api/downloads/file?token=${Buffer.from(`${ent.id}:${file.filename}:${Date.now()}`).toString('base64')}`}
                      download
                      className="flex items-center justify-between p-3 bg-white rounded-xl border border-brand hover:border-navy transition-all text-xs font-bold text-navy group"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <FileText className="w-4 h-4 text-brand-teal shrink-0" />
                        <span className="truncate">{file.filename}</span>
                      </div>
                      <span className="text-brand-teal group-hover:translate-x-0.5 transition-transform shrink-0">
                        Download ↓
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* POD Notice */}
      {hasPod && (
        <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-brand card-shadow flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 shrink-0">
            <Package className="w-5 h-5 text-brand-teal" />
          </div>
          <div className="space-y-1 text-xs">
            <h3 className="font-bold text-navy text-sm">Print-on-Demand Fulfillment In Progress</h3>
            <p className="text-navy-secondary">
              Your physical print order has been submitted to our archival printing lab. You will receive an email notification with carrier tracking (USPS) as soon as your package ships.
            </p>
          </div>
        </div>
      )}

      {/* Summary Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-brand-teal"
        >
          <span>Continue Shopping</span>
        </Link>

        <Link
          href="/account"
          className="bg-navy hover:bg-navy-dark text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-sm"
        >
          Go to Customer Account
        </Link>
      </div>
    </div>
  );
}
