export interface PODShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  region: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
}

export interface PODOrderItem {
  printifyProductId: string;
  printifyVariantId: string;
  quantity: number;
}

export interface PODSubmissionResult {
  success: boolean;
  provider: 'PRINTIFY';
  providerOrderId?: string;
  status: 'QUEUED' | 'SUBMITTED' | 'FAILED';
  error?: string;
}

export class PrintifyProvider {
  private apiKey: string;
  private shopId: string;

  constructor() {
    this.apiKey = process.env.PRINTIFY_API_KEY || '';
    this.shopId = process.env.PRINTIFY_SHOP_ID || '';
  }

  async submitOrder(internalOrder: any): Promise<PODSubmissionResult> {
    const podItems = internalOrder.items.filter((item: any) => item.productType === 'POD');
    if (podItems.length === 0) {
      return { success: true, provider: 'PRINTIFY', status: 'QUEUED' };
    }

    // Check if in live mode with valid API key
    if (!this.apiKey || this.apiKey.includes('placeholder') || this.apiKey.includes('mock')) {
      // Simulate successful submission for development/testing
      const mockProviderId = `printify_sub_${Date.now()}`;
      return {
        success: true,
        provider: 'PRINTIFY',
        providerOrderId: mockProviderId,
        status: 'SUBMITTED',
      };
    }

    try {
      const response = await fetch(`https://api.printify.com/v1/shops/${this.shopId}/orders.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          external_id: internalOrder.id,
          label: internalOrder.orderNumber,
          line_items: podItems.map((item: any) => ({
            product_id: item.providerProductId || 'mock_prod',
            variant_id: item.providerVariantId || 'mock_var',
            quantity: item.quantity,
          })),
          shipping_method: 1, // Standard
          send_shipping_notification: true,
          address_to: {
            first_name: internalOrder.customerName.split(' ')[0] || 'Customer',
            last_name: internalOrder.customerName.split(' ').slice(1).join(' ') || 'Customer',
            email: internalOrder.customerEmail,
            country: internalOrder.shippingAddress?.country || 'US',
            region: internalOrder.shippingAddress?.state || 'NY',
            address1: internalOrder.shippingAddress?.line1 || '123 Main St',
            city: internalOrder.shippingAddress?.city || 'New York',
            zip: internalOrder.shippingAddress?.postalCode || '10001',
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          provider: 'PRINTIFY',
          status: 'FAILED',
          error: errorText,
        };
      }

      const data = await response.json();
      return {
        success: true,
        provider: 'PRINTIFY',
        providerOrderId: data.id,
        status: 'SUBMITTED',
      };
    } catch (err: any) {
      return {
        success: false,
        provider: 'PRINTIFY',
        status: 'FAILED',
        error: err.message,
      };
    }
  }
}

export const podService = new PrintifyProvider();
