// Module shim for the Whop checkout embed. The package ships its types via the
// "exports" map subpath (./react), which the project's "moduleResolution": "node"
// cannot read. This declaration lets tsc resolve the component without switching
// the whole project to bundler/node16 resolution.
declare module '@whop/checkout/react' {
  import type { ComponentType } from 'react';

  export interface WhopCheckoutPromoCode {
    code: string;
    [key: string]: unknown;
  }

  export interface WhopCheckoutEmbedProps {
    planId: string;
    theme?: 'light' | 'dark' | 'system';
    returnUrl?: string;
    hidePrice?: boolean;
    hideEmail?: boolean;
    onComplete?: (planId: string, receiptId?: string) => void;
    onPromoCodeChanged?: (promoCode: WhopCheckoutPromoCode | null) => void;
    [key: string]: unknown;
  }

  export const WhopCheckoutEmbed: ComponentType<WhopCheckoutEmbedProps>;
}
