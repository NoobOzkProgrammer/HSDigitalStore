import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { storeData } from '@/services/store-data';

const productSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  shortDescription: z.string(),
  description: z.string().min(10),
  productType: z.enum(['DIGITAL', 'POD', 'PHYSICAL', 'BUNDLE']),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  sku: z.string().min(2),
  basePrice: z.number().int().positive(), // in cents
  salePrice: z.number().int().positive().optional(),
  rightsStatus: z.enum(['ORIGINAL', 'LICENSED', 'PUBLIC_DOMAIN', 'REQUIRES_REVIEW']),
  licenseType: z.enum(['PERSONAL', 'COMMERCIAL_SMALL', 'COMMERCIAL_EXTENDED']),
  categorySlugs: z.array(z.string()),
  imageUrl: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = productSchema.parse(body);

    const newProd = storeData.createProduct({
      id: `prod-${Date.now()}`,
      slug: data.slug,
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      productType: data.productType,
      status: data.status,
      sku: data.sku,
      basePrice: data.basePrice,
      salePrice: data.salePrice,
      currency: 'USD',
      featured: false,
      newArrival: true,
      bestSeller: false,
      rightsStatus: data.rightsStatus,
      licenseType: data.licenseType,
      tags: [data.title.toLowerCase()],
      specs: { dpi: 300, format: 'JPG/ZIP' },
      categorySlugs: data.categorySlugs,
      collectionSlugs: [],
      images: [
        {
          url: data.imageUrl,
          altText: data.title,
          imageRole: 'FEATURED',
          width: 1200,
          height: 1200,
        },
      ],
      digitalAssets:
        data.productType === 'DIGITAL'
          ? [
              {
                filename: `${data.slug}_300DPI_Master.zip`,
                fileType: 'ZIP',
                fileSize: 35000000,
                storageKey: `assets/${data.slug}/master.zip`,
              },
            ]
          : undefined,
    });

    return NextResponse.json({ success: true, product: newProd });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 400 });
  }
}
