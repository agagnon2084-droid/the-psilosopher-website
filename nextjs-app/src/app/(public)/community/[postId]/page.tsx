import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getUserTierLevel } from '@/lib/access';
import { isAdmin } from '@/lib/admin';
import type { CommunityPostWithMeta, CommunityCommentWithMeta } from '@/lib/types';
import PostDetail from '@/components/community/PostDetail';
import CommentSection from '@/components/community/CommentSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('community_posts')
    .select('title')
    .eq('id', postId)
    .single();

  return {
    title: post ? `${post.title} | Community | The Psilosopher` : 'Community | The Psilosopher',
  };
}

export default async function CommunityPostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const tierLevel = await getUserTierLevel(user.id);
  if (tierLevel < 1) redirect('/pricing?reason=community');

  // Fetch post
  const { data: rawPost } = await supabase
    .from('community_posts')
    .select(`
      *,
      profiles!user_id(display_name, avatar_url),
      community_comments(count),
      community_likes(count)
    `)
    .eq('id', postId)
    .single();

  if (!rawPost) notFound();

  const { data: userLike } = await supabase
    .from('community_likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('post_id', postId)
    .maybeSingle();

  const post: CommunityPostWithMeta = {
    ...rawPost,
    profile: Array.isArray(rawPost.profiles) ? rawPost.profiles[0] : rawPost.profiles,
    comment_count: Array.isArray(rawPost.community_comments) ? rawPost.community_comments[0]?.count ?? 0 : 0,
    like_count: Array.isArray(rawPost.community_likes) ? rawPost.community_likes[0]?.count ?? 0 : 0,
    user_has_liked: !!userLike,
  } as any;

  // Fetch comments
  const { data: rawComments } = await supabase
    .from('community_comments')
    .select(`
      *,
      profiles!user_id(display_name, avatar_url),
      community_likes(count)
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  const commentIds = (rawComments ?? []).map((c: any) => c.id);
  const { data: commentLikes } = commentIds.length > 0
    ? await supabase.from('community_likes').select('comment_id').eq('user_id', user.id).in('comment_id', commentIds)
    : { data: [] };

  const likedCommentIds = new Set((commentLikes ?? []).map((l: any) => l.comment_id));

  const comments: CommunityCommentWithMeta[] = (rawComments ?? []).map((c: any) => ({
    ...c,
    profile: Array.isArray(c.profiles) ? c.profiles[0] : c.profiles,
    like_count: Array.isArray(c.community_likes) ? c.community_likes[0]?.count ?? 0 : 0,
    user_has_liked: likedCommentIds.has(c.id),
  }));

  // Check if lesson-linked
  let lessonBreadcrumb: { courseTitle: string; courseSlug: string; lessonTitle: string } | null = null;
  if (post.lesson_id) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('title, courses!course_id(title, slug)')
      .eq('id', post.lesson_id)
      .single();
    if (lesson) {
      const course = Array.isArray((lesson as any).courses) ? (lesson as any).courses[0] : (lesson as any).courses;
      if (course) {
        lessonBreadcrumb = {
          courseTitle: course.title,
          courseSlug: course.slug,
          lessonTitle: lesson.title,
        };
      }
    }
  }

  const userIsAdmin = isAdmin(user.email);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-earth-500 mb-6">
          <Link href="/community" className="hover:text-mystic-600 transition-colors">
            Community
          </Link>
          {lessonBreadcrumb && (
            <>
              <span>/</span>
              <Link
                href={`/courses/${lessonBreadcrumb.courseSlug}`}
                className="hover:text-mystic-600 transition-colors"
              >
                {lessonBreadcrumb.courseTitle}
              </Link>
              <span>/</span>
              <span className="text-earth-400">{lessonBreadcrumb.lessonTitle}</span>
            </>
          )}
        </div>

        <div className="space-y-6">
          <PostDetail
            post={post}
            isAdmin={userIsAdmin}
            currentUserId={user.id}
          />

          <CommentSection
            comments={comments}
            postId={postId}
            currentUserId={user.id}
            isAdmin={userIsAdmin}
            isLocked={post.is_locked}
          />
        </div>

        <div className="mt-8">
          <Link
            href="/community"
            className="text-sm text-earth-500 hover:text-mystic-600 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Community
          </Link>
        </div>
      </div>
    </div>
  );
}
