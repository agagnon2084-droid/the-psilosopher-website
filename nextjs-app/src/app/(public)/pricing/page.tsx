import type { Metadata } from 'next';
import ParticleEffect from '@/components/ParticleEffect';
import ScrollFadeIn from '@/components/ScrollFadeIn';
import PricingToggle from '@/components/PricingToggle';
import { createClient } from '@/lib/supabase/server';
import type { MembershipTier } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Pricing | The Psilosopher',
  description: 'Choose your membership tier. Access courses, workbooks, community, and live sessions.',
};

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: tiers } = await supabase
    .from('membership_tiers')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-forest-900 to-mystic-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 60% 30%, rgba(110, 45, 163, 0.5) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(45, 122, 45, 0.4) 0%, transparent 50%)' }} />
        <ParticleEffect />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm mb-6">Membership</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-mystic-300">Path</span>
          </h1>
          <p className="text-earth-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Honest education, practical tools, and a community that takes this work seriously.</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6">
        <ScrollFadeIn>
          <PricingToggle tiers={(tiers as MembershipTier[]) || []} />
        </ScrollFadeIn>
      </section>
    </>
  );
}
