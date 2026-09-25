import { NextRequest, NextResponse } from 'next/server';
import { storeData } from '@/services/store-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return new NextResponse('Unauthorized: Missing download token', { status: 401 });
    }

    // Decode token entitlement:filename:timestamp
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [entitlementId, filename] = decoded.split(':');

    if (!entitlementId || !filename) {
      return new NextResponse('Invalid download token structure', { status: 400 });
    }

    const entitlement = storeData.getEntitlementById(entitlementId);
    if (!entitlement || entitlement.status !== 'ACTIVE') {
      return new NextResponse('Download entitlement is expired, revoked, or not found.', {
        status: 403,
      });
    }

    // Check expiration date
    if (new Date() > new Date(entitlement.expiresAt)) {
      return new NextResponse('Download link has expired. Please contact support.', {
        status: 410,
      });
    }

    // Check download count limit
    if (entitlement.downloadCount >= entitlement.allowedDownloads) {
      return new NextResponse('Download count limit reached for this asset.', { status: 429 });
    }

    // Record download event
    entitlement.downloadCount += 1;
    storeData.logAudit('customer', 'DOWNLOAD_EXECUTED', 'DIGITAL_ASSET', filename, {
      entitlementId,
      remaining: entitlement.allowedDownloads - entitlement.downloadCount,
    });

    // Provide a sample high-res binary package stream or redirect to private signed blob URL
    // In production: return NextResponse.redirect(signedBlobUrl)
    const content = `HS DIGITAL STORE - OFFICIAL DIGITAL ASSET
Product: ${entitlement.productTitle}
File: ${filename}
License: Verified Personal & Small Commercial License
Resolution: 300 DPI High-Resolution Master
Order Reference: ${entitlement.orderNumber}
Thank you for supporting independent creative digital art!`;

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err: any) {
    return new NextResponse(err.message || 'Error executing file download', { status: 500 });
  }
}
