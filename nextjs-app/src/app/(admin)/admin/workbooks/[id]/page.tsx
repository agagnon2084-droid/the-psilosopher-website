import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import WorkbookForm from '@/components/admin/WorkbookForm';

export default async function EditWorkbookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [{ data: workbook }, { data: tiers }] = await Promise.all([
    supabaseAdmin.from('workbooks').select('*').eq('id', id).single(),
    supabaseAdmin.from('membership_tiers').select('*').eq('is_active', true).order('sort_order'),
  ]);

  if (!workbook) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-earth-900 mb-8">Edit Workbook</h1>
      <WorkbookForm workbook={workbook} tiers={tiers ?? []} />
    </div>
  );
}
