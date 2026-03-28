'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 w-full z-50 transition-all duration-300${scrolled ? ' nav-scrolled' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mystic-500 to-forest-600 flex items-center justify-center">
            <span className="text-white font-serif font-bold text-lg">P</span>
          </div>
          <span className="font-serif font-bold text-xl tracking-tight">The Psilosopher</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="nav-link text-sm font-medium hover:text-mystic-600 transition-colors">Home</Link>
          <Link href="/about" className="nav-link text-sm font-medium hover:text-mystic-600 transition-colors">About</Link>
          <Link href="/blog" className="nav-link text-sm font-medium hover:text-mystic-600 transition-colors">Blog</Link>
          <Link href="/resources" className="nav-link text-sm font-medium hover:text-mystic-600 transition-colors">Resources</Link>
          <Link href="/contact" className="px-5 py-2 bg-mystic-600 text-white rounded-full text-sm font-medium hover:bg-mystic-700 transition-colors">Get in Touch</Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-earth-800"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-earth-200">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium hover:text-mystic-600" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/about" className="text-sm font-medium hover:text-mystic-600" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/blog" className="text-sm font-medium hover:text-mystic-600" onClick={() => setMenuOpen(false)}>Blog</Link>
            <Link href="/resources" className="text-sm font-medium hover:text-mystic-600" onClick={() => setMenuOpen(false)}>Resources</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-mystic-600" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
