import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, Clock, Calendar, User, ArrowRight, Download, Sparkles } from 'lucide-react';
import { storeData } from '@/services/store-data';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = storeData.getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | HS Digital Store Guide`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featuredImage || '/brand/social/og-default.png' }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = storeData.getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Schema.org Article JSON-LD
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [post.featuredImage || '/brand/social/og-default.png'],
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HS Digital Store',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hsdigitalstore.com/brand/logo-primary.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation & Breadcrumb */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-muted hover:text-navy mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Guides</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-teal uppercase tracking-wider">
            <span>{post.category}</span>
            <span>•</span>
            <span className="text-navy-muted">{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Title & Excerpt */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy leading-tight">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-navy-secondary leading-relaxed font-medium">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-navy-muted pt-2 border-t border-brand">
            <span className="font-semibold text-navy">By {post.author}</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-brand card-shadow">
          <Image
            src={post.featuredImage || '/brand/social/og-default.png'}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand card-shadow">
          <div className="prose prose-navy max-w-none text-sm sm:text-base leading-relaxed text-navy-secondary space-y-6 whitespace-pre-line">
            {post.body}
          </div>
        </div>

        {/* Internal Banner to Shop */}
        <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-brand flex flex-col sm:flex-row items-center justify-between gap-6 card-shadow">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-black text-navy text-lg">Ready to test these techniques?</h3>
            <p className="text-xs text-navy-secondary">
              Browse our instant 300 DPI high-resolution printable wall art and Samsung Frame TV files.
            </p>
          </div>
          <Link
            href="/shop"
            className="bg-navy hover:bg-navy-dark text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" />
          </Link>
        </div>
      </article>
    </>
  );
}
