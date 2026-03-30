'use client';

import Link from 'next/link';
import type { CommunityPostWithMeta } from '@/lib/types';
import { timeAgo } from '@/lib/community';
import UserAvatar from './UserAvatar';
import CategoryBadge from './CategoryBadge';
import LikeButton from './LikeButton';

export default function PostCard({ post }: { post: CommunityPostWithMeta }) {
  return (
    <div className="bg-white rounded-xl border border-earth-100 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-4">
        <UserAvatar displayName={post.profile?.display_name ?? null} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-medium text-earth-800">
              {post.profile?.display_name ?? 'Anonymous'}
            </span>
            <span className="text-xs text-earth-400">{timeAgo(post.created_at)}</span>
            {post.is_pinned && (
              <span className="text-xs font-medium text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full">
                Pinned
              </span>
            )}
            {post.is_locked && (
              <span className="text-xs text-earth-400">
                <svg className="w-3.5 h-3.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            )}
          </div>

          <Link
            href={`/community/${post.id}`}
            className="block font-serif text-lg font-semibold text-earth-900 hover:text-mystic-600 transition-colors mb-2 leading-snug"
          >
            {post.title}
          </Link>

          <p className="text-sm text-earth-500 line-clamp-2 mb-3">
            {post.body}
          </p>

          <div className="flex items-center gap-4">
            <CategoryBadge category={post.category} />
            <LikeButton
              postId={post.id}
              initialLiked={post.user_has_liked}
              initialCount={post.like_count}
            />
            <Link
              href={`/community/${post.id}`}
              className="flex items-center gap-1.5 text-sm text-earth-400 hover:text-earth-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.comment_count}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
