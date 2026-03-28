// Tailwind safelist - these dynamic gradient classes must be preserved:
// from-earth-900 via-mystic-900 to-forest-900
// from-forest-900 via-forest-800 to-earth-900
// from-earth-900 via-mystic-900 to-earth-800
// from-gold-800 via-earth-800 to-mystic-900
// from-forest-700 via-forest-900 to-earth-900

import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ScrollFadeIn from '@/components/ScrollFadeIn';
import NewsletterForm from '@/components/NewsletterForm';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | The Psilosopher`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      {/* Back to Blog */}
      <div className="pt-24 pb-0 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-earth-500 hover:text-mystic-600 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden py-20 mt-4">
        <div className={`absolute inset-0 bg-gradient-to-br ${post.heroGradient}`}></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 60% 30%, rgba(110, 45, 163, 0.5) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(45, 122, 45, 0.4) 0%, transparent 50%)',
          }}
        ></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-gold-400/20 border border-gold-400/40 text-gold-400 rounded-full text-xs font-medium tracking-widest uppercase mb-6">
            {post.category}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
            {post.title}
          </h1>
          <p className="text-earth-300 text-sm md:text-base">
            {post.date} &middot; {post.readTime}
          </p>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {post.content()}

          {/* References */}
          <div className="mt-16 pt-8 border-t border-earth-200">
            <h3 className="font-serif text-lg font-bold text-earth-900 mb-4">References</h3>
            <ul className="space-y-2 text-sm italic text-earth-500">
              {post.references.map((ref: { text: string; source: string }, i: number) => (
                <li key={i}>
                  {ref.text} <em>{ref.source}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {/* Newsletter CTA */}
      <ScrollFadeIn>
        <section className="py-24 px-6 bg-gradient-to-b from-earth-100/50 to-earth-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-mystic-100 to-forest-100 flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-mystic-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Get the Digest</h2>
            <p className="text-earth-600 text-lg mb-10 max-w-xl mx-auto">
              New articles, research notes, and integration tools — straight to your inbox. No spam. Unsubscribe
              whenever.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </ScrollFadeIn>
    </>
  );
}
