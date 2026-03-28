'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { MembershipTier } from '@/lib/types';

export default function PricingToggle({ tiers }: { tiers: MembershipTier[] }) {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  async function handleCheckout(priceId: string) {
    setLoadingTier(priceId);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (res.status === 401) {
        window.location.href = '/login';
      }
    } catch {
      // silently fail
    }
    setLoadingTier(null);
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Toggle */}
      <div className="flex justify-center mb-16">
        <div className="bg-earth-100 rounded-full p-1 flex">
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              period === 'monthly' ? 'bg-white text-mystic-600 shadow-sm' : 'text-earth-500'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod('yearly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              period === 'yearly' ? 'bg-white text-mystic-600 shadow-sm' : 'text-earth-500'
            }`}
          >
            Yearly
            <span className="ml-2 text-xs text-forest-600 font-semibold">Save 17%</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => {
          const price = period === 'monthly' ? tier.price_monthly : tier.price_yearly;
          const priceId = period === 'monthly' ? tier.stripe_price_id_monthly : tier.stripe_price_id_yearly;
          const isFree = tier.sort_order === 0;
          const isPremium = tier.sort_order === 2;

          return (
            <div
              key={tier.id}
              className={`relative bg-white rounded-2xl p-8 border shadow-sm flex flex-col ${
                isPremium ? 'border-mystic-400 shadow-md' : 'border-earth-100'
              }`}
            >
              {isPremium && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mystic-100 text-mystic-700 text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="font-serif text-xl font-bold text-earth-900 mb-2">{tier.name}</h3>
              <p className="text-earth-500 text-sm mb-6">{tier.description}</p>

              <div className="mb-6">
                <span className="font-serif text-4xl font-bold text-earth-900">
                  {isFree ? 'Free' : `$${(price / 100).toFixed(price % 100 === 0 ? 0 : 2)}`}
                </span>
                {!isFree && (
                  <span className="text-earth-400 text-base">/{period === 'monthly' ? 'mo' : 'yr'}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-earth-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {isFree ? (
                <Link
                  href="/signup"
                  className="block text-center py-3 border border-earth-300 text-earth-700 rounded-xl font-medium text-sm hover:bg-earth-50 transition-colors"
                >
                  Get Started
                </Link>
              ) : (
                <button
                  onClick={() => priceId && handleCheckout(priceId)}
                  disabled={!priceId || loadingTier === priceId}
                  className="w-full py-3 bg-gradient-to-r from-mystic-600 to-mystic-500 text-white rounded-xl font-medium text-sm hover:from-mystic-700 hover:to-mystic-600 transition-all shadow-lg shadow-mystic-500/20 disabled:opacity-60"
                >
                  {loadingTier === priceId ? 'Processing...' : 'Subscribe'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
