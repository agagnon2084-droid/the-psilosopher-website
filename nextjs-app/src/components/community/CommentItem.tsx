'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CommunityCommentWithMeta } from '@/lib/types';
import { timeAgo } from '@/lib/community';
import UserAvatar from './UserAvatar';
import LikeButton from './LikeButton';

export default function CommentItem({
  comment,
  postId,
  currentUserId,
  isAdmin,
}: {
  comment: CommunityCommentWithMeta;
  postId: string;
  currentUserId: string;
  isAdmin: boolean;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const canDelete = comment.user_id === currentUserId || isAdmin;

  async function handleDelete() {
    if (!confirm('Delete this comment?')) return;
    setDeleting(true);

    const url = comment.user_id === currentUserId
      ? `/api/community/posts/${postId}/comments/${comment.id}`
      : `/api/admin/community/comments/${comment.id}`;

    await fetch(url, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <div className="flex gap-3 py-4">
      <UserAvatar displayName={comment.profile?.display_name ?? null} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-earth-800">
            {comment.profile?.display_name ?? 'Anonymous'}
          </span>
          <span className="text-xs text-earth-400">{timeAgo(comment.created_at)}</span>
        </div>
        <p className="text-sm text-earth-700 leading-relaxed whitespace-pre-wrap">
          {comment.body}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <LikeButton
            commentId={comment.id}
            initialLiked={comment.user_has_liked}
            initialCount={comment.like_count}
          />
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs text-earth-400 hover:text-red-500 transition-colors disabled:opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
