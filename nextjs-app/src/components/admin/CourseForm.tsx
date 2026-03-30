'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Course, MembershipTier } from '@/lib/types';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function CourseForm({
  course,
  tiers,
}: {
  course?: Course;
  tiers: MembershipTier[];
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(course?.title ?? '');
  const [slug, setSlug] = useState(course?.slug ?? '');
  const [description, setDescription] = useState(course?.description ?? '');
  const [thumbnailUrl, setThumbnailUrl] = useState(course?.thumbnail_url ?? '');
  const [tierId, setTierId] = useState(course?.tier_id ?? '');
  const [isPublished, setIsPublished] = useState(course?.is_published ?? false);
  const [sortOrder, setSortOrder] = useState(course?.sort_order ?? 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const body = {
      title,
      slug,
      description: description || null,
      thumbnail_url: thumbnailUrl || null,
      tier_id: tierId || null,
      is_published: isPublished,
      sort_order: sortOrder,
    };

    const url = course ? `/api/admin/courses/${course.id}` : '/api/admin/courses';
    const method = course ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      router.push('/admin/courses');
      router.refresh();
    } else {
      alert('Error saving course');
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!course) setSlug(slugify(e.target.value));
          }}
          required
          className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Thumbnail URL</label>
        <input
          type="url"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Required Tier</label>
        <select
          value={tierId}
          onChange={(e) => setTierId(e.target.value)}
          className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all"
        >
          <option value="">Free (no tier required)</option>
          {tiers.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Sort Order</label>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          className="w-24 px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="published"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="w-4 h-4 rounded border-earth-300 text-mystic-600 focus:ring-mystic-200"
        />
        <label htmlFor="published" className="text-sm font-medium text-earth-700">Published</label>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-mystic-600 text-white rounded-lg font-medium hover:bg-mystic-700 transition-colors disabled:opacity-50 text-sm"
        >
          {saving ? 'Saving...' : course ? 'Update Course' : 'Create Course'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-earth-200 text-earth-600 rounded-lg font-medium hover:bg-earth-50 transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
