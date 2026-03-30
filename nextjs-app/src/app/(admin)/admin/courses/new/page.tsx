import { supabaseAdmin } from '@/lib/supabase/admin';
import CourseForm from '@/components/admin/CourseForm';

export default async function NewCoursePage() {
  const { data: tiers } = await supabaseAdmin
    .from('membership_tiers')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-earth-900 mb-8">New Course</h1>
      <CourseForm tiers={tiers ?? []} />
    </div>
  );
}
