import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { canAccessTier } from '@/lib/access';
import type { Lesson, MembershipTier } from '@/lib/types';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase
    .from('courses')
    .select('title, description')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  return {
    title: course ? `${course.title} | The Psilosopher` : 'Course | The Psilosopher',
    description: course?.description ?? undefined,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from('courses')
    .select('*, membership_tiers(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!course) notFound();

  const tier = course.membership_tiers as MembershipTier | null;

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', course.id)
    .eq('is_published', true)
    .order('sort_order');

  const { data: { user } } = await supabase.auth.getUser();

  let hasAccess = false;
  let completedSet = new Set<string>();

  if (user) {
    hasAccess = await canAccessTier(user.id, course.tier_id);

    const { data: progress } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .not('completed_at', 'is', null);

    (progress ?? []).forEach((p: { lesson_id: string }) => completedSet.add(p.lesson_id));
  }

  const totalLessons = (lessons ?? []).length;
  const completedCount = (lessons ?? []).filter((l: Lesson) => completedSet.has(l.id)).length;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[35vh] flex items-end overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-mystic-900 to-forest-900" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
          {tier && tier.slug !== 'free' && (
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-gold-300 text-xs rounded-full font-medium mb-4">
              {tier.name} Tier
            </span>
          )}
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">
            {course.title}
          </h1>
          <p className="text-earth-300 text-lg max-w-2xl">{course.description}</p>
          {user && hasAccess && totalLessons > 0 && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 max-w-xs h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-400 rounded-full transition-all"
                  style={{ width: `${Math.round((completedCount / totalLessons) * 100)}%` }}
                />
              </div>
              <span className="text-earth-400 text-sm">
                {completedCount}/{totalLessons} lessons
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Lesson List */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {!user && (
            <div className="bg-mystic-50 border border-mystic-100 rounded-2xl p-8 text-center mb-10">
              <p className="text-earth-700 mb-4">Sign in to start learning and track your progress.</p>
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-mystic-600 text-white rounded-xl font-medium hover:bg-mystic-700 transition-colors text-sm"
              >
                Sign In
              </Link>
            </div>
          )}

          {user && !hasAccess && (
            <div className="bg-gold-50 border border-gold-200 rounded-2xl p-8 text-center mb-10">
              <p className="text-earth-700 mb-4">
                This course requires the <span className="font-semibold">{tier?.name}</span> tier or above.
              </p>
              <Link
                href="/pricing"
                className="inline-block px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-earth-900 rounded-xl font-medium hover:from-gold-600 hover:to-gold-500 transition-all text-sm"
              >
                Upgrade Membership
              </Link>
            </div>
          )}

          <div className="space-y-3">
            {(lessons ?? []).map((lesson: Lesson, i: number) => {
              const isCompleted = completedSet.has(lesson.id);
              const canView = hasAccess || lesson.is_free_preview;

              return (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-4 p-5 rounded-xl border transition-all ${
                    canView
                      ? 'bg-white border-earth-100 hover:border-mystic-200 hover:shadow-sm'
                      : 'bg-earth-50 border-earth-100 opacity-60'
                  }`}
                >
                  {/* Number / check */}
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium ${
                    isCompleted
                      ? 'bg-forest-100 text-forest-600'
                      : 'bg-earth-100 text-earth-500'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    {canView ? (
                      <Link href={`/courses/${slug}/${lesson.slug}`} className="font-medium text-earth-900 hover:text-mystic-700 transition-colors">
                        {lesson.title}
                      </Link>
                    ) : (
                      <span className="font-medium text-earth-500">{lesson.title}</span>
                    )}
                    {lesson.description && (
                      <p className="text-earth-500 text-sm mt-0.5 truncate">{lesson.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {lesson.is_free_preview && !hasAccess && (
                      <span className="text-xs px-2 py-0.5 bg-forest-100 text-forest-700 rounded-full">Free Preview</span>
                    )}
                    {lesson.duration_seconds && (
                      <span className="text-xs text-earth-400">{Math.ceil(lesson.duration_seconds / 60)} min</span>
                    )}
                    {!canView && (
                      <svg className="w-4 h-4 text-earth-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
