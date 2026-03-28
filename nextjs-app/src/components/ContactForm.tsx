'use client';

import { useState } from 'react';

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxDUX1x-6pRiKoVGuGf1eNE6egVGCDOCcDUt0tFpprY3D68Io-kldA7wyG0_HHutLHm/exec';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const data = new URLSearchParams(new FormData(e.currentTarget) as unknown as Record<string, string>);
    data.set('type', 'contact');
    try {
      await fetch(SCRIPT_URL, { method: 'POST', body: data, mode: 'no-cors' });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-bold mb-3">Message received.</h3>
        <p className="text-earth-600 max-w-sm mx-auto">Thank you for reaching out. I&apos;ll read your message and get back to you within a few days if there&apos;s something useful I can add.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-2" htmlFor="name">Your name</label>
          <input
            type="text" id="name" name="name" required placeholder="First name is fine"
            className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:border-mystic-400 focus:ring-2 focus:ring-mystic-100 transition-all text-earth-900 placeholder-earth-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-2" htmlFor="email">Email address</label>
          <input
            type="email" id="email" name="email" required placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:border-mystic-400 focus:ring-2 focus:ring-mystic-100 transition-all text-earth-900 placeholder-earth-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-700 mb-2" htmlFor="subject">What&apos;s this about?</label>
        <select
          id="subject" name="subject" required
          className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:border-mystic-400 focus:ring-2 focus:ring-mystic-100 transition-all text-earth-900 bg-white"
        >
          <option value="" disabled>Select a topic</option>
          <option value="integration">Integration support</option>
          <option value="program">Program or cohort inquiry</option>
          <option value="collaboration">Collaboration or media</option>
          <option value="content">Content question</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-700 mb-2" htmlFor="message">Your message</label>
        <textarea
          id="message" name="message" required rows={6}
          placeholder="Tell me what's on your mind. The more context you give, the more useful my response will be."
          className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:border-mystic-400 focus:ring-2 focus:ring-mystic-100 transition-all text-earth-900 placeholder-earth-300 resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" id="newsletter" name="newsletter" value="on" className="mt-1 rounded border-earth-300 text-mystic-600 focus:ring-mystic-400" />
        <label htmlFor="newsletter" className="text-sm text-earth-600">Also add me to the weekly newsletter: integration insights, new articles, and occasional announcements.</label>
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">Something went wrong. Please email <a href="mailto:hello@thepsilosopher.com" className="underline">hello@thepsilosopher.com</a> directly.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 text-white rounded-xl font-medium hover:from-mystic-700 hover:to-mystic-600 transition-all shadow-lg shadow-mystic-500/20 text-sm disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      <p className="text-earth-400 text-xs text-center">Your message is private. I don&apos;t share personal information with anyone.</p>
    </form>
  );
}
