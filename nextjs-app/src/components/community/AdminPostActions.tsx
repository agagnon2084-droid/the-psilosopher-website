'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CommunityPostWithMeta } from '@/lib/types';

export default function AdminPostActions({ post }: { post: CommunityPostWithMeta }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function togglePin() {
    setLoading(true);
    await fetch(`/api/admin/community/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_pinned: !post.is_pinned }),
    });
    router.refresh();
    setLoading(false);
  }

  async function toggleLock() {
    setLoading(true);
    await fetch(`/api/admin/community/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_locked: !post.is_locked }),
    });
    router.refresh();
    setLoading(false);
  }

  async function deletePost() {
    if (!confirm('Delete this post and all its comments?')) return;
    setLoading(true);
    await fetch(`/api/admin/community/${post.id}`, { method: 'DELETE' });
    router.push('/community');
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={togglePin}
        disabled={loading}
        className="text-xs px-2.5 py-1 rounded-lg border border-earth-200 text-earth-500 hover:text-gold-600 hover:border-gold-300 transition-colors disabled:opacity-50"
        title={post.is_pinned ? 'Unpin' : 'Pin'}
      >
        {post.is_pinned ? 'Unpin' : 'Pin'}
      </button>
      <button
        onClick={toggleLock}
        disabled={loading}
        className="text-xs px-2.5 py-1 rounded-lg border border-earth-200 text-earth-500 hover:text-earth-700 hover:border-earth-300 transition-colors disabled:opacity-50"
        title={post.is_locked ? 'Unlock' : 'Lock'}
      >
        {post.is_locked ? 'Unlock' : 'Lock'}
      </button>
      <button
        onClick={deletePost}
        disabled={loading}
        className="text-xs px-2.5 py-1 rounded-lg border border-earth-200 text-earth-500 hover:text-red-600 hover:border-red-300 transition-colors disabled:opacity-50"
        title="Delete"
      >
        Delete
      </button>
    </div>
  );
}
