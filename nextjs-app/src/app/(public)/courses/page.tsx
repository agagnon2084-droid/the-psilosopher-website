import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { Course, MembershipTier } from '@/lib/types';
import ParticleEffect from '@/components/ParticleEffect';

export const metadata: Metadata = {
  title: 'Courses | The Psilosopher',
  description: 'Explore our psychedelic education courses on integration, neuroscience, and wellness.',
};

interface CourseWithTier extends Course {
  membership_tiers: MembershipTier | null;
  lesson_count: number;
}

export default async function CoursesPage() {
  const supabase = await createClient();

  // Try to get the logged-in user (optional on this public page)
  const { data: { user } } = await supabase.auth.getUser();

  // Get all published courses with tier info
  const { data: courses } = await supabase
    .from('courses')
    .select('*, membership_tiers(*)')
    .eq('is_published', true)
    .order('sort_order');

  // Get lesson counts per course
  const courseIds = (courses ?? []).map((c: Course) => c.id);
  const { data: lessons } = courseIds.length
    ? await supabase
        .from('lessons')
        .select('course_id')
        .in('course_id', courseIds)
        .eq('is_published', true)
    : { data: [] };

  const lessonCounts: Record<string, number> = {};
  (lessons ?? []).forEach((l: { course_id: string }) => {
    lessonCounts[l.course_id] = (lessonCounts[l.course_id] || 0) + 1;
  });

  // Get user progress if logged in
  let progressMap: Record<string, number> = {};
  if (user) {
    const { data: progress } = await supabase
      .from('user_progress')
      .select('lesson_id, lessons!inner(course_id)')
      .eq('user_id', user.id)
      .not('completed_at', 'is', null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (progress ?? []).forEach((p: any) => {
      const cid = p.lessons?.course_id;
      if (cid) progressMap[cid] = (progressMap[cid] || 0) + 1;
    });
  }

  const coursesWithCounts = (courses ?? []).map((c: CourseWithTier) => ({
    ...c,
    lesson_count: lessonCounts[c.id] || 0,
  }));

  const gradients = [
    'from-mystic-800 via-forest-900 to-earth-900',
    'from-forest-800 via-earth-900 to-mystic-900',
    'from-earth-800 via-mystic-900 to-forest-900',
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-mystic-900 to-forest-900" />
        <ParticleEffect />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm mb-4 animate-[fade-in_1s_ease-out]">
            Learn
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 animate-[fade-in-up_1s_ease-out]">
            Courses
          </h1>
          <p className="text-earth-300 max-w-2xl mx-auto text-lg animate-[fade-in-up_1s_ease-out_0.2s_both]">
            Evidence-based education for your psychedelic journey. From foundational concepts to advanced integration practices.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {coursesWithCounts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-earth-500 text-lg">Courses are coming soon. Stay tuned.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {coursesWithCounts.map((course: CourseWithTier & { lesson_count: number }, i: number) => {
                const tier = course.membership_tiers;
                const completed = progressMap[course.id] || 0;
                const total = course.lesson_count;
                const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

                return (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className="group bg-white rounded-2xl border border-earth-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                  >
                    {/* Thumbnail / gradient header */}
                    <div className={`h-48 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-end p-6`}>
                      {tier && tier.slug !== 'free' && (
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs rounded-full font-medium">
                          {tier.name}
                        </span>
                      )}
                    </div>

                    <div className="p-6">
                      <h2 className="font-serif text-xl font-bold text-earth-900 group-hover:text-mystic-700 transition-colors mb-2">
                        {course.title}
                      </h2>
                      <p className="text-earth-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                      <div className="flex items-center justify-between text-xs text-earth-500">
                        <span>{total} lesson{total !== 1 ? 's' : ''}</span>
                        {user && completed > 0 && (
                          <span className="text-forest-600 font-medium">{progress}% complete</span>
                        )}
                      </div>

                      {user && completed > 0 && (
                        <div className="mt-3 h-1.5 bg-earth-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-forest-500 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
