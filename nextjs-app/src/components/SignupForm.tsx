'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function SignupForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setStatus('error');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      setStatus('error');
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setStatus('error');
    } else {
      setStatus('done');
    }
  }

  async function handleGoogleSignup() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  if (status === 'done') {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-bold mb-3">Check your email.</h3>
        <p className="text-earth-600 max-w-sm mx-auto">We sent a confirmation link to your inbox. Click it to activate your account.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-2" htmlFor="email">Email address</label>
          <input
            type="email" id="email" name="email" required placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:border-mystic-400 focus:ring-2 focus:ring-mystic-100 transition-all text-earth-900 placeholder-earth-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password" id="password" name="password" required placeholder="At least 6 characters"
            className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:border-mystic-400 focus:ring-2 focus:ring-mystic-100 transition-all text-earth-900 placeholder-earth-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-700 mb-2" htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password" id="confirmPassword" name="confirmPassword" required placeholder="Repeat your password"
            className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:border-mystic-400 focus:ring-2 focus:ring-mystic-100 transition-all text-earth-900 placeholder-earth-300"
          />
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-sm">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 text-white rounded-xl font-medium hover:from-mystic-700 hover:to-mystic-600 transition-all shadow-lg shadow-mystic-500/20 text-sm disabled:opacity-60"
        >
          {status === 'loading' ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-earth-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-earth-400">or</span>
        </div>
      </div>

      <button
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-3 py-3 border border-earth-200 rounded-xl text-sm font-medium text-earth-700 hover:bg-earth-50 transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      <p className="text-center text-sm text-earth-500">
        Already have an account?{' '}
        <Link href="/login" className="text-mystic-600 font-medium hover:text-mystic-700">Sign in</Link>
      </p>
    </div>
  );
}
