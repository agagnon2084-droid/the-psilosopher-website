'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Workbook, MembershipTier } from '@/lib/types';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function WorkbookForm({
  workbook,
  tiers,
}: {
  workbook?: Workbook;
  tiers: MembershipTier[];
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(workbook?.title ?? '');
  const [slug, setSlug] = useState(workbook?.slug ?? '');
  const [description, setDescription] = useState(workbook?.description ?? '');
  const [fileUrl, setFileUrl] = useState(workbook?.file_url ?? '');
  const [thumbnailUrl, setThumbnailUrl] = useState(workbook?.thumbnail_url ?? '');
  const [tierId, setTierId] = useState(workbook?.tier_id ?? '');
  const [isPublished, setIsPublished] = useState(workbook?.is_published ?? false);
  const [sortOrder, setSortOrder] = useState(workbook?.sort_order ?? 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const body = {
      title,
      slug,
      description: description || null,
      file_url: fileUrl,
      thumbnail_url: thumbnailUrl || null,
      tier_id: tierId || null,
      is_published: isPublished,
      sort_order: sortOrder,
    };

    const url = workbook ? `/api/admin/workbooks/${workbook.id}` : '/api/admin/workbooks';
    const method = workbook ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push('/admin/workbooks');
      router.refresh();
    } else {
      alert('Error saving workbook');
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Title</label>
        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); if (!workbook) setSlug(slugify(e.target.value)); }} required className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all" />
      </div>
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Slug</label>
        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all font-mono text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all" />
      </div>
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">File URL</label>
        <input type="url" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} required className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all" />
      </div>
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Thumbnail URL</label>
        <input type="url" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all" />
      </div>
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Required Tier</label>
        <select value={tierId} onChange={(e) => setTierId(e.target.value)} className="w-full px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all">
          <option value="">Free (no tier required)</option>
          {tiers.map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Sort Order</label>
        <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="w-24 px-4 py-2.5 border border-earth-200 rounded-lg focus:ring-2 focus:ring-mystic-200 focus:border-mystic-400 outline-none transition-all" />
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" id="wb-published" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4 rounded border-earth-300 text-mystic-600 focus:ring-mystic-200" />
        <label htmlFor="wb-published" className="text-sm font-medium text-earth-700">Published</label>
      </div>
      <div className="flex items-center gap-4 pt-4">
        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-mystic-600 text-white rounded-lg font-medium hover:bg-mystic-700 transition-colors disabled:opacity-50 text-sm">
          {saving ? 'Saving...' : workbook ? 'Update Workbook' : 'Create Workbook'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 border border-earth-200 text-earth-600 rounded-lg font-medium hover:bg-earth-50 transition-colors text-sm">Cancel</button>
      </div>
    </form>
  );
}
