import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import NewPostForm from '@/components/community/NewPostForm';

export const metadata: Metadata = {
  title: 'New Discussion | Community | The Psilosopher',
};

export default function NewPostPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex items-center gap-2 text-sm text-earth-500 mb-6">
          <Link href="/community" className="hover:text-mystic-600 transition-colors">
            Community
          </Link>
          <span>/</span>
          <span className="text-earth-700">New Discussion</span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-earth-900 mb-8">
          Start a Discussion
        </h1>

        <div className="bg-white rounded-2xl border border-earth-100 p-6 md:p-8">
          <Suspense fallback={null}>
            <NewPostForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
