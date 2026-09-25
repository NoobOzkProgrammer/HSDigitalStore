'use client';

import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2 } from 'lucide-react';
import { storeData } from '@/services/store-data';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(storeData.getCoupons());
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FIXED'>('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState('20');
  const [minOrder, setMinOrder] = useState('0');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const val = discountType === 'PERCENTAGE' ? parseInt(discountValue) : Math.round(parseFloat(discountValue) * 100);
    const minCents = Math.round(parseFloat(minOrder) * 100);

    const created = storeData.createCoupon({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: val,
      minOrderAmount: minCents,
      maxUses: 500,
      timesUsed: 0,
      digitalOnly: false,
      physicalOnly: false,
      active: true,
    });

    setCoupons([created, ...coupons]);
    setCode('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-navy">Promotional Coupons</h1>
        <p className="text-xs text-navy-muted">
          Create percentage or fixed-amount discount codes verified authoritatively at server checkout.
        </p>
      </div>

      {/* Create Coupon Card */}
      <div className="bg-white p-6 rounded-3xl border border-brand card-shadow space-y-4 max-w-2xl">
        <h2 className="text-sm font-bold text-navy flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-teal" />
          <span>Create New Promo Code</span>
        </h2>

        <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">Coupon Code (Uppercase)</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. FLASH25"
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy uppercase font-mono font-bold focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>

            <div>
              <label className="font-bold text-navy block mb-1">Discount Type</label>
              <select
                value={discountType}
                onChange={(e: any) => setDiscountType(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy"
              >
                <option value="PERCENTAGE">Percentage (%) Off</option>
                <option value="FIXED">Fixed Dollar ($) Off</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">
                {discountType === 'PERCENTAGE' ? 'Discount Percentage (%)' : 'Discount Amount ($ USD)'}
              </label>
              <input
                type="number"
                required
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>

            <div>
              <label className="font-bold text-navy block mb-1">Minimum Order Amount ($ USD)</label>
              <input
                type="number"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-navy hover:bg-navy-dark text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
          >
            Create Coupon Code
          </button>
        </form>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-brand card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-brand text-navy uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Min. Order</th>
                <th className="py-3 px-4">Times Used</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand/60 text-navy font-medium">
              {coupons.map((c: any) => (
                <tr key={c.id}>
                  <td className="py-3 px-4 font-mono font-bold text-brand-teal">
                    {c.code}
                  </td>
                  <td className="py-3 px-4 font-bold">
                    {c.discountType === 'PERCENTAGE' ? `${c.discountValue}% OFF` : `$${(c.discountValue / 100).toFixed(2)} OFF`}
                  </td>
                  <td className="py-3 px-4 text-navy-muted">
                    {c.minOrderAmount > 0 ? `$${(c.minOrderAmount / 100).toFixed(2)}` : 'None'}
                  </td>
                  <td className="py-3 px-4">
                    {c.timesUsed} uses
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800">
                      Active
                    </span>
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
