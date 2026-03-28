'use client';

import { useState } from 'react';

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  async function handleManage() {
    setLoading(true);
    try {
      const res = await fetch('/api/portal', { method: 'POST' });
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch {
      // silently fail
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleManage}
      disabled={loading}
      className="w-full py-3 border border-earth-300 text-earth-700 rounded-xl font-medium text-sm hover:bg-earth-50 transition-colors disabled:opacity-60"
    >
      {loading ? 'Opening...' : 'Manage Subscription'}
    </button>
  );
}
