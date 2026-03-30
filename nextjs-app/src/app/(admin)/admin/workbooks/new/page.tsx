import { supabaseAdmin } from '@/lib/supabase/admin';
import WorkbookForm from '@/components/admin/WorkbookForm';

export default async function NewWorkbookPage() {
  const { data: tiers } = await supabaseAdmin
    .from('membership_tiers')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-earth-900 mb-8">New Workbook</h1>
      <WorkbookForm tiers={tiers ?? []} />
    </div>
  );
}
