'use client';

import { useState } from 'react';
import Link from 'next/link';

type Article = {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  gradient: string;
  accentGradient: string;
};

const ARTICLES: Article[] = [
  {
    slug: 'set-and-setting',
    category: 'integration',
    date: 'March 12, 2026',
    readTime: '9 min read',
    title: 'Set and Setting: The Two Variables That Shape Every Psychedelic Experience',
    excerpt: "There's a reason the same compound can produce, in one person, the most meaningful experience of their life, and in another, six hours of white-knuckle terror. The molecule is identical. The difference is everything else.",
    gradient: 'from-forest-800 via-forest-600 to-earth-700',
    accentGradient: 'radial-gradient(circle at 70% 30%, rgba(110,45,163,0.3) 0%, transparent 50%)',
  },
  {
    slug: 'ego-dissolution',
    category: 'philosophy',
    date: 'March 5, 2026',
    readTime: '10 min read',
    title: 'Ego Dissolution: What Happens When the Self Disappears',
    excerpt: "Take everything you think of as \"you\": your name, your memories, the running narrative in your head. Now imagine it dissolving. Not going away forever. Just loosening. This isn't a metaphor. It's a measurable, reproducible phenomenon.",
    gradient: 'from-earth-800 via-mystic-800 to-earth-900',
    accentGradient: 'radial-gradient(circle at 60% 40%, rgba(109,181,109,0.3) 0%, transparent 50%)',
  },
  {
    slug: 'sacred-mushrooms',
    category: 'history',
    date: 'Feb 26, 2026',
    readTime: '12 min read',
    title: 'Sacred Mushrooms Through the Ages: A History That Was Almost Erased',
    excerpt: "The story most people know (Leary discovered psychedelics, Nixon banned them, Johns Hopkins brought them back) is wrong in almost every way that matters. The real history is longer, darker, and more interesting.",
    gradient: 'from-gold-700 via-earth-700 to-mystic-800',
    accentGradient: 'radial-gradient(circle at 50% 50%, rgba(45,122,45,0.3) 0%, transparent 50%)',
  },
  {
    slug: 'body-keeps-the-trip',
    category: 'wellness',
    date: 'Feb 19, 2026',
    readTime: '9 min read',
    title: 'The Body Keeps the Trip: Somatic Approaches to Psychedelic Integration',
    excerpt: "Most psychedelic integration happens from the neck up. You talk about what happened. Then you go home and wonder why, three weeks later, nothing has changed. The problem is that we treat the mind as if it exists independently of the body.",
    gradient: 'from-forest-600 via-forest-800 to-earth-800',
    accentGradient: 'radial-gradient(circle at 80% 20%, rgba(110,45,163,0.3) 0%, transparent 50%)',
  },
];

const CATEGORIES = ['all', 'neuroscience', 'integration', 'philosophy', 'history', 'wellness'];

export default function BlogFilter() {
  const [active, setActive] = useState('all');

  const visible = active === 'all' ? ARTICLES : ARTICLES.filter((a) => a.category === active);

  return (
    <>
      {/* Filter tabs */}
      <section className="py-12 px-6 border-b border-earth-200 bg-white/60 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  active === cat
                    ? 'bg-mystic-600 text-white'
                    : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                }`}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {visible.length === 0 ? (
            <p className="text-center text-earth-400 text-lg py-16">No articles in this category yet. Check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
              {visible.map((article) => (
                <Link href={`/blog/${article.slug}`} key={article.slug} className="article-card group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100 h-full flex flex-col">
                    <div className={`h-52 bg-gradient-to-br ${article.gradient} relative overflow-hidden flex-shrink-0`}>
                      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: article.accentGradient }} />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium capitalize">{article.category}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-earth-400 text-sm mb-2">{article.date} &middot; {article.readTime}</p>
                      <h3 className="font-serif text-xl font-bold mb-3 group-hover:text-mystic-600 transition-colors flex-1">{article.title}</h3>
                      <p className="text-earth-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                      <span className="text-mystic-600 text-sm font-medium inline-flex items-center gap-1">
                        Read more
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
