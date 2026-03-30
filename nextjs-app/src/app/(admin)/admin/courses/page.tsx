import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { Course, MembershipTier } from '@/lib/types';

export default async function AdminCoursesPage() {
  const { data: courses } = await supabaseAdmin
    .from('courses')
    .select('*, membership_tiers(name)')
    .order('sort_order');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-earth-900">Courses</h1>
        <Link
          href="/admin/courses/new"
          className="px-5 py-2.5 bg-mystic-600 text-white rounded-lg font-medium hover:bg-mystic-700 transition-colors text-sm"
        >
          + New Course
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-earth-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-earth-100 bg-earth-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Title</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Tier</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Order</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-earth-50">
            {(courses ?? []).map((course: Course & { membership_tiers: { name: string } | null }) => (
              <tr key={course.id} className="hover:bg-earth-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-earth-900">{course.title}</div>
                  <div className="text-xs text-earth-400 font-mono">{course.slug}</div>
                </td>
                <td className="px-6 py-4 text-sm text-earth-600">
                  {course.membership_tiers?.name ?? 'Free'}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                    course.is_published ? 'bg-forest-100 text-forest-700' : 'bg-earth-100 text-earth-500'
                  }`}>
                    {course.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-earth-500">{course.sort_order}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link href={`/admin/courses/${course.id}`} className="text-sm text-mystic-600 hover:text-mystic-700 font-medium">Edit</Link>
                  <Link href={`/admin/courses/${course.id}/lessons`} className="text-sm text-forest-600 hover:text-forest-700 font-medium">Lessons</Link>
                </td>
              </tr>
            ))}
            {(courses ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-earth-400">No courses yet. Create your first one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
