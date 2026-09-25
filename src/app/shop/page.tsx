import React from 'react';
import Link from 'next/link';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { storeData } from '@/services/store-data';
import { ProductCard } from '@/components/product/product-card';

export const metadata = {
  title: 'Shop All Digital Art Downloads & Archival Prints',
  description:
    'Browse our complete catalog of 300 DPI printable wall art, Samsung Frame TV 4K art, transparent PNG clipart, sublimation graphics, and museum posters.',
};

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    collection?: string;
    type?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;
  const { category, collection, type, search, sort } = resolvedParams;

  const products = storeData.getProducts({
    category,
    collection,
    productType: type,
    search,
    sort,
  });

  const categories = storeData.getCategories();
  const collections = storeData.getCollections();

  const currentCategory = category ? storeData.getCategoryBySlug(category) : null;
  const currentCollection = collection ? storeData.getCollectionBySlug(collection) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Category / Shop Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand card-shadow">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-teal">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Shop</span>
            {currentCategory && (
              <>
                <span>/</span>
                <span className="text-navy">{currentCategory.title}</span>
              </>
            )}
            {currentCollection && (
              <>
                <span>/</span>
                <span className="text-navy">{currentCollection.title}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
            {currentCategory
              ? currentCategory.title
              : currentCollection
              ? currentCollection.title
              : search
              ? `Search Results for "${search}"`
              : 'Shop All Art & Creative Downloads'}
          </h1>

          <p className="text-sm sm:text-base text-navy-secondary leading-relaxed">
            {currentCategory?.description ||
              currentCollection?.description ||
              'Explore instant high-resolution printable files, Samsung Frame TV 4K art, transparent clipart bundles, and museum-grade physical posters.'}
          </p>
        </div>

        {/* Filter Chips Bar */}
        <div className="mt-8 pt-6 border-t border-brand flex flex-wrap items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/shop"
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                !category && !type && !collection
                  ? 'bg-navy text-white'
                  : 'bg-[#FAF7F2] text-navy hover:bg-black/5 border border-brand'
              }`}
            >
              All Items ({storeData.getProducts().length})
            </Link>

            <Link
              href="/shop?type=DIGITAL"
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                type === 'DIGITAL'
                  ? 'bg-cyan-700 text-white'
                  : 'bg-[#FAF7F2] text-navy hover:bg-black/5 border border-brand'
              }`}
            >
              ⚡ Digital Downloads
            </Link>

            <Link
              href="/shop?type=POD"
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                type === 'POD'
                  ? 'bg-teal-700 text-white'
                  : 'bg-[#FAF7F2] text-navy hover:bg-black/5 border border-brand'
              }`}
            >
              📦 Physical Prints
            </Link>

            {categories.slice(0, 5).map((cat: any) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                  category === cat.slug
                    ? 'bg-navy text-white'
                    : 'bg-[#FAF7F2] text-navy hover:bg-black/5 border border-brand'
                }`}
              >
                {cat.title}
              </Link>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs font-semibold text-navy ml-auto">
            <span className="text-navy-muted">Sort:</span>
            <Link
              href={`/shop?${new URLSearchParams({
                ...(category && { category }),
                ...(collection && { collection }),
                ...(type && { type }),
                ...(search && { search }),
                sort: 'newest',
              }).toString()}`}
              className={`px-2.5 py-1 rounded-md border ${
                sort === 'newest' ? 'bg-navy text-white border-navy' : 'bg-white border-brand hover:bg-cream'
              }`}
            >
              Newest
            </Link>
            <Link
              href={`/shop?${new URLSearchParams({
                ...(category && { category }),
                ...(collection && { collection }),
                ...(type && { type }),
                ...(search && { search }),
                sort: 'price-low',
              }).toString()}`}
              className={`px-2.5 py-1 rounded-md border ${
                sort === 'price-low' ? 'bg-navy text-white border-navy' : 'bg-white border-brand hover:bg-cream'
              }`}
            >
              $ Low-High
            </Link>
            <Link
              href={`/shop?${new URLSearchParams({
                ...(category && { category }),
                ...(collection && { collection }),
                ...(type && { type }),
                ...(search && { search }),
                sort: 'price-high',
              }).toString()}`}
              className={`px-2.5 py-1 rounded-md border ${
                sort === 'price-high' ? 'bg-navy text-white border-navy' : 'bg-white border-brand hover:bg-cream'
              }`}
            >
              $ High-Low
            </Link>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-brand card-shadow p-8 space-y-4">
          <p className="text-4xl">🎨</p>
          <h3 className="text-xl font-bold text-navy">No products match your criteria</h3>
          <p className="text-sm text-navy-muted max-w-sm mx-auto">
            Try adjusting your search terms, changing the category filter, or resetting your selection.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-navy text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-navy-dark transition-colors"
          >
            Clear All Filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
