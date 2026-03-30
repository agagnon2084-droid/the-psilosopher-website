'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function MarkCompleteButton({
  lessonId,
  userId,
  isCompleted,
}: {
  lessonId: string;
  userId: string;
  isCompleted: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    const supabase = createClient();

    if (isCompleted) {
      await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', userId)
        .eq('lesson_id', lessonId);
    } else {
      await supabase.from('user_progress').upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          completed_at: new Date().toISOString(),
          last_position_seconds: 0,
        },
        { onConflict: 'user_id,lesson_id' }
      );
    }

    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
        isCompleted
          ? 'bg-forest-100 text-forest-700 hover:bg-forest-200'
          : 'bg-mystic-600 text-white hover:bg-mystic-700'
      } disabled:opacity-50`}
    >
      {isCompleted ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Completed
        </>
      ) : loading ? (
        'Saving...'
      ) : (
        'Mark as Complete'
      )}
    </button>
  );
}
