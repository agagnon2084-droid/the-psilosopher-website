'use client';

import { useState } from 'react';

type FAQ = { q: string; a: React.ReactNode };

const FAQS: FAQ[] = [
  {
    q: 'Do you offer 1-on-1 integration sessions?',
    a: 'Not in the traditional sense. I work through structured programs rather than open-ended sessions. The cohort program includes group calls and direct access, which is where most of the relational work happens. If you\'re looking for 1-on-1 support, reach out and I can point you toward resources that might be a better fit.',
  },
  {
    q: 'Is this therapy? Are you a licensed therapist?',
    a: 'No and no. This is education and integration coaching, not therapy. I\'m not a licensed mental health professional and I don\'t treat clinical conditions. If you\'re working through serious trauma, depression, or a psychiatric condition, please involve a qualified clinician. What I offer complements clinical work; it doesn\'t replace it.',
  },
  {
    q: "I've never used psychedelics. Is this still relevant to me?",
    a: "Yes. A lot of what I write about — the neuroscience of consciousness, how insight becomes behavior change, the relationship between body and mind. All of that applies whether or not you've ever taken a substance. That said, the program content is designed for people who are actively working with psychedelic experiences or planning to.",
  },
  {
    q: 'How is this different from other psychedelic education content?',
    a: "Most of what's out there is either clinical and dry, or mystical and vague. I'm trying to thread the needle: grounded in research, informed by philosophy, shaped by hundreds of hours of direct experience. I'll also tell you when something doesn't work, not just when it does. The people I've found most useful in this space are honest about the hard parts.",
  },
  {
    q: "I'm having a difficult experience right now. What should I do?",
    a: (
      <>
        If you&apos;re in acute distress during or immediately after a psychedelic experience, please contact the{' '}
        <strong>Fireside Project</strong> at 1-62-FIRESIDE (1-623-473-7433). They offer free, confidential support from people who understand psychedelic experiences. For ongoing difficulty in the days or weeks after, my integration resources are a good starting point, and you&apos;re welcome to reach out.
      </>
    ),
  },
  {
    q: 'When does the next cohort open?',
    a: "Cohorts run on a quarterly basis. The best way to be notified when the next one opens is to join the newsletter, since cohort spots go to the list first, before any public announcement. You can also mention your interest in your contact message and I'll make sure you hear about it.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {FAQS.map((faq, i) => (
        <div key={i} className="bg-white rounded-2xl border border-earth-100 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-earth-50 transition-colors"
          >
            <span className="font-serif text-lg font-bold pr-4">{faq.q}</span>
            <svg
              className="w-5 h-5 text-mystic-600 flex-shrink-0 transition-transform duration-200"
              style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-8 pb-6">
              <p className="text-earth-600 leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
