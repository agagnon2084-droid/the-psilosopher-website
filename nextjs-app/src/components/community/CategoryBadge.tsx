import { getCategoryLabel } from '@/lib/community';

const colorMap: Record<string, string> = {
  general: 'bg-earth-100 text-earth-700',
  integration: 'bg-forest-50 text-forest-700',
  microdosing: 'bg-mystic-50 text-mystic-700',
  science: 'bg-blue-50 text-blue-700',
  experiences: 'bg-gold-50 text-gold-700',
  'course-discussion': 'bg-mystic-50 text-mystic-600',
};

export default function CategoryBadge({ category }: { category: string | null }) {
  if (!category) return null;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        colorMap[category] ?? 'bg-earth-100 text-earth-600'
      }`}
    >
      {getCategoryLabel(category)}
    </span>
  );
}
