import Link from 'next/link';
import type { Lesson } from '@/lib/types';

interface LessonWithProgress extends Lesson {
  isCompleted: boolean;
}

export default function LessonSidebar({
  lessons,
  courseSlug,
  currentLessonSlug,
}: {
  lessons: LessonWithProgress[];
  courseSlug: string;
  currentLessonSlug: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-earth-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-earth-100 bg-earth-50">
        <h3 className="font-serif font-semibold text-earth-900">Lessons</h3>
      </div>
      <nav className="divide-y divide-earth-50">
        {lessons.map((lesson, i) => {
          const isCurrent = lesson.slug === currentLessonSlug;
          return (
            <Link
              key={lesson.id}
              href={`/courses/${courseSlug}/${lesson.slug}`}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                isCurrent
                  ? 'bg-mystic-50 text-mystic-700 font-medium'
                  : 'hover:bg-earth-50 text-earth-700'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                lesson.isCompleted
                  ? 'bg-forest-100 text-forest-600'
                  : isCurrent
                    ? 'bg-mystic-100 text-mystic-600'
                    : 'bg-earth-100 text-earth-500'
              }`}>
                {lesson.isCompleted ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className="truncate">{lesson.title}</span>
              {lesson.duration_seconds ? (
                <span className="ml-auto text-xs text-earth-400 flex-shrink-0">
                  {Math.ceil(lesson.duration_seconds / 60)}m
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
