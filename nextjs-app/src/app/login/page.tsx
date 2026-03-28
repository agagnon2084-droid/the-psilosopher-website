import type { Metadata } from 'next';
import ParticleEffect from '@/components/ParticleEffect';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In | The Psilosopher',
  description: 'Sign in to your Psilosopher account to access member content, courses, and integration tools.',
};

export default function LoginPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-mystic-900 to-forest-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 60% 30%, rgba(110, 45, 163, 0.5) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(45, 122, 45, 0.4) 0%, transparent 50%)' }} />
        <ParticleEffect />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm mb-6">Welcome Back</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            Sign <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-mystic-300">In</span>
          </h1>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 px-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-earth-100">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
