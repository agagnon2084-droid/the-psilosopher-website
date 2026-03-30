'use client';

import { useState, useEffect, useCallback } from 'react';

interface Slide {
  title: string;
  content: string;
}

function parseContentIntoSlides(content: string): Slide[] {
  // Split on "Lesson X.Y:" pattern
  const parts = content.split(/(?=Lesson\s+\d+\.\d+:\s)/);
  const slides: Slide[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const match = trimmed.match(/^(Lesson\s+\d+\.\d+:\s*.+?)(?:\n|$)/);
    if (match) {
      slides.push({
        title: match[1].trim(),
        content: trimmed.slice(match[0].length).trim(),
      });
    } else {
      // Intro text before first sub-lesson
      slides.push({
        title: 'Introduction',
        content: trimmed,
      });
    }
  }

  // If parsing didn't find sub-lessons, split by --- dividers
  if (slides.length <= 1 && content.includes('---')) {
    const sections = content.split(/\n---+\n/);
    return sections
      .map((s, i) => {
        const t = s.trim();
        if (!t) return null;
        const firstLine = t.split('\n')[0];
        return {
          title: firstLine.length < 80 ? firstLine : `Section ${i + 1}`,
          content: firstLine.length < 80 ? t.slice(firstLine.length).trim() : t,
        };
      })
      .filter(Boolean) as Slide[];
  }

  return slides.length > 0 ? slides : [{ title: 'Lesson Content', content }];
}

function formatParagraphs(text: string) {
  // Split into paragraphs and render with spacing
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.map((p, i) => {
    const trimmed = p.trim();
    if (!trimmed) return null;

    // Check if it's a list item (starts with bullet, dash, number)
    if (/^[\u2022\-\*]\s/.test(trimmed)) {
      const items = trimmed.split(/\n/).filter(Boolean);
      return (
        <ul key={i} className="space-y-2 my-4 ml-1">
          {items.map((item, j) => (
            <li key={j} className="flex gap-3 text-earth-700 leading-relaxed">
              <span className="text-mystic-500 mt-1 flex-shrink-0">&#x2022;</span>
              <span>{item.replace(/^[\u2022\-\*]\s*/, '')}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (/^\d+[\.\)]\s/.test(trimmed)) {
      const items = trimmed.split(/\n/).filter(Boolean);
      return (
        <ol key={i} className="space-y-2 my-4 ml-1">
          {items.map((item, j) => (
            <li key={j} className="flex gap-3 text-earth-700 leading-relaxed">
              <span className="text-mystic-600 font-semibold mt-0.5 flex-shrink-0 w-6 text-right">{j + 1}.</span>
              <span>{item.replace(/^\d+[\.\)]\s*/, '')}</span>
            </li>
          ))}
        </ol>
      );
    }

    // Check for bold-style emphasis (words in ALL CAPS or quoted)
    return (
      <p key={i} className="text-earth-700 leading-relaxed my-3">
        {trimmed}
      </p>
    );
  });
}

export default function LessonSlides({ content }: { content: string }) {
  const slides = parseContentIntoSlides(content);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || index < 0 || index >= slides.length || animating) return;
      setDirection(index > current ? 'next' : 'prev');
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 200);
    },
    [current, slides.length, animating]
  );

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(current - 1);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, goTo]);

  if (slides.length === 0) return null;

  const slide = slides[current];
  const progress = ((current + 1) / slides.length) * 100;

  return (
    <div className="mb-10">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-earth-500 uppercase tracking-wider">
            Step {current + 1} of {slides.length}
          </span>
          <span className="text-xs text-earth-400">
            {Math.round(progress)}% complete
          </span>
        </div>
        <div className="h-1.5 bg-earth-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-mystic-500 to-forest-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-1.5 mb-6 flex-wrap">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`group relative flex-shrink-0 transition-all duration-300 ${
              i === current
                ? 'w-8 h-2.5 bg-gradient-to-r from-mystic-500 to-forest-500 rounded-full'
                : i < current
                ? 'w-2.5 h-2.5 bg-mystic-300 rounded-full hover:bg-mystic-400'
                : 'w-2.5 h-2.5 bg-earth-200 rounded-full hover:bg-earth-300'
            }`}
            aria-label={`Go to ${s.title}`}
          >
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-earth-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {s.title.length > 40 ? s.title.slice(0, 40) + '...' : s.title}
            </span>
          </button>
        ))}
      </div>

      {/* Slide content */}
      <div
        className={`bg-white rounded-2xl border border-earth-100 shadow-sm overflow-hidden transition-all duration-200 ${
          animating
            ? direction === 'next'
              ? 'opacity-0 translate-x-4'
              : 'opacity-0 -translate-x-4'
            : 'opacity-100 translate-x-0'
        }`}
      >
        {/* Slide header */}
        <div className="bg-gradient-to-r from-mystic-50 via-white to-forest-50 px-8 py-6 border-b border-earth-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mystic-500 to-forest-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {current + 1}
            </div>
            <h2 className="font-serif text-xl font-bold text-earth-900">
              {slide.title}
            </h2>
          </div>
        </div>

        {/* Slide body */}
        <div className="px-8 py-6 min-h-[200px]">
          {formatParagraphs(slide.content)}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            current === 0
              ? 'text-earth-300 cursor-not-allowed'
              : 'text-earth-600 hover:text-earth-900 hover:bg-earth-50 border border-earth-200 hover:border-earth-300'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === slides.length - 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            current === slides.length - 1
              ? 'text-earth-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-mystic-600 to-forest-600 text-white hover:from-mystic-700 hover:to-forest-700 shadow-sm'
          }`}
        >
          {current === slides.length - 1 ? 'Complete' : 'Next'}
          {current < slides.length - 1 && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-xs text-earth-300 mt-4 hidden md:block">
        Use arrow keys to navigate
      </p>
    </div>
  );
}
