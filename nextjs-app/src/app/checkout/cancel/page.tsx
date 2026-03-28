import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Checkout Canceled | The Psilosopher',
};

export default function CheckoutCancelPage() {
  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-forest-900 to-mystic-900" />
        <div className="relative z-10" />
      </section>

      <section className="py-24 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-earth-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-earth-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-bold mb-4">No pressure.</h1>
          <p className="text-earth-600 mb-10">You can come back anytime. The work will be here when you&apos;re ready.</p>
          <Link
            href="/pricing"
            className="inline-block px-8 py-4 border border-earth-300 text-earth-700 rounded-xl font-medium hover:bg-earth-50 transition-colors text-sm"
          >
            Back to Pricing
          </Link>
        </div>
      </section>
    </>
  );
}
