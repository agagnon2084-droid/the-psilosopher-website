export const COMMUNITY_CATEGORIES = [
  { slug: 'general', label: 'General Discussion' },
  { slug: 'integration', label: 'Integration' },
  { slug: 'microdosing', label: 'Microdosing' },
  { slug: 'science', label: 'Science & Research' },
  { slug: 'experiences', label: 'Experiences' },
  { slug: 'course-discussion', label: 'Course Discussion' },
] as const;

export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number]['slug'];

export function getCategoryLabel(slug: string): string {
  const cat = COMMUNITY_CATEGORIES.find((c) => c.slug === slug);
  return cat?.label ?? slug;
}

export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}
