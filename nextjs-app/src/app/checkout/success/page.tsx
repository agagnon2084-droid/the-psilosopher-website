import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Welcome | The Psilosopher',
  description: 'Your membership is active.',
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-forest-900 to-mystic-900" />
        <div className="relative z-10" />
      </section>

      <section className="py-24 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-bold mb-4">Welcome to the journey.</h1>
          <p className="text-earth-600 mb-10">Your membership is now active. You have access to everything in your tier.</p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 text-white rounded-xl font-medium hover:from-mystic-700 hover:to-mystic-600 transition-all shadow-lg shadow-mystic-500/20 text-sm"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>
    </>
  );
}
