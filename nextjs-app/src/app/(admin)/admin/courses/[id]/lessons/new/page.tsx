import Link from 'next/link';
import LessonForm from '@/components/admin/LessonForm';

export default async function NewLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <div className="mb-2">
        <Link href={`/admin/courses/${id}/lessons`} className="text-sm text-earth-400 hover:text-earth-600 transition-colors">
          ← Back to lessons
        </Link>
      </div>
      <h1 className="font-serif text-3xl font-bold text-earth-900 mb-8">New Lesson</h1>
      <LessonForm courseId={id} />
    </div>
  );
}
