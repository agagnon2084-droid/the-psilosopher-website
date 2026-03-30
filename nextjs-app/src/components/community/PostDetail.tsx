'use client';

import type { CommunityPostWithMeta } from '@/lib/types';
import { timeAgo } from '@/lib/community';
import UserAvatar from './UserAvatar';
import CategoryBadge from './CategoryBadge';
import LikeButton from './LikeButton';
import AdminPostActions from './AdminPostActions';

export default function PostDetail({
  post,
  isAdmin,
  currentUserId,
}: {
  post: CommunityPostWithMeta;
  isAdmin: boolean;
  currentUserId: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-earth-100 p-6 md:p-8">
      <div className="flex items-start gap-4 mb-6">
        <UserAvatar displayName={post.profile?.display_name ?? null} size="lg" />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-earth-900">
              {post.profile?.display_name ?? 'Anonymous'}
            </span>
            <span className="text-sm text-earth-400">{timeAgo(post.created_at)}</span>
            {post.is_pinned && (
              <span className="text-xs font-medium text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full">
                Pinned
              </span>
            )}
            {post.is_locked && (
              <span className="text-xs text-earth-500 bg-earth-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Locked
              </span>
            )}
          </div>
          <CategoryBadge category={post.category} />
        </div>
        {isAdmin && <AdminPostActions post={post} />}
      </div>

      <h1 className="font-serif text-2xl md:text-3xl font-bold text-earth-900 mb-6">
        {post.title}
      </h1>

      <div className="text-earth-700 leading-relaxed whitespace-pre-wrap mb-6">
        {post.body}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-earth-100">
        <LikeButton
          postId={post.id}
          initialLiked={post.user_has_liked}
          initialCount={post.like_count}
        />
        <span className="flex items-center gap-1.5 text-sm text-earth-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {post.comment_count} {post.comment_count === 1 ? 'comment' : 'comments'}
        </span>
      </div>
    </div>
  );
}
