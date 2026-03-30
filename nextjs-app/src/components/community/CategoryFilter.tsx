'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { COMMUNITY_CATEGORIES } from '@/lib/community';

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category');

  function setCategory(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    router.push(`/community?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => setCategory(null)}
        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          !active
            ? 'bg-mystic-600 text-white'
            : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
        }`}
      >
        All
      </button>
      {COMMUNITY_CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => setCategory(cat.slug)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === cat.slug
              ? 'bg-mystic-600 text-white'
              : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
