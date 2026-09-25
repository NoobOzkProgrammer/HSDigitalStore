import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

interface PolicyPageProps {
  params: Promise<{ policy: string }>;
}

const policyData: Record<
  string,
  { title: string; subtitle: string; content: string }
> = {
  terms: {
    title: 'Terms of Service',
    subtitle: 'Standard commercial and website operational agreement for HSDigitalStore.',
    content: `
### 1. Agreement to Terms
By accessing or placing an order through HS Digital Store ("we," "our," or "us"), you agree to be bound by these Terms of Service and all applicable federal and state laws of the United States. If you do not agree, you must discontinue use of the site immediately.

### 2. Digital Products & Delivery
All printable wall art, Samsung Frame TV art, PNG clipart, and digital planners sold on this website are delivered electronically. Upon confirmed payment authorization through Stripe or PayPal, digital entitlements are granted immediately to your account and download links are dispatched to the provided email address. No physical items will be shipped for digital-only purchases.

### 3. Physical Print-on-Demand (POD) Products
Physical posters, framed prints, and merchandise are custom printed on demand by our production partners. Production times generally take 2-4 business days before carrier dispatch (USPS/FedEx). Tracking information is provided via email once the carrier scans the parcel.

### 4. Merchant Jurisdiction
The merchant business is established and operated in the United States. All transactions are settled in U.S. Dollars (USD) unless explicitly stated otherwise.
    `,
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How HS Digital Store protects and respects your personal and payment data.',
    content: `
### 1. Information We Collect
We collect personal information necessary to fulfill digital entitlements and physical orders:
- **Contact Details:** Name, email address, and optional phone number.
- **Shipping Address:** Only collected when ordering physical print-on-demand goods.
- **Transactional Snapshots:** Order items, timestamps, and payment confirmation IDs.

### 2. Payment Security
We NEVER store full credit card numbers, CVVs, or bank login credentials on our servers. All credit card transactions are tokenized directly through certified PCI-DSS compliant providers (Stripe and PayPal).

### 3. Digital Asset Protection & Cookies
We use secure session cookies to verify download entitlements and maintain your shopping cart. We do not sell your personal data to data brokers or advertising exchanges.
    `,
  },
  'digital-downloads': {
    title: 'Digital Download Policy',
    subtitle: 'Everything you need to know about accessing, saving, and printing your files.',
    content: `
### 1. Instant Access Guarantee
Your files are ready for instant download immediately upon completion of checkout. A permanent download record is also generated in your customer account.

### 2. What Is Included in Printable Art
Each printable wall art download includes uncompressed, ultra-sharp **300 DPI** files organized into 5 primary aspect ratios:
- **2:3 Ratio:** Prints 4x6, 8x12, 12x18, 16x24, 20x30, 24x36 inches
- **3:4 Ratio:** Prints 6x8, 9x12, 12x16, 15x20, 18x24 inches
- **4:5 Ratio:** Prints 4x5, 8x10, 12x15, 16x20 inches
- **ISO Standard:** Prints A5, A4, A3, A2, A1
- **11:14 Ratio:** Prints 11x14 inches

### 3. Re-download Vault
All files remain accessible in your customer library for a minimum of 365 days with up to 10 downloads allowed per file. If you ever misplace your files, you can re-access them anytime from your account.
    `,
  },
  license: {
    title: 'Product License Terms',
    subtitle: 'Clear definitions of Personal Use and Small Commercial allowances.',
    content: `
### 1. Personal Use License (Standard)
Unless specified otherwise, digital purchases grant you a perpetual, non-exclusive license to:
- Print unlimited copies for personal home, apartment, office, or dorm décor.
- Display 4K art files on personal Samsung Frame TVs and smart displays.
- Give a printed physical copy as a personal gift to a friend or family member.

### 2. Commercial Restrictions
You may NOT:
- Resell, redistribute, share, sublicense, or transfer the original digital source files.
- Upload our designs to public file-sharing networks, stock platforms, or pirate forums.
- Claim ownership or original authorship of the artwork.

### 3. Small Commercial License (Clipart & Sublimation)
Products marked with "Small Commercial License" allow you to create up to **500 physical end products** (such as mugs, shirts, planner stickers, or greeting cards) where our graphic is incorporated into a tangible physical good.
    `,
  },
  refunds: {
    title: 'Refund & Return Policy',
    subtitle: 'Fair, transparent return terms for digital downloads and physical POD items.',
    content: `
### 1. Digital Downloads
Due to the instant electronic nature of digital goods, digital downloads generally cannot be returned once access is granted. However, your complete satisfaction is our priority:
- If a file is corrupt, incomplete, or damaged, our support team will immediately provide replacement files or issue a full refund within 14 days of purchase.

### 2. Print-on-Demand Physical Items
Physical items are custom printed upon order. If your physical print arrives damaged, misprinted, or defective, please contact support@hsdigitalstore.com with a photo of the defect within 14 days of delivery for a free reprint or full refund.
    `,
  },
  copyright: {
    title: 'Intellectual Property & Copyright Policy',
    subtitle: 'Our commitment to original creations and rights protection.',
    content: `
### 1. Originality Standard
HS Digital Store is committed to 100% original artwork, Japanese manga-inspired aesthetics, and licensed creative vectors. We do not sell counterfeit or infringing merchandise derived from protected third-party franchises.

### 2. DMCA & Rights Inquiries
If you believe that any design listed on our site infringes upon your copyrighted intellectual property, please submit an official notice to:
**Attn:** IP & Legal Review  
**Email:** support@hsdigitalstore.com  
Please include: the specific URL, description of copyrighted work, evidence of ownership, and physical/electronic signature.
    `,
  },
};

export default async function PolicyDetailPage({ params }: PolicyPageProps) {
  const { policy } = await params;
  const data = policyData[policy];

  if (!data) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-muted hover:text-navy mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-navy">{data.title}</h1>
        <p className="text-sm text-navy-secondary mt-1">{data.subtitle}</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand card-shadow">
        <div className="prose prose-navy max-w-none text-xs sm:text-sm leading-relaxed text-navy-secondary space-y-4 whitespace-pre-line">
          {data.content}
        </div>
      </div>

      <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-brand text-[11px] text-navy-muted text-center">
        Last updated: September 2026. For questions regarding our policies, contact support@hsdigitalstore.com.
      </div>
    </div>
  );
}
