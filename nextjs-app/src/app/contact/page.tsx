import type { Metadata } from 'next';
import ParticleEffect from '@/components/ParticleEffect';
import ScrollFadeIn from '@/components/ScrollFadeIn';
import ContactForm from '@/components/ContactForm';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'Contact | The Psilosopher',
  description: 'Get in touch with The Psilosopher. Questions about integration, the program, or just want to connect, reach out.',
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-forest-900 to-mystic-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 60% 30%, rgba(110, 45, 163, 0.5) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(45, 122, 45, 0.4) 0%, transparent 50%)' }} />
        <ParticleEffect />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm mb-6">Let&apos;s Talk</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-mystic-300">Touch</span>
          </h1>
          <p className="text-earth-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Questions, collaboration ideas, or something you&apos;re trying to work through — I read everything and respond to most of it.</p>
        </div>
      </section>

      {/* ── Contact Section ───────────────────────────────────── */}
      <section className="py-24 px-6">
        <ScrollFadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              {/* Left: Info */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <p className="text-mystic-600 font-medium tracking-[0.2em] uppercase text-sm mb-4">Before You Write</p>
                  <h2 className="font-serif text-3xl font-bold mb-6">What to Expect</h2>
                  <p className="text-earth-600 leading-relaxed">I get a lot of messages. I read all of them. I respond to the ones where I can say something genuinely useful. If your question is answered in the blog or resources, I&apos;ll probably point you there. If it&apos;s something more personal or complex, I&apos;ll write back.</p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      color: 'mystic',
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>,
                      title: 'Integration questions',
                      desc: "Navigating a difficult experience, unsure what to do with what came up. This is exactly what I'm here for.",
                    },
                    {
                      color: 'forest',
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>,
                      title: 'Content & collaboration',
                      desc: "Guest posts, podcast appearances, research partnerships. If the work aligns, let's talk.",
                    },
                    {
                      color: 'gold',
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>,
                      title: 'Program inquiries',
                      desc: "Interested in the integration program or cohort? Use this form to get on the list or ask what's right for you.",
                    },
                  ].map(({ color, icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-${color}-100 flex items-center justify-center flex-shrink-0`}>
                        <svg className={`w-6 h-6 text-${color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{title}</h4>
                        <p className="text-earth-600 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-earth-100 rounded-2xl p-6 border border-earth-200">
                  <p className="text-earth-500 text-xs font-medium uppercase tracking-widest mb-3">Email directly</p>
                  <a href="mailto:hello@thepsilosopher.com" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-mystic-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-mystic-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <span className="text-mystic-600 font-medium group-hover:text-mystic-700 transition-colors">hello@thepsilosopher.com</span>
                  </a>
                </div>

                <div className="bg-earth-100 rounded-2xl p-6 border border-earth-200">
                  <p className="text-earth-500 text-xs font-medium uppercase tracking-widest mb-3">Response time</p>
                  <p className="text-earth-700 text-sm leading-relaxed">
                    I typically respond within 3&ndash;5 business days. For urgent harm reduction questions, please contact a crisis line or the{' '}
                    <a href="https://firesideproject.org" target="_blank" rel="noopener noreferrer" className="text-mystic-600 underline hover:text-mystic-700">Fireside Project</a>{' '}
                    (1-62-FIRESIDE).
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-earth-100">
                  <h3 className="font-serif text-2xl font-bold mb-8">Send a Message</h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-earth-100/50 to-earth-50">
        <ScrollFadeIn>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-mystic-600 font-medium tracking-[0.2em] uppercase text-sm mb-4">Common Questions</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">FAQ</h2>
            </div>
            <FAQAccordion />
          </div>
        </ScrollFadeIn>
      </section>
    </>
  );
}
