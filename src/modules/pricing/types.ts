export type PackageType = 'subscription' | 'addon';

export type BindingDestination = 'user' | 'guild' | 'room';

export interface ProviderPlan {
  provider: string;
  checkout_url: string;
}

export interface Package {
  serial: string;
  type: PackageType;
  name: string;
  description: string;
  price_cents: number;
  renewal_price_cents: number;
  price_currency: string;
  billing_interval: string;
  features: string[];
  sort_order: number;
  providers: ProviderPlan[];
  binding_type: BindingDestination;
}
