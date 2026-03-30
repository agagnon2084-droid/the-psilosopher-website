import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import CourseForm from '@/components/admin/CourseForm';

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [{ data: course }, { data: tiers }] = await Promise.all([
    supabaseAdmin.from('courses').select('*').eq('id', id).single(),
    supabaseAdmin.from('membership_tiers').select('*').eq('is_active', true).order('sort_order'),
  ]);

  if (!course) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-earth-900 mb-8">Edit Course</h1>
      <CourseForm course={course} tiers={tiers ?? []} />
    </div>
  );
}
