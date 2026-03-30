import type { Metadata } from 'next';
import Link from 'next/link';
import ParticleEffect from '@/components/ParticleEffect';
import ScrollFadeIn from '@/components/ScrollFadeIn';

export const metadata: Metadata = {
  title: 'About | The Psilosopher',
  description: 'Learn about The Psilosopher — honest, grounded, experience-backed psychedelic education and integration support.',
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-mystic-900 to-forest-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(110, 45, 163, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(45, 122, 45, 0.4) 0%, transparent 50%)' }} />
        <ParticleEffect />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm mb-6">The Person Behind the Work</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-mystic-300">Story</span>
          </h1>
          <p className="text-earth-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Not a clinical background. Not a clean origin story. A real one.</p>
        </div>
      </section>

      {/* ── Origin ────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <ScrollFadeIn>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-earth-100">
              <p className="text-mystic-600 font-medium tracking-[0.2em] uppercase text-sm mb-4">Origin</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">The Path Here</h2>
              <div className="space-y-6 text-earth-700 leading-relaxed text-lg">
                <p>I grew up checking every box that was put in front of me. Affluent suburb outside Baltimore, competitive school, varsity lacrosse, a future that was already mapped out before I had a chance to want something different. From the outside it looked right. From the inside I couldn&apos;t name what was wrong, only that something was.</p>
                <p>I found my way through books first. Dostoyevsky, Kerouac, Burroughs, Thompson. Writers who had been somewhere the syllabus hadn&apos;t covered, and came back with something worth saying. Those books were the first things that spoke to me in a way the world around me didn&apos;t. They nudged me toward questions I didn&apos;t have the language for yet.</p>
                <p>The first time I sat with a psychedelic as a teenager, long before the word &apos;microdosing&apos; had entered the mainstream and years before researchers at Johns Hopkins started publishing results that made the cover of The Atlantic, I had an experience that I could only describe as clarifying. Not transcendent. Not religious. Clarifying. Like looking at something familiar from a completely different angle and seeing it for the first time.</p>
                <p>I spent the next several years developing what I could only call fluency: in the substances, in the literature, in the experiences of hundreds of people I met along the way who were working with these medicines in serious, thoughtful ways. I also encountered the legal system&apos;s view of it, which is about as far from thoughtful as you can get. I&apos;ve been on the wrong side of that. It clarified some things too.</p>
                <p>What I kept coming back to, through all of it, was this: these tools work. Not as an escape. Not as entertainment. As instruments for understanding yourself: your patterns, your defenses, the stories you&apos;ve been running on autopilot for years. In the right context, with the right preparation, with someone helping you integrate what comes up, they&apos;re among the most powerful catalysts for genuine change I&apos;ve encountered.</p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-r from-mystic-900 via-forest-900 to-earth-900 text-white">
        <ScrollFadeIn>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold-400 font-medium tracking-[0.2em] uppercase text-sm mb-6">My Purpose</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">The Mission</h2>
            <div className="text-xl md:text-2xl leading-relaxed space-y-6">
              <p className="text-earth-200">To provide honest, grounded, experience-backed education and integration support for people who are serious about using psychedelics as tools for genuine growth.</p>
              <p className="text-earth-300 text-lg">Not escape. Not entertainment. The difficult and rewarding work of becoming more fully yourself.</p>
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── Core Values ───────────────────────────────────────── */}
      <section className="py-24 px-6">
        <ScrollFadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-mystic-600 font-medium tracking-[0.2em] uppercase text-sm mb-4">What I Stand For</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">Core Values</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  iconColor: 'gold',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>,
                  title: 'Not Here for Your Comfort',
                  body: "If you're looking for confirmation of what you already believe, there's plenty of that out there. This isn't it. I write about what the research actually shows — including the parts that complicate the narrative. I'll tell you when something doesn't work, when the evidence is thin, when the hype has outrun the reality. This is for people who want to think clearly about this, not just feel good about it.",
                },
                {
                  iconColor: 'forest',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4"/>,
                  title: 'Experience Over Theory',
                  body: "Everything here comes from direct, lived engagement with these substances and with the people who use them. I draw on science and philosophy and indigenous wisdom, but the foundation is firsthand knowledge.",
                },
                {
                  iconColor: 'mystic',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>,
                  title: 'Integration Is the Work',
                  body: "The journey is an hour or a day. Integration is the rest of your life. That's where the real transformation either happens or doesn't, and that's where I focus.",
                },
                {
                  iconColor: 'earth',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM15 20H9m6 0h.01M9 20H3v-2a6 6 0 0112 0v2z"/>,
                  title: 'Balance & Discipline',
                  body: "I don't believe in fear as a governing principle. I don't believe in binary thinking. I believe in balance, discipline, and your right to explore your own consciousness on your own terms.",
                },
              ].map(({ iconColor, icon, title, body }) => (
                <div key={title} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100 hover:border-mystic-200">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${iconColor}-100 to-${iconColor}-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <svg className={`w-8 h-8 text-${iconColor}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-3">{title}</h3>
                  <p className="text-earth-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── Who I Am ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-earth-100/50 to-earth-50">
        <ScrollFadeIn>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-mystic-600 font-medium tracking-[0.2em] uppercase text-sm mb-4">The Guide</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Who I Am</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-earth-100">
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4">Who I Am (Quick Facts)</h3>
                  <p className="text-earth-600 text-lg leading-relaxed">Not a licensed therapist. Not a clinician. Someone who&apos;s been working with these medicines, personally, educationally, and in a coaching context, for years. Someone who reads the research, engages with the traditions, and is trying to do this work with some intellectual honesty.</p>
                </div>
                <div className="bg-gradient-to-r from-mystic-50 to-forest-50 rounded-xl p-6 border border-mystic-200">
                  <p className="text-earth-700 text-lg leading-relaxed italic">&ldquo;The dark parts of a psychedelic experience are often the most useful. Running from them is exactly what keeps people stuck.&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <ScrollFadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Join the Movement</h2>
            <p className="text-earth-600 text-lg mb-10 max-w-2xl mx-auto">Whether you&apos;re a curious learner, an experienced explorer, or someone seeking healing, there&apos;s a place for you here.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" className="px-8 py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 text-white rounded-full font-medium hover:from-mystic-700 hover:to-mystic-600 transition-all shadow-lg shadow-mystic-500/25">Explore Our Content</Link>
              <Link href="/contact" className="px-8 py-4 border-2 border-mystic-600 text-mystic-600 rounded-full font-medium hover:bg-mystic-50 transition-all">Get in Touch</Link>
            </div>
          </div>
        </ScrollFadeIn>
      </section>
    </>
  );
}
