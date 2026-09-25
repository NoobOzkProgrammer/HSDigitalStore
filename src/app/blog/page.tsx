import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { storeData } from '@/services/store-data';

export const metadata = {
  title: 'Printing Guides, Tutorials & Studio Inspiration | HS Digital Store',
  description:
    'Step-by-step guides on printing digital wall art, Samsung Frame TV 4K setup, 300 DPI resolutions, and home decor styling tips.',
};

export default function BlogListingPage() {
  const posts = storeData.getBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Blog Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-brand-teal">
          Studio Knowledgebase
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
          Printing Guides & Inspiration
        </h1>
        <p className="text-sm text-navy-secondary leading-relaxed">
          Master aspect ratios, Samsung Frame TV setup, fine-art paper selection, and framing techniques.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-3xl border border-brand overflow-hidden card-shadow card-shadow-hover flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full bg-cream overflow-hidden">
              <Image
                src={post.featuredImage || '/brand/social/og-default.png'}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-brand-teal bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  {post.category}
                </span>
                <h2 className="font-extrabold text-navy group-hover:text-brand-teal transition-colors text-lg leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-navy-muted line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-brand flex items-center justify-between text-xs">
                <span className="text-navy-muted">{new Date(post.publishedAt).toLocaleDateString()}</span>
                <span className="font-bold text-navy group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
