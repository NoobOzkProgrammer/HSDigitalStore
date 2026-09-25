'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      router.push(data.redirectTo || '/account');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 relative mx-auto mb-2">
          <Image
            src="/brand/marks/hs-mark.svg"
            alt="HSDigitalStore Logo"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-black text-navy">Account Sign In</h1>
        <p className="text-xs text-navy-secondary">
          Access your digital files, download history, and order tracking.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-800">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Login Card */}
      <form onSubmit={handleLogin} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand card-shadow space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-navy block">Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.rivera@example.com"
              className="w-full bg-[#FAF7F2] border border-brand rounded-xl pl-9 pr-3 py-2.5 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-navy"
            />
            <Mail className="w-4 h-4 text-navy-muted absolute left-3 top-3" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-navy block">Password</label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#FAF7F2] border border-brand rounded-xl pl-9 pr-3 py-2.5 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-navy"
            />
            <Lock className="w-4 h-4 text-navy-muted absolute left-3 top-3" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy hover:bg-navy-dark text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Quick Demo Credentials Box */}
      <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-brand space-y-3 text-xs">
        <p className="font-bold text-navy">Quick One-Click Test Accounts:</p>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleQuickFill('admin@hsdigitalstore.com', 'AdminHS2026!')}
            className="w-full p-2.5 bg-white border border-brand rounded-xl text-left hover:border-navy transition-all flex items-center justify-between"
          >
            <div>
              <span className="font-bold text-navy block">Store Administrator</span>
              <span className="text-[11px] text-navy-muted">admin@hsdigitalstore.com</span>
            </div>
            <span className="text-[11px] font-bold text-brand-teal">Auto-fill →</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFill('alex.rivera@example.com', 'Customer2026!')}
            className="w-full p-2.5 bg-white border border-brand rounded-xl text-left hover:border-navy transition-all flex items-center justify-between"
          >
            <div>
              <span className="font-bold text-navy block">Customer Account</span>
              <span className="text-[11px] text-navy-muted">alex.rivera@example.com</span>
            </div>
            <span className="text-[11px] font-bold text-brand-teal">Auto-fill →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
