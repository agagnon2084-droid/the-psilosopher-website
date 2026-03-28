import type { Metadata } from 'next';
import Link from 'next/link';
import ParticleEffect from '@/components/ParticleEffect';
import ScrollFadeIn from '@/components/ScrollFadeIn';
import NewsletterForm from '@/components/NewsletterForm';
import BlogFilter from '@/components/BlogFilter';

export const metadata: Metadata = {
  title: 'Blog | The Psilosopher',
  description: 'Science-backed articles on psychedelic integration, neuroscience, history, and wellness practices.',
};

export default function BlogPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-mystic-900 to-forest-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(110, 45, 163, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(45, 122, 45, 0.4) 0%, transparent 50%)' }} />
        <ParticleEffect />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm mb-6">From the Journal</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            Articles, Essays, and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-mystic-300">Field Notes</span>
          </h1>
          <p className="text-earth-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Research-grounded, plainly written. No hype, no algorithm, no noise.</p>
        </div>
      </section>

      {/* ── Featured Article ──────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-mystic-600 font-medium tracking-[0.2em] uppercase text-sm mb-8">Featured</p>
          <Link href="/blog/default-mode-network" className="group grid md:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100 article-card">
            <div className="h-64 md:h-auto bg-gradient-to-br from-mystic-800 via-mystic-600 to-forest-700 relative overflow-hidden min-h-[280px]">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,212,59,0.4) 0%, transparent 60%)' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-24 h-24 text-white/10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">Neuroscience</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-gold-300 text-xs font-medium">Featured Article</span>
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-earth-400 text-sm mb-3">March 18, 2026 &middot; 8 min read</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 group-hover:text-mystic-600 transition-colors leading-tight">The Default Mode Network: How Psilocybin Rewires Thought Patterns</h2>
              <p className="text-earth-600 leading-relaxed mb-6">There&apos;s a part of your brain that never shuts up. It&apos;s running when you&apos;re lying in bed at 3am replaying a conversation from six years ago. It&apos;s the narrator, the voice that stitches together your memories, your anxieties, and your sense of who you are. Neuroscientists call it the Default Mode Network. And psilocybin, it turns out, is one of the few things that can make it quiet.</p>
              <span className="inline-flex items-center gap-2 text-mystic-600 font-medium text-sm">
                Read article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Filterable article grid (client component) ────────── */}
      <BlogFilter />

      {/* ── Newsletter CTA ────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-earth-100/50 to-earth-50">
        <ScrollFadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-mystic-100 to-forest-100 flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-mystic-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Get the Digest</h2>
            <p className="text-earth-600 text-lg mb-10 max-w-xl mx-auto">New articles, research notes, and integration tools, straight to your inbox. No spam. Unsubscribe whenever.</p>
            <NewsletterForm />
            <p className="text-earth-400 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </ScrollFadeIn>
      </section>
    </>
  );
}
