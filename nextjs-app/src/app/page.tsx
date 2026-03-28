import type { Metadata } from 'next';
import Link from 'next/link';
import ParticleEffect from '@/components/ParticleEffect';
import ScrollFadeIn from '@/components/ScrollFadeIn';
import NewsletterForm from '@/components/NewsletterForm';
import WorkbookForm from '@/components/WorkbookForm';

export const metadata: Metadata = {
  title: 'The Psilosopher | Psychedelic Health & Wellness',
  description:
    'Empowering minds through science-backed psychedelic education. Explore the intersection of ancient wisdom and modern research.',
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-mystic-900 to-forest-900" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(110, 45, 163, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(45, 122, 45, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(168, 137, 61, 0.3) 0%, transparent 50%)',
          }}
        />
        <ParticleEffect />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm mb-6 animate-fade-in">
            Science-Backed Psychedelic Education
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8 animate-fade-in-up">
            Envision. Execute.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-mystic-300 to-forest-300">
              Evolve.
            </span>
          </h1>
          <p className="text-earth-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay">
            Psychedelics changed how I understand my mind, my patterns, and what healing actually looks like. Everything on this site is an attempt to make that knowledge useful to someone else.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
            <Link
              href="/blog"
              className="px-8 py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 text-white rounded-full font-medium hover:from-mystic-700 hover:to-mystic-600 transition-all shadow-lg shadow-mystic-500/25 hover:shadow-mystic-500/40"
            >
              Start Reading
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border-2 border-earth-300/30 text-white rounded-full font-medium hover:bg-white/10 transition-all"
            >
              My Story
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-earth-300/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ── Philosophy ────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <ScrollFadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-mystic-600 font-medium tracking-[0.2em] uppercase text-sm mb-4">How I Think About This</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">The Three Pillars</h2>
              <p className="text-earth-600 max-w-2xl mx-auto text-lg">
                I don&apos;t think you can talk about psychedelics responsibly without holding three things at once: what the research actually says, what the tradition has always known, and what&apos;s true for the individual sitting in front of you. I try to hold all three.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100 hover:border-mystic-200">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forest-100 to-forest-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">Science</h3>
                <p className="text-earth-600 leading-relaxed">I take the research seriously: the fMRI studies, the clinical trials, the growing body of evidence coming out of Johns Hopkins, MAPS, and Imperial College. I try to understand it well enough to translate it, and honest enough to say what it doesn&apos;t yet tell us.</p>
              </div>
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100 hover:border-mystic-200">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mystic-100 to-mystic-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-mystic-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">Compassion</h3>
                <p className="text-earth-600 leading-relaxed">Healing isn&apos;t linear and it isn&apos;t tidy. I&apos;m not going to pretend otherwise. Whatever brought you here, whether curiosity, a difficult experience, or a long stretch of feeling stuck, you don&apos;t need to explain or justify it.</p>
              </div>
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100 hover:border-mystic-200">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">Wisdom</h3>
                <p className="text-earth-600 leading-relaxed">Indigenous and contemplative traditions have been working with these medicines for thousands of years. That knowledge matters, and I take it seriously. Not as aesthetics, not as branding, but as accumulated understanding about what these experiences ask of a person.</p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── Featured Articles ──────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-earth-100/50 to-earth-50">
        <ScrollFadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
              <div>
                <p className="text-mystic-600 font-medium tracking-[0.2em] uppercase text-sm mb-4">From the Journal</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold">Latest Insights</h2>
              </div>
              <Link href="/blog" className="text-mystic-600 font-medium hover:text-mystic-700 transition-colors flex items-center gap-2">
                View all articles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { href: '/blog/default-mode-network', gradient: 'from-mystic-800 via-mystic-600 to-forest-700', accent: 'radial-gradient(circle at 30% 70%, rgba(255,212,59,0.3) 0%, transparent 50%)', tag: 'Neuroscience', date: 'March 18, 2026', title: 'The Default Mode Network: How Psilocybin Rewires Thought Patterns', excerpt: 'New fMRI studies reveal how psilocybin temporarily dissolves rigid neural pathways, opening the door to lasting cognitive flexibility and emotional healing.' },
                { href: '/blog/set-and-setting', gradient: 'from-forest-800 via-forest-600 to-earth-700', accent: 'radial-gradient(circle at 70% 30%, rgba(110,45,163,0.3) 0%, transparent 50%)', tag: 'Integration', date: 'March 12, 2026', title: 'Integration Practices: Turning Insight Into Lasting Change', excerpt: 'The experience is only the beginning. Evidence-based techniques for making what you find in those hours actually stick.' },
                { href: '/blog/sacred-mushrooms', gradient: 'from-gold-700 via-earth-700 to-mystic-800', accent: 'radial-gradient(circle at 50% 50%, rgba(45,122,45,0.3) 0%, transparent 50%)', tag: 'History', date: 'March 5, 2026', title: 'Sacred Mushrooms Through the Ages: A 10,000-Year Timeline', excerpt: "From the Tassili cave paintings to modern clinical trials — the long, strange history of humanity's relationship with fungi." },
              ].map(({ href, gradient, accent, tag, date, title, excerpt }) => (
                <Link href={href} key={href} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100">
                    <div className={`h-56 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: accent }} />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">{tag}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-earth-400 text-sm mb-2">{date}</p>
                      <h3 className="font-serif text-xl font-bold mb-3 group-hover:text-mystic-600 transition-colors">{title}</h3>
                      <p className="text-earth-600 text-sm leading-relaxed">{excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── Workbook Lead Magnet ───────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-mystic-900 via-earth-900 to-forest-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(110, 45, 163, 0.5) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(45, 122, 45, 0.4) 0%, transparent 50%)' }} />
        <ScrollFadeIn className="relative z-10 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <p className="text-gold-400 font-medium tracking-[0.2em] uppercase text-sm mb-4">Free Download</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">The 7-Day Integration Workbook</h2>
              <p className="text-earth-200 text-lg leading-relaxed mb-8">Most people leave a psychedelic experience with insight they cannot hold onto. This workbook gives you a structured daily practice for the week that follows: prompts, reflection tools, and grounding exercises designed to turn what you found into something that lasts.</p>
              <ul className="space-y-3 text-earth-200">
                {['7 days of guided reflection prompts', 'Somatic grounding exercises', 'Science-backed integration framework'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gold-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Get it free</h3>
              <p className="text-earth-300 text-sm mb-6">Sent instantly to your inbox.</p>
              <WorkbookForm />
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── Newsletter ─────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <ScrollFadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-mystic-100 to-forest-100 flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-mystic-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Stay Curious</h2>
            <p className="text-earth-600 text-lg mb-10 max-w-xl mx-auto">Weekly dispatches on psychedelic science, integration, and what the research is actually saying. No fluff, no algorithm, straight to your inbox.</p>
            <NewsletterForm />
            <p className="text-earth-400 text-xs mt-4">No spam. Unsubscribe whenever.</p>
          </div>
        </ScrollFadeIn>
      </section>
    </>
  );
}
