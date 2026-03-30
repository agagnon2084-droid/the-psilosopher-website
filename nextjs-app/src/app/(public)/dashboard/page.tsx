import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getUserTierLevel } from '@/lib/access';
import ManageSubscriptionButton from '@/components/ManageSubscriptionButton';
import type { Course, Lesson, MembershipTier, Workbook } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Dashboard | The Psilosopher',
  description: 'Manage your membership and access your content.',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*, membership_tiers(*)')
    .eq('user_id', user!.id)
    .in('status', ['active', 'trialing', 'past_due'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const tier = subscription?.membership_tiers as MembershipTier | null;
  const userTierLevel = await getUserTierLevel(user!.id);

  // Get all published courses with tier info
  const { data: courses } = await supabase
    .from('courses')
    .select('*, membership_tiers(sort_order, name, slug)')
    .eq('is_published', true)
    .order('sort_order');

  // Get lesson counts per course
  const courseIds = (courses ?? []).map((c: Course) => c.id);
  const { data: allLessons } = courseIds.length
    ? await supabase.from('lessons').select('id, course_id').in('course_id', courseIds).eq('is_published', true)
    : { data: [] };

  const lessonCounts: Record<string, number> = {};
  (allLessons ?? []).forEach((l: { course_id: string }) => {
    lessonCounts[l.course_id] = (lessonCounts[l.course_id] || 0) + 1;
  });

  // Get user progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('lesson_id, lessons!inner(course_id, slug, sort_order)')
    .eq('user_id', user!.id)
    .not('completed_at', 'is', null);

  const completedPerCourse: Record<string, number> = {};
  const completedLessonIds = new Set<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (progress ?? []).forEach((p: any) => {
    const cid = p.lessons?.course_id;
    if (cid) completedPerCourse[cid] = (completedPerCourse[cid] || 0) + 1;
    completedLessonIds.add(p.lesson_id);
  });

  // Find the first incomplete lesson per course for "Continue" link
  function getFirstIncompleteLessonSlug(courseId: string): string | null {
    const courseLessons = (allLessons ?? [])
      .filter((l: { course_id: string }) => l.course_id === courseId);
    // We don't have slug in the minimal query, so just return null
    // The user can click through to the course detail page
    return null;
  }

  // Get published workbooks with tier info
  const { data: workbooks } = await supabase
    .from('workbooks')
    .select('*, membership_tiers(sort_order, name, slug)')
    .eq('is_published', true)
    .order('sort_order');

  const statusColors: Record<string, string> = {
    active: 'bg-forest-100 text-forest-700',
    trialing: 'bg-mystic-100 text-mystic-700',
    past_due: 'bg-gold-100 text-gold-700',
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-forest-900 to-mystic-900" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm mb-4">Dashboard</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Your Membership</h1>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Subscription Card */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-earth-100">
            {subscription && tier ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-earth-900">{tier.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[subscription.status] || 'bg-earth-100 text-earth-600'}`}>
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1).replace('_', ' ')}
                  </span>
                </div>
                <p className="text-earth-600 text-sm">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-earth-700">
                      <svg className="w-4 h-4 text-forest-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {subscription.current_period_end && (
                  <p className="text-earth-400 text-sm">
                    {subscription.cancel_at_period_end
                      ? `Your subscription ends on ${new Date(subscription.current_period_end).toLocaleDateString()}`
                      : `Renews on ${new Date(subscription.current_period_end).toLocaleDateString()}`}
                  </p>
                )}
                {subscription.cancel_at_period_end && (
                  <div className="bg-gold-50 border border-gold-200 rounded-xl p-4">
                    <p className="text-gold-800 text-sm">Your subscription has been canceled and will end at the current period.</p>
                  </div>
                )}
                <ManageSubscriptionButton />
              </div>
            ) : (
              <div className="text-center py-8">
                <h2 className="font-serif text-2xl font-bold text-earth-900 mb-3">Free Tier</h2>
                <p className="text-earth-600 mb-8">You have access to blog posts and the newsletter. Upgrade to unlock courses, workbooks, and the community.</p>
                <Link
                  href="/pricing"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 text-white rounded-xl font-medium hover:from-mystic-700 hover:to-mystic-600 transition-all shadow-lg shadow-mystic-500/20 text-sm"
                >
                  Upgrade Membership
                </Link>
              </div>
            )}
          </div>

          {/* My Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-earth-900">My Courses</h2>
              <Link href="/courses" className="text-sm text-mystic-600 hover:text-mystic-700 font-medium transition-colors">
                Browse all →
              </Link>
            </div>

            {(courses ?? []).length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-earth-100 text-center">
                <p className="text-earth-500">No courses available yet. Check back soon.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {(courses ?? []).map((course: Course & { membership_tiers: { sort_order: number; name: string; slug: string } | null }) => {
                  const courseTierLevel = course.membership_tiers?.sort_order ?? 0;
                  const canAccess = !course.tier_id || userTierLevel >= courseTierLevel;
                  const total = lessonCounts[course.id] || 0;
                  const completed = completedPerCourse[course.id] || 0;
                  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

                  return (
                    <div
                      key={course.id}
                      className={`bg-white rounded-2xl p-6 border border-earth-100 shadow-sm ${canAccess ? '' : 'opacity-70'}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-serif text-lg font-bold text-earth-900">{course.title}</h3>
                        {!canAccess && (
                          <svg className="w-5 h-5 text-earth-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-earth-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                      {canAccess ? (
                        <>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex-1 h-1.5 bg-earth-100 rounded-full overflow-hidden">
                              <div className="h-full bg-forest-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-earth-500">{completed}/{total}</span>
                          </div>
                          <Link
                            href={`/courses/${course.slug}`}
                            className="inline-block text-sm text-mystic-600 hover:text-mystic-700 font-medium transition-colors"
                          >
                            {completed > 0 ? 'Continue →' : 'Start course →'}
                          </Link>
                        </>
                      ) : (
                        <Link
                          href="/pricing"
                          className="inline-block text-sm text-gold-600 hover:text-gold-700 font-medium transition-colors"
                        >
                          Upgrade to {course.membership_tiers?.name} →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* My Workbooks */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-earth-900 mb-6">Workbooks & Resources</h2>

            {(workbooks ?? []).length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-earth-100 text-center">
                <p className="text-earth-500">No workbooks available yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(workbooks ?? []).map((wb: Workbook & { membership_tiers: { sort_order: number; name: string; slug: string } | null }) => {
                  const wbTierLevel = wb.membership_tiers?.sort_order ?? 0;
                  const canAccess = !wb.tier_id || userTierLevel >= wbTierLevel;

                  return (
                    <div key={wb.id} className={`bg-white rounded-2xl p-6 border border-earth-100 shadow-sm ${canAccess ? '' : 'opacity-70'}`}>
                      <h3 className="font-serif text-lg font-bold text-earth-900 mb-2">{wb.title}</h3>
                      <p className="text-earth-600 text-sm mb-4 line-clamp-2">{wb.description}</p>
                      {canAccess ? (
                        <a
                          href={wb.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-mystic-600 hover:text-mystic-700 font-medium transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm text-earth-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Requires {wb.membership_tiers?.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}
