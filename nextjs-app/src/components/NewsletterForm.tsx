'use client';

import { useState } from 'react';

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxDUX1x-6pRiKoVGuGf1eNE6egVGCDOCcDUt0tFpprY3D68Io-kldA7wyG0_HHutLHm/exec';

export default function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const data = new URLSearchParams(new FormData(e.currentTarget) as unknown as Record<string, string>);
    data.set('type', 'newsletter');
    try {
      await fetch(SCRIPT_URL, { method: 'POST', body: data, mode: 'no-cors' });
    } finally {
      setStatus('done');
    }
  }

  if (status === 'done') {
    return <p className="text-forest-600 font-medium py-3">You&apos;re in. Talk soon.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        className="flex-1 px-5 py-3 rounded-full border border-earth-200 focus:outline-none focus:border-mystic-400 focus:ring-2 focus:ring-mystic-100 transition-all"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-8 py-3 bg-mystic-600 text-white rounded-full font-medium hover:bg-mystic-700 transition-colors whitespace-nowrap disabled:opacity-60"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}
