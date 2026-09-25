import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { storeData } from '@/services/store-data';

const customOrderSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  productType: z.string(),
  designRequest: z.string().min(10),
  desiredSize: z.string().optional(),
  intendedUse: z.string().optional(),
  deadline: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = customOrderSchema.parse(body);

    const saved = storeData.createCustomOrder(data);

    return NextResponse.json({
      success: true,
      request: saved,
      message: 'Custom order request received successfully.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to submit request' }, { status: 400 });
  }
}
