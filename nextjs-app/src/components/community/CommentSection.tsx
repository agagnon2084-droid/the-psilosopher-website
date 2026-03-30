'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CommunityCommentWithMeta } from '@/lib/types';
import CommentItem from './CommentItem';

export default function CommentSection({
  comments,
  postId,
  currentUserId,
  isAdmin,
  isLocked,
}: {
  comments: CommunityCommentWithMeta[];
  postId: string;
  currentUserId: string;
  isAdmin: boolean;
  isLocked: boolean;
}) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || submitting) return;
    setSubmitting(true);

    const res = await fetch(`/api/community/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: body.trim() }),
    });

    if (res.ok) {
      setBody('');
      router.refresh();
    }
    setSubmitting(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-earth-100 p-6 md:p-8">
      <h2 className="font-serif text-xl font-semibold text-earth-900 mb-4">
        Comments ({comments.length})
      </h2>

      {comments.length > 0 ? (
        <div className="divide-y divide-earth-100">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              currentUserId={currentUserId}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ) : (
        <p className="text-earth-400 text-sm py-4">No comments yet. Be the first to respond!</p>
      )}

      {isLocked ? (
        <div className="mt-6 p-4 bg-earth-50 rounded-xl text-center">
          <p className="text-sm text-earth-500 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            This thread has been locked by a moderator.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            className="w-full px-4 py-3 border border-earth-200 rounded-xl text-sm text-earth-800 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-mystic-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!body.trim() || submitting}
              className="px-5 py-2 bg-mystic-600 text-white rounded-lg text-sm font-medium hover:bg-mystic-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
