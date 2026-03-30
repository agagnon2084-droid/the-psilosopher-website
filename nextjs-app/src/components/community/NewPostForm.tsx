'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { COMMUNITY_CATEGORIES } from '@/lib/community';

export default function NewPostForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') ?? 'general');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const lessonId = searchParams.get('lessonId');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          category,
          lesson_id: lessonId || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setSubmitting(false);
        return;
      }

      router.push(`/community/${data.id}`);
    } catch {
      setError('Failed to create post');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-earth-700 mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 border border-earth-200 rounded-xl text-earth-800 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-mystic-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-earth-700 mb-2">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 border border-earth-200 rounded-xl text-earth-800 bg-white focus:outline-none focus:ring-2 focus:ring-mystic-500 focus:border-transparent"
        >
          {COMMUNITY_CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-earth-700 mb-2">
          Your Post
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your thoughts, questions, or experiences..."
          rows={8}
          className="w-full px-4 py-3 border border-earth-200 rounded-xl text-earth-800 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-mystic-500 focus:border-transparent resize-none"
          required
        />
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-earth-500 hover:text-earth-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!title.trim() || !body.trim() || submitting}
          className="px-6 py-2.5 bg-mystic-600 text-white rounded-xl text-sm font-medium hover:bg-mystic-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Posting...' : 'Publish Post'}
        </button>
      </div>
    </form>
  );
}
