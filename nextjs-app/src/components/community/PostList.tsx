'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { CommunityPostWithMeta } from '@/lib/types';
import PostCard from './PostCard';

export default function PostList({ initialPosts, initialCursor }: {
  initialPosts: CommunityPostWithMeta[];
  initialCursor: string | null;
}) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const lesson = searchParams.get('lesson');

  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(initialCursor);
  const [sort, setSort] = useState<'recent' | 'popular'>('recent');
  const [loading, setLoading] = useState(false);

  // Re-fetch when filters change
  useEffect(() => {
    async function refetch() {
      setLoading(true);
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (lesson) params.set('lesson', lesson);
      params.set('sort', sort);

      const res = await fetch(`/api/community/posts?${params.toString()}`);
      const data = await res.json();
      setPosts(data.posts ?? []);
      setCursor(data.nextCursor);
      setLoading(false);
    }
    refetch();
  }, [category, lesson, sort]);

  const loadMore = useCallback(async () => {
    if (!cursor || loading) return;
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (lesson) params.set('lesson', lesson);
    params.set('sort', sort);
    params.set('cursor', cursor);

    const res = await fetch(`/api/community/posts?${params.toString()}`);
    const data = await res.json();
    setPosts((prev) => [...prev, ...(data.posts ?? [])]);
    setCursor(data.nextCursor);
    setLoading(false);
  }, [cursor, loading, category, lesson, sort]);

  return (
    <div>
      {/* Sort toggle */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setSort('recent')}
          className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
            sort === 'recent' ? 'bg-earth-800 text-white' : 'text-earth-500 hover:text-earth-700'
          }`}
        >
          Recent
        </button>
        <button
          onClick={() => setSort('popular')}
          className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
            sort === 'popular' ? 'bg-earth-800 text-white' : 'text-earth-500 hover:text-earth-700'
          }`}
        >
          Popular
        </button>
      </div>

      {/* Posts */}
      {posts.length === 0 && !loading ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🌿</div>
          <h3 className="font-serif text-xl font-semibold text-earth-800 mb-2">No posts yet</h3>
          <p className="text-earth-500">Be the first to start a discussion!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Load more */}
      {cursor && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2.5 bg-earth-100 text-earth-700 rounded-lg text-sm font-medium hover:bg-earth-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {loading && posts.length === 0 && (
        <div className="text-center py-16 text-earth-400">Loading...</div>
      )}
    </div>
  );
}
