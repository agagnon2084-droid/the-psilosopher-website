import type { Metadata } from 'next';
import ParticleEffect from '@/components/ParticleEffect';
import ScrollFadeIn from '@/components/ScrollFadeIn';
import WorkbookForm from '@/components/WorkbookForm';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Resources | The Psilosopher',
  description: 'Free tools, guides, recommended reading, and research to support your psychedelic integration journey.',
};

const TOOLKIT = [
  {
    color: 'mystic',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>,
    title: 'Journaling as Medicine',
    body: "Structured reflection isn't just self-help; it's a core integration tool. Learn the prompts and frameworks that help you extract meaning from difficult or confusing experiences.",
  },
  {
    color: 'forest',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>,
    title: 'Somatic Practices',
    body: "The body stores what the mind can't process. Breathwork, movement, and body-scan practices that help you integrate at the level of the nervous system, not just cognition.",
  },
  {
    color: 'gold',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>,
    title: 'Meaning-Making',
    body: "Transformative experiences need a narrative container. Frameworks for building a coherent story around what you encountered, without forcing it into a shape that doesn't fit.",
  },
  {
    color: 'earth',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM21 20H3v-2a6 6 0 0112 0v2z"/>,
    title: 'Relational Integration',
    body: "Psychedelic experiences often surface relational wounds. How to bring insights back into your relationships, and when to involve the people in your life.",
  },
  {
    color: 'mystic',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    title: 'The Integration Window',
    body: "The first 72 hours after a journey are uniquely fertile for lasting change. What to do — and what to avoid — in the days immediately following an experience.",
  },
  {
    color: 'forest',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>,
    title: 'Building a Daily Practice',
    body: "Integration isn't an event; it's an ongoing practice. How to build sustainable rituals that keep you anchored to your insights long after the initial momentum fades.",
  },
];

const BOOKS = [
  { gradient: 'from-mystic-700 to-mystic-900', author: 'Michael Pollan', title: 'How to Change Your Mind', desc: "The book that brought psychedelics into mainstream conversation. Pollan's research is thorough and his honesty about his own experiences makes it essential reading." },
  { gradient: 'from-forest-700 to-forest-900', author: 'James Fadiman', title: "The Psychedelic Explorer's Guide", desc: "The most practical guide to set, setting, and safe use. Fadiman's work on microdosing protocols is the foundation of most legitimate research in the field." },
  { gradient: 'from-earth-600 to-earth-900', author: 'Bessel van der Kolk', title: 'The Body Keeps the Score', desc: "Not a psychedelic book, but indispensable for understanding why somatic integration matters. The definitive work on how trauma lives in the body." },
  { gradient: 'from-gold-600 to-gold-900', author: 'Schultes & Hofmann', title: 'Plants of the Gods', desc: "The ethnobotanical foundation. Schultes and Hofmann map the history and ceremonial use of psychoactive plants across cultures, providing essential historical context." },
  { gradient: 'from-mystic-800 to-forest-700', author: 'Kotler & Wheal', title: 'Stealing Fire', desc: "How altered states are being used by elite performers, military units, and Silicon Valley, offering a wider lens on the ecstasis conversation beyond psychedelics alone." },
  { gradient: 'from-forest-800 to-earth-700', author: 'Albert Hofmann', title: 'LSD: My Problem Child', desc: "Hofmann's first-person account of discovering LSD: a rare document of a scientist grappling honestly with the implications of his own discovery." },
];

const RESEARCH = [
  {
    href: 'https://www.nature.com/articles/s41380-020-0706-5',
    source: 'Johns Hopkins | 2020',
    title: 'Psilocybin produces substantial and sustained decreases in depression and anxiety',
    desc: 'Davis et al. Landmark study showing significant reduction in depression scores with psilocybin-assisted therapy in cancer patients.',
  },
  {
    href: 'https://www.nature.com/articles/s41598-017-13282-7',
    source: 'Imperial College London | 2017',
    title: 'Psilocybin with psychological support for treatment-resistant depression',
    desc: "Carhart-Harris et al. The study that changed the conversation on treatment-resistant depression and opened the door to clinical trials.",
  },
  {
    href: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5367557/',
    source: 'NYU Langone | 2016',
    title: 'Rapid and sustained symptom reduction following psilocybin treatment for anxiety and depression in cancer patients',
    desc: "Ross et al. Evidence supporting psilocybin's effectiveness in reducing existential distress in life-threatening illness.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-earth-900 to-mystic-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(45, 122, 45, 0.5) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(110, 45, 163, 0.4) 0%, transparent 50%)' }} />
        <ParticleEffect />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm mb-6">Prepare, Navigate, Integrate</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-forest-300">Library</span>
          </h1>
          <p className="text-earth-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Curated resources for every stage of the process: before, during, and after. Protocols, reading lists, integration frameworks, and tools that have actually held up.</p>
        </div>
      </section>

      {/* ── Workbook Download ─────────────────────────────────── */}
      <section className="py-24 px-6">
        <ScrollFadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-mystic-900 via-forest-900 to-earth-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,212,59,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(109,181,109,0.3) 0%, transparent 50%)' }} />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block px-4 py-1 bg-gold-400/20 border border-gold-400/30 rounded-full text-gold-300 text-sm font-medium mb-6">Free Download</span>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">The 7-Day Integration Workbook</h2>
                  <p className="text-earth-200 text-lg leading-relaxed mb-8">Turn your experience into lasting change. This workbook walks you through the critical week after a journey, with journaling prompts, somatic exercises, meaning-making frameworks, and a 7-day post-journey protocol.</p>
                  <ul className="space-y-3 mb-10">
                    {['20-page guided workbook, printable PDF', 'Daily journaling prompts for 7 days', 'Safety framework and grounding practices', 'Intention-setting and meaning-making exercises'].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                        <span className="text-earth-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <WorkbookForm />
                </div>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── Integration Toolkit ───────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-earth-100/50 to-earth-50">
        <ScrollFadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-mystic-600 font-medium tracking-[0.2em] uppercase text-sm mb-4">Core Practices</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Integration Toolkit</h2>
              <p className="text-earth-600 max-w-2xl mx-auto text-lg">The practices that actually move the needle. Not a list of vague suggestions, but specific methods drawn from clinical research and direct experience.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TOOLKIT.map(({ color, icon, title, body }) => (
                <div key={title} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100 hover:border-mystic-200">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${color}-100 to-${color}-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <svg className={`w-7 h-7 text-${color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">{title}</h3>
                  <p className="text-earth-600 leading-relaxed text-sm mb-4">{body}</p>
                  <a href="/blog" className="text-mystic-600 text-sm font-medium hover:text-mystic-700 transition-colors inline-flex items-center gap-1">
                    Read the guide
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── Recommended Reading ───────────────────────────────── */}
      <section className="py-24 px-6">
        <ScrollFadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-mystic-600 font-medium tracking-[0.2em] uppercase text-sm mb-4">Curated Library</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Recommended Reading</h2>
              <p className="text-earth-600 max-w-2xl mx-auto text-lg">Books that shaped my thinking and have genuinely helped the people I&apos;ve worked with. No filler. Only books worth your time.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {BOOKS.map(({ gradient, author, title, desc }) => (
                <div key={title} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-earth-100 flex gap-5">
                  <div className={`w-16 h-20 rounded-lg bg-gradient-to-br ${gradient} flex-shrink-0 flex items-center justify-center shadow-md`}>
                    <span className="text-white font-serif text-xs font-bold text-center px-1 leading-tight">{title}</span>
                  </div>
                  <div>
                    <p className="text-earth-400 text-xs mb-1">{author}</p>
                    <h4 className="font-serif text-lg font-bold mb-2 group-hover:text-mystic-600 transition-colors">{title}</h4>
                    <p className="text-earth-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── Research ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-earth-100/50 to-earth-50">
        <ScrollFadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <p className="text-mystic-600 font-medium tracking-[0.2em] uppercase text-sm mb-4">Science</p>
              <h2 className="font-serif text-4xl font-bold mb-8">Key Research</h2>
              <div className="space-y-4">
                {RESEARCH.map(({ href, source, title, desc }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl p-6 border border-earth-100 hover:border-mystic-200 transition-colors group">
                    <p className="text-earth-400 text-xs mb-2">{source}</p>
                    <h4 className="font-serif font-bold mb-2 group-hover:text-mystic-600 transition-colors">{title}</h4>
                    <p className="text-earth-600 text-sm mb-3">{desc}</p>
                    <span className="text-mystic-600 text-xs font-medium inline-flex items-center gap-1">
                      Read study
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── Newsletter ─────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <ScrollFadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Stay Informed</h2>
            <p className="text-earth-600 text-lg mb-10 max-w-xl mx-auto">New resources, research breakdowns, and integration tools, straight to your inbox.</p>
            <NewsletterForm />
            <p className="text-earth-400 text-xs mt-4">No spam. Unsubscribe whenever.</p>
          </div>
        </ScrollFadeIn>
      </section>
    </>
  );
}
