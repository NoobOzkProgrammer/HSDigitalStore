import React from 'react';
import Link from 'next/link';
import { HelpCircle, Download, Tv, Printer, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Frequently Asked Questions | HS Digital Store',
  description: 'Answers to common questions about printing digital wall art, Samsung Frame TV 4K setup, commercial licensing, and refunds.',
};

const faqs = [
  {
    q: 'How do I receive my digital files after purchase?',
    a: 'Immediately after completing checkout, you will be redirected to an order confirmation screen with active download links for all files in your order. Additionally, an order receipt with your personal download links is sent directly to your email, and files are permanently stored in your account library.',
  },
  {
    q: 'What resolution are the printable files?',
    a: 'Every printable wall art design is exported at 300 DPI (Dots Per Inch) at maximum scale. This is the professional standard for fine art and commercial printing, ensuring crisp, razor-sharp detail without pixelation when printed large.',
  },
  {
    q: 'What aspect ratios are included with wall art purchases?',
    a: 'Each wall art listing comes packaged with 5 standard ratios: 2:3 ratio (prints up to 24x36"), 3:4 ratio (prints up to 18x24"), 4:5 ratio (prints up to 16x20"), ISO format (A5, A4, A3, A2, A1), and 11x14". A comprehensive printing guide PDF is also included.',
  },
  {
    q: 'How do I add digital artwork to my Samsung Frame TV?',
    a: 'All our Frame TV listings are pre-sized to 3840 x 2160 pixels (16:9 4K). You simply download the JPG to your phone, open the free Samsung SmartThings app, select your Frame TV, tap "Art Mode" -> "Add Your Photos+", and save it to the television. You can choose whether to apply a shadowbox mat or display the art edge-to-edge.',
  },
  {
    q: 'Can I sell physical items made with your clipart or sublimation graphics?',
    a: 'Yes! Items marked with our "Small Commercial License" allow small businesses and crafters to create up to 500 physical end products (such as t-shirts, mugs, planner stickers, or tumblers). You may not, however, resell or redistribute the digital source files.',
  },
  {
    q: 'Do you offer physical printed products?',
    a: 'Yes! We offer museum-quality archival posters printed on heavyweight 250 gsm (110 lb) paper with fade-resistant giclée pigment inks. These are printed to order and shipped in protective heavy-duty mailing tubes directly to your address.',
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-brand-teal">
          Customer Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy">Frequently Asked Questions</h1>
        <p className="text-sm text-navy-secondary">
          Find answers about downloading, printing, aspect ratios, and Frame TV setup.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-brand card-shadow space-y-2"
          >
            <h3 className="text-base sm:text-lg font-bold text-navy flex items-start gap-2.5">
              <span className="text-brand-teal font-black">Q.</span>
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs sm:text-sm text-navy-secondary leading-relaxed pl-6">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-brand text-center space-y-4 card-shadow">
        <h2 className="text-xl font-black text-navy">Still have a question?</h2>
        <p className="text-xs sm:text-sm text-navy-secondary max-w-md mx-auto">
          Our U.S.-based support team is always here to assist with file sizes, custom framing inquiries, or technical support.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-navy text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-navy-dark transition-all"
        >
          Contact Support <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" />
        </Link>
      </div>
    </div>
  );
}
