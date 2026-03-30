import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { timeAgo } from '@/lib/community';

export default async function LessonDiscussion({
  lessonId,
  lessonTitle,
}: {
  lessonId: string;
  lessonTitle: string;
}) {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('community_posts')
    .select(`
      id, title, created_at,
      profiles!user_id(display_name),
      community_comments(count)
    `)
    .eq('lesson_id', lessonId)
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <div className="mt-10 mb-6 pt-8 border-t border-earth-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-semibold text-earth-900">Discussion</h3>
        <Link
          href={`/community/new?lessonId=${lessonId}&category=course-discussion`}
          className="text-sm text-mystic-600 hover:text-mystic-700 font-medium transition-colors"
        >
          Start a thread
        </Link>
      </div>

      {(posts ?? []).length > 0 ? (
        <div className="space-y-3">
          {(posts ?? []).map((post: any) => {
            const profile = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles;
            const commentCount = Array.isArray(post.community_comments) ? post.community_comments[0]?.count ?? 0 : 0;
            return (
              <Link
                key={post.id}
                href={`/community/${post.id}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-earth-50 transition-colors group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-earth-800 group-hover:text-mystic-600 transition-colors truncate">
                    {post.title}
                  </p>
                  <p className="text-xs text-earth-400">
                    {profile?.display_name ?? 'Anonymous'} &middot; {timeAgo(post.created_at)}
                  </p>
                </div>
                <span className="text-xs text-earth-400 flex-shrink-0 ml-4">
                  {commentCount} {commentCount === 1 ? 'reply' : 'replies'}
                </span>
              </Link>
            );
          })}
          <Link
            href={`/community?lesson=${lessonId}`}
            className="block text-center text-sm text-earth-500 hover:text-mystic-600 transition-colors pt-2"
          >
            View all discussions for this lesson
          </Link>
        </div>
      ) : (
        <p className="text-sm text-earth-400">
          No discussions yet. Be the first to start one!
        </p>
      )}
    </div>
  );
}
