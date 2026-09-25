import React from 'react';
import { Sparkles, Mail, Calendar } from 'lucide-react';
import { storeData } from '@/services/store-data';

export const metadata = {
  title: 'Custom Order Inquiries | HS Digital Store Admin',
};

export default function AdminCustomOrdersPage() {
  const customOrders = storeData.getCustomOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-navy">Custom Design Requests</h1>
        <p className="text-xs text-navy-muted">
          Review incoming client inquiries for bespoke wall art, Frame TV sizes, and personalized printables.
        </p>
      </div>

      {customOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-brand card-shadow space-y-3">
          <Sparkles className="w-10 h-10 text-brand-yellow mx-auto" />
          <h2 className="text-lg font-bold text-navy">No pending custom requests</h2>
          <p className="text-xs text-navy-muted">
            Incoming submissions from /custom-orders will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {customOrders.map((req: any) => (
            <div key={req.id} className="bg-white rounded-3xl p-6 border border-brand card-shadow space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand">
                <div>
                  <h3 className="font-extrabold text-navy text-sm">{req.name}</h3>
                  <span className="text-navy-muted flex items-center gap-1 mt-0.5">
                    <Mail className="w-3.5 h-3.5" /> {req.email}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full font-bold bg-amber-50 text-amber-800 border border-amber-200 text-[10px]">
                  {req.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-brand">
                  <span className="font-bold text-navy block">Category</span>
                  <span className="text-navy-muted">{req.productType}</span>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-brand">
                  <span className="font-bold text-navy block">Size / Resolution</span>
                  <span className="text-navy-muted">{req.desiredSize || 'Standard'}</span>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-brand">
                  <span className="font-bold text-navy block">Intended Use</span>
                  <span className="text-navy-muted">{req.intendedUse || 'Personal'}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-brand space-y-1">
                <span className="font-bold text-navy block">Client Vision & Description:</span>
                <p className="text-navy-secondary leading-relaxed">{req.designRequest}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
