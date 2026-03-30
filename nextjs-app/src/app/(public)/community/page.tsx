import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getUserTierLevel } from '@/lib/access';
import type { CommunityPostWithMeta } from '@/lib/types';
import CategoryFilter from '@/components/community/CategoryFilter';
import PostList from '@/components/community/PostList';

export const metadata: Metadata = {
  title: 'Community | The Psilosopher',
};

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; lesson?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const tierLevel = await getUserTierLevel(user.id);
  if (tierLevel < 1) redirect('/pricing?reason=community');

  let query = supabase
    .from('community_posts')
    .select(`
      *,
      profiles!user_id(display_name, avatar_url),
      community_comments(count),
      community_likes(count)
    `)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(20);

  if (params.category) query = query.eq('category', params.category);
  if (params.lesson) query = query.eq('lesson_id', params.lesson);

  const { data: posts } = await query;

  // Get user likes
  const postIds = (posts ?? []).map((p: any) => p.id);
  const { data: userLikes } = user && postIds.length > 0
    ? await supabase.from('community_likes').select('post_id').eq('user_id', user.id).in('post_id', postIds)
    : { data: [] };

  const likedPostIds = new Set((userLikes ?? []).map((l: any) => l.post_id));

  const enriched: CommunityPostWithMeta[] = (posts ?? []).map((p: any) => ({
    ...p,
    profile: Array.isArray(p.profiles) ? p.profiles[0] : p.profiles,
    comment_count: Array.isArray(p.community_comments) ? p.community_comments[0]?.count ?? 0 : 0,
    like_count: Array.isArray(p.community_likes) ? p.community_likes[0]?.count ?? 0 : 0,
    user_has_liked: likedPostIds.has(p.id),
    profiles: undefined,
    community_comments: undefined,
    community_likes: undefined,
  }));

  const nextCursor = enriched.length === 20 ? enriched[enriched.length - 1].created_at : null;

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden mb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-gradient-to-br from-earth-900 via-earth-800 to-forest-900 rounded-3xl px-8 py-12 md:py-16 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-mystic-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest-500 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <p className="text-mystic-400 text-sm font-medium uppercase tracking-wider mb-3">
                Community Forum
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Connect, Share, Grow
              </h1>
              <p className="text-earth-300 leading-relaxed mb-6">
                A safe space to discuss integration practices, share experiences,
                and support each other on the path of conscious exploration.
              </p>
              <Link
                href="/community/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-mystic-600 text-white rounded-xl text-sm font-medium hover:bg-mystic-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Start a Discussion
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6">
        <Suspense fallback={null}>
          <CategoryFilter />
        </Suspense>

        <div className="mt-6">
          <PostList initialPosts={enriched} initialCursor={nextCursor} />
        </div>
      </div>
    </div>
  );
}
