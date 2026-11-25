import React, { createContext, useContext, useState } from 'react';
import type { BillingPeriod, Currency } from '@/data/types';
import { SITE_CONFIG } from '@/data/siteConfig';

interface PricingContextValue {
  currency: Currency;
  region: 'UAE' | 'UK';
  billing: BillingPeriod;
  setCurrency: (c: Currency) => void;
  setRegion: (r: 'UAE' | 'UK') => void;
  setBilling: (b: BillingPeriod) => void;
  formatAmount: (aed: number, gbp: number) => string;
}

const PricingContext = createContext<PricingContextValue | null>(null);

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(SITE_CONFIG.defaultCurrency);
  const [billing, setBilling] = useState<BillingPeriod>(SITE_CONFIG.defaultBilling);

  const setCurrency = (c: Currency) => setCurrencyState(c);
  const setRegion = (r: 'UAE' | 'UK') => setCurrencyState(r === 'UK' ? 'GBP' : 'AED');
  const region = currency === 'GBP' ? 'UK' : 'UAE';

  const formatAmount = (aed: number, gbp: number) => {
    if (currency === 'GBP') {
      return `£${new Intl.NumberFormat('en-GB').format(gbp)}`;
    }
    return `AED ${new Intl.NumberFormat('en-GB').format(aed)}`;
  };

  return (
    <PricingContext.Provider
      value={{ currency, region, billing, setCurrency, setRegion, setBilling, formatAmount }}
    >
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error('usePricing must be used inside PricingProvider');
  return ctx;
}
