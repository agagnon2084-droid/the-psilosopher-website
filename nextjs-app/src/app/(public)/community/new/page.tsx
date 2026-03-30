import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getUserTierLevel } from '@/lib/access';
import NewPostForm from '@/components/community/NewPostForm';

export const metadata: Metadata = {
  title: 'New Discussion | Community | The Psilosopher',
};

export default async function NewPostPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const tierLevel = await getUserTierLevel(user.id);
  if (tierLevel < 1) redirect('/pricing?reason=community');
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
