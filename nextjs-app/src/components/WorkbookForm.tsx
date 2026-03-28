'use client';

import { useState } from 'react';

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxDUX1x-6pRiKoVGuGf1eNE6egVGCDOCcDUt0tFpprY3D68Io-kldA7wyG0_HHutLHm/exec';

type Variant = 'dark' | 'light';

export default function WorkbookForm({ variant = 'dark' }: { variant?: Variant }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const data = new URLSearchParams(new FormData(e.currentTarget) as unknown as Record<string, string>);
    data.set('type', 'workbook');
    try {
      await fetch(SCRIPT_URL, { method: 'POST', body: data, mode: 'no-cors' });
    } finally {
      setStatus('done');
    }
  }

  if (status === 'done') {
    return (
      <div className="text-center py-4">
        <svg className="w-12 h-12 text-gold-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-white font-serif text-xl font-bold mb-2">Check your inbox.</p>
        <p className="text-earth-300 text-sm">The workbook is on its way.</p>
      </div>
    );
  }

  const inputClass =
    variant === 'dark'
      ? 'w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-earth-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all'
      : 'w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-earth-400 focus:outline-none focus:border-gold-400 transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Your first name" required className={inputClass} />
      <input type="email" name="email" placeholder="your@email.com" required className={inputClass} />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-earth-900 rounded-xl font-semibold hover:from-gold-400 hover:to-gold-300 transition-all shadow-lg shadow-gold-500/25 disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending...' : 'Send me the workbook'}
      </button>
      <p className="text-earth-400 text-xs mt-4 text-center">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
