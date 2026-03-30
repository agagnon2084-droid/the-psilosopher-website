'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Lesson } from '@/lib/types';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function LessonForm({
  lesson,
  courseId,
}: {
  lesson?: Lesson;
  courseId: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(lesson?.title ?? '');
  const [slug, setSlug] = useState(lesson?.slug ?? '');
  const [description, setDescription] = useState(lesson?.description ?? '');
  const [content, setContent] = useState(lesson?.content ?? '');
  const [youtubeUrl, setYoutubeUrl] = useState(lesson?.youtube_url ?? '');
  const [durationSeconds, setDurationSeconds] = useState(lesson?.duration_seconds ?? 0);
  const [sortOrder, setSortOrder] = useState(lesson?.sort_order ?? 0);
  const [isPublished, setIsPublished] = useState(lesson?.is_published ?? false);
  const [isFreePreview, setIsFreePreview] = useState(lesson?.is_free_preview ?? false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const body = {
      course_id: courseId,
      title,
      slug,
      description: description || null,
      content: content || null,
      youtube_url: youtubeUrl || null,
      duration_seconds: durationSeconds || null,
      sort_order: sortOrder,
      is_published: isPublished,
      is_free_preview: isFreePreview,
    };

    const url = lesson ? `/api/admin/lessons/${lesson.id}` : '/api/admin/lessons';
    const method = lesson ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.back();
      router.refresh();
    } else {
      alert('Error saving lesson');
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
            if (!lesson) setSlug(slugify(e.target.value));
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
        <label className="block text-sm font-medium text-earth-700 mb-1">Description (short summary)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Content (full lesson text)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all font-mono text-sm"
          placeholder="Write your lesson content here..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">YouTube URL (optional)</label>
        <input
          type="url"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all"
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">Duration (seconds)</label>
          <input
            type="number"
            value={durationSeconds}
            onChange={(e) => setDurationSeconds(Number(e.target.value))}
            className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">Sort Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
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
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="freePreview"
            checked={isFreePreview}
            onChange={(e) => setIsFreePreview(e.target.checked)}
            className="w-4 h-4 rounded border-earth-300 text-mystic-600 focus:ring-mystic-200"
          />
          <label htmlFor="freePreview" className="text-sm font-medium text-earth-700">Free Preview</label>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-mystic-600 text-white rounded-lg font-medium hover:bg-mystic-700 transition-colors disabled:opacity-50 text-sm"
        >
          {saving ? 'Saving...' : lesson ? 'Update Lesson' : 'Create Lesson'}
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
