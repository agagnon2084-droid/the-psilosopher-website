import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { Lesson } from '@/lib/types';

export default async function AdminLessonsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: course } = await supabaseAdmin
    .from('courses')
    .select('id, title')
    .eq('id', id)
    .single();

  if (!course) notFound();

  const { data: lessons } = await supabaseAdmin
    .from('lessons')
    .select('*')
    .eq('course_id', id)
    .order('sort_order');

  return (
    <div>
      <div className="mb-2">
        <Link href="/admin/courses" className="text-sm text-earth-400 hover:text-earth-600 transition-colors">
          ← Back to courses
        </Link>
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-earth-900">Lessons</h1>
          <p className="text-earth-500 text-sm mt-1">{course.title}</p>
        </div>
        <Link
          href={`/admin/courses/${id}/lessons/new`}
          className="px-5 py-2.5 bg-mystic-600 text-white rounded-lg font-medium hover:bg-mystic-700 transition-colors text-sm"
        >
          + New Lesson
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-earth-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-earth-100 bg-earth-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Order</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Title</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Preview</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-earth-50">
            {(lessons ?? []).map((lesson: Lesson) => (
              <tr key={lesson.id} className="hover:bg-earth-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-earth-500">{lesson.sort_order}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-earth-900">{lesson.title}</div>
                  <div className="text-xs text-earth-400 font-mono">{lesson.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                    lesson.is_published ? 'bg-forest-100 text-forest-700' : 'bg-earth-100 text-earth-500'
                  }`}>
                    {lesson.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {lesson.is_free_preview && (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-700">Free</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/courses/${id}/lessons/${lesson.id}`} className="text-sm text-mystic-600 hover:text-mystic-700 font-medium">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {(lessons ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-earth-400">No lessons yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
