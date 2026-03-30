import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { canAccessTier } from '@/lib/access';
import type { Lesson } from '@/lib/types';
import VideoPlayer from '@/components/VideoPlayer';
import MarkCompleteButton from '@/components/MarkCompleteButton';
import LessonSidebar from '@/components/LessonSidebar';
import LessonSlides from '@/components/LessonSlides';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from('courses')
    .select('id, title')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!course) return { title: 'Lesson | The Psilosopher' };

  const { data: lesson } = await supabase
    .from('lessons')
    .select('title')
    .eq('course_id', course.id)
    .eq('slug', lessonSlug)
    .eq('is_published', true)
    .single();

  return {
    title: lesson ? `${lesson.title} | ${course.title} | The Psilosopher` : 'Lesson | The Psilosopher',
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Get course
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!course) notFound();

  // Get all published lessons for this course
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', course.id)
    .eq('is_published', true)
    .order('sort_order');

  const lessons = (allLessons ?? []) as Lesson[];
  const currentLesson = lessons.find((l) => l.slug === lessonSlug);
  if (!currentLesson) notFound();

  // Check access (allow free previews)
  const hasAccess = currentLesson.is_free_preview || (await canAccessTier(user.id, course.tier_id));
  if (!hasAccess) redirect(`/courses/${slug}`);

  // Get user progress for all lessons
  const { data: progressData } = await supabase
    .from('user_progress')
    .select('lesson_id, completed_at')
    .eq('user_id', user.id);

  const completedSet = new Set(
    (progressData ?? []).filter((p: { completed_at: string | null }) => p.completed_at).map((p: { lesson_id: string }) => p.lesson_id)
  );

  const lessonsWithProgress = lessons.map((l) => ({
    ...l,
    isCompleted: completedSet.has(l.id),
  }));

  const currentIndex = lessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const isCompleted = completedSet.has(currentLesson.id);

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-2 text-sm text-earth-500">
          <Link href="/courses" className="hover:text-mystic-600 transition-colors">Courses</Link>
          <span>/</span>
          <Link href={`/courses/${slug}`} className="hover:text-mystic-600 transition-colors">{course.title}</Link>
          <span>/</span>
          <span className="text-earth-700">{currentLesson.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <VideoPlayer playbackId={currentLesson.mux_playback_id} />

          <h1 className="font-serif text-3xl font-bold text-earth-900 mb-6">{currentLesson.title}</h1>

          {currentLesson.content ? (
            <LessonSlides content={currentLesson.content} />
          ) : currentLesson.description ? (
            <p className="text-earth-600 mb-10 leading-relaxed">{currentLesson.description}</p>
          ) : null}

          {/* Actions */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-earth-100">
            <MarkCompleteButton
              lessonId={currentLesson.id}
              userId={user.id}
              isCompleted={isCompleted}
            />

            <div className="flex items-center gap-3">
              {prevLesson && (
                <Link
                  href={`/courses/${slug}/${prevLesson.slug}`}
                  className="px-4 py-2 text-sm text-earth-600 hover:text-earth-900 border border-earth-200 rounded-lg hover:bg-earth-50 transition-colors"
                >
                  ← Previous
                </Link>
              )}
              {nextLesson && (
                <Link
                  href={`/courses/${slug}/${nextLesson.slug}`}
                  className="px-4 py-2 text-sm bg-mystic-600 text-white rounded-lg hover:bg-mystic-700 transition-colors"
                >
                  Next →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-28">
            <LessonSidebar
              lessons={lessonsWithProgress}
              courseSlug={slug}
              currentLessonSlug={lessonSlug}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
