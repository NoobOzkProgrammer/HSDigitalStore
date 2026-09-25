'use client';

import React, { useState } from 'react';
import { Mail, Clock, ShieldCheck, CheckCircle2, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order & Download Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-brand-teal">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy">Contact Support</h1>
        <p className="text-sm text-navy-secondary">
          Have a question about an order, custom size, or file compatibility? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-brand card-shadow">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-navy">Message Sent!</h2>
              <p className="text-xs text-navy-secondary max-w-sm mx-auto">
                Thank you, {name}. Our team will review your message and reply to {email} within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-navy block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-navy block mb-1">Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy"
                >
                  <option value="Order & Download Inquiry">Download Assistance & Order Help</option>
                  <option value="Custom Size Request">Custom Size or Aspect Ratio Request</option>
                  <option value="Samsung Frame TV Help">Samsung Frame TV Art Setup</option>
                  <option value="Commercial License Inquiry">Commercial License Inquiry</option>
                  <option value="General Question">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-navy block mb-1">Your Message</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you today? Please include order number if applicable."
                  className="w-full bg-[#FAF7F2] border border-brand rounded-xl px-3 py-2 text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-navy hover:bg-navy-dark text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-brand-yellow" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-brand card-shadow space-y-4 text-xs">
            <h3 className="font-bold text-navy text-sm">Direct Support</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy block">Email Us</span>
                  <a href="mailto:support@hsdigitalstore.com" className="text-brand-teal hover:underline font-semibold">
                    support@hsdigitalstore.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy block">Operating Hours</span>
                  <span className="text-navy-muted">Monday – Friday: 9am – 6pm EST</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy block">U.S. Merchant Support</span>
                  <span className="text-navy-muted">Guaranteed response within 24-48 business hours.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
