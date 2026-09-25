import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hsdigitalstore.com'),
  title: {
    default: 'HS Digital Store | Printable Wall Art, Frame TV Art & Creative Downloads',
    template: '%s | HS Digital Store',
  },
  description:
    'Shop premium 300 DPI printable wall art, 4K Samsung Frame TV art, original anime artwork, transparent PNG clipart bundles, and museum-quality physical posters.',
  keywords: [
    'printable wall art',
    'samsung frame tv art',
    'original anime art',
    'clipart bundles',
    'sublimation graphics',
    'digital downloads',
    'print on demand',
    '300 dpi printable art',
  ],
  authors: [{ name: 'HS Digital Store' }],
  creator: 'HS Digital Store',
  icons: {
    icon: [
      { url: '/brand/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/favicons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicons/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/brand/favicons/apple-touch-icon.png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hsdigitalstore.com',
    siteName: 'HS Digital Store',
    title: 'HS Digital Store | Printable Wall Art, Frame TV Art & Creative Downloads',
    description:
      'Instant 300 DPI high-resolution printable wall art, 4K Samsung Frame TV downloads, original anime artwork, and physical archival posters.',
    images: [
      {
        url: '/brand/social/og-default.png',
        width: 1200,
        height: 630,
        alt: 'HS Digital Store Marketplace & Design Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HS Digital Store | Creative Marketplace',
    description: 'Instant 300 DPI digital art downloads, Frame TV files, and original creative designs.',
    images: ['/brand/social/og-default.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F6F1E8] text-[#102D5C]">
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
