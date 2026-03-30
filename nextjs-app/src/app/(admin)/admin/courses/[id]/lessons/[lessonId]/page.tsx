import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import LessonForm from '@/components/admin/LessonForm';

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const { id, lessonId } = await params;

  const { data: lesson } = await supabaseAdmin
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single();

  if (!lesson) notFound();

  return (
    <div>
      <div className="mb-2">
        <Link href={`/admin/courses/${id}/lessons`} className="text-sm text-earth-400 hover:text-earth-600 transition-colors">
          ← Back to lessons
        </Link>
      </div>
      <h1 className="font-serif text-3xl font-bold text-earth-900 mb-8">Edit Lesson</h1>
      <LessonForm lesson={lesson} courseId={id} />
    </div>
  );
}
