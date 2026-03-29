'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdownOpen]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setDropdownOpen(false);
    setMenuOpen(false);
    router.push('/');
    router.refresh();
  }

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? '?';

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
          <Link href="/pricing" className="nav-link text-sm font-medium hover:text-mystic-600 transition-colors">Membership</Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-mystic-500 to-forest-600 flex items-center justify-center text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                {userInitial}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-earth-100 py-2 z-50">
                  <p className="px-4 py-2 text-xs text-earth-400 truncate">{user.email}</p>
                  <div className="border-t border-earth-100 my-1" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-earth-700 hover:bg-earth-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="nav-link text-sm font-medium hover:text-mystic-600 transition-colors">Log In</Link>
              <Link href="/signup" className="px-5 py-2 bg-mystic-600 text-white rounded-full text-sm font-medium hover:bg-mystic-700 transition-colors">Sign Up</Link>
            </>
          )}
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
            <Link href="/pricing" className="text-sm font-medium hover:text-mystic-600" onClick={() => setMenuOpen(false)}>Membership</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-mystic-600" onClick={() => setMenuOpen(false)}>Contact</Link>

            {user ? (
              <>
                <div className="border-t border-earth-200 pt-4">
                  <p className="text-xs text-earth-400 truncate mb-3">{user.email}</p>
                  <button
                    onClick={handleSignOut}
                    className="text-sm font-medium text-earth-700 hover:text-mystic-600"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-earth-200 pt-4 flex flex-col gap-3">
                <Link href="/login" className="text-sm font-medium hover:text-mystic-600" onClick={() => setMenuOpen(false)}>Log In</Link>
                <Link href="/signup" className="text-center px-5 py-2 bg-mystic-600 text-white rounded-full text-sm font-medium hover:bg-mystic-700 transition-colors" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
