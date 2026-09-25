import React from 'react';
import Link from 'next/link';
import { Download, FileText, ArrowLeft, ShieldCheck, Clock, RefreshCw, AlertCircle } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { storeData } from '@/services/store-data';

export const metadata = {
  title: 'My Download Library | HS Digital Store',
  description: 'Access your purchased 300 DPI high-resolution digital art files, aspect ratios, and printing guides.',
};

export default async function DownloadsPage() {
  const session = await getSession();
  const customerEmail = session?.email || 'alex.rivera@example.com';
  const entitlements = storeData.getEntitlements(customerEmail);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-muted hover:text-navy mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Account</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-navy">My Download Library</h1>
            <p className="text-sm text-navy-secondary">
              Lifetime access to your uncompressed 300 DPI printable files and guides.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authenticated License Vault</span>
          </div>
        </div>
      </div>

      {/* Entitlements List */}
      {entitlements.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-brand card-shadow space-y-4">
          <Download className="w-12 h-12 text-navy-muted mx-auto" />
          <h2 className="text-xl font-bold text-navy">No downloads available yet</h2>
          <p className="text-sm text-navy-secondary max-w-sm mx-auto">
            Once you purchase digital wall art or Frame TV items, your files will appear here immediately.
          </p>
          <Link
            href="/shop?type=DIGITAL"
            className="inline-block bg-navy text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-navy-dark transition-colors"
          >
            Browse Digital Downloads
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {entitlements.map((ent: any) => {
            const remaining = ent.allowedDownloads - ent.downloadCount;
            const isExpired = new Date() > new Date(ent.expiresAt);

            return (
              <div
                key={ent.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-brand card-shadow space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-brand">
                  <div>
                    <h2 className="text-lg font-black text-navy">{ent.productTitle}</h2>
                    <div className="flex items-center gap-3 text-xs text-navy-muted mt-1">
                      <span>Order #{ent.orderNumber}</span>
                      <span>•</span>
                      <span>Granted on {new Date(ent.grantedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-navy bg-[#FAF7F2] border border-brand px-3 py-1 rounded-full">
                      {remaining} downloads remaining
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        isExpired
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {isExpired ? 'Expired' : 'Active'}
                    </span>
                  </div>
                </div>

                {/* File Download Buttons Grid */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-teal">
                    Included Source Files & Ratio Archives:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ent.files.map((file: any, idx: number) => {
                      const downloadToken = Buffer.from(
                        `${ent.id}:${file.filename}:${Date.now()}`
                      ).toString('base64');

                      return (
                        <a
                          key={idx}
                          href={`/api/downloads/file?token=${downloadToken}`}
                          download
                          className="flex items-center justify-between p-3.5 bg-[#FAF7F2] hover:bg-cream border border-brand rounded-2xl transition-all group"
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            <div className="w-8 h-8 rounded-lg bg-white border border-brand flex items-center justify-center shrink-0 text-navy">
                              <FileText className="w-4 h-4 text-brand-teal" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-navy truncate">{file.filename}</p>
                              <p className="text-[10px] text-navy-muted">
                                {file.fileType} • {file.fileSize ? `${(file.fileSize / 1000000).toFixed(1)} MB` : '300 DPI'}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-navy group-hover:text-brand-teal shrink-0">
                            Download <Download className="w-3.5 h-3.5" />
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Instructions footer */}
                <div className="pt-2 text-[11px] text-navy-muted flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-navy-muted" />
                  <span>Access valid through {new Date(ent.expiresAt).toLocaleDateString()}. Re-download anytime before expiration.</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
