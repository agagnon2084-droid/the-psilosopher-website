import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ManageSubscriptionButton from '@/components/ManageSubscriptionButton';

export const metadata: Metadata = {
  title: 'Dashboard | The Psilosopher',
  description: 'Manage your membership and access your content.',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*, membership_tiers(*)')
    .eq('user_id', user!.id)
    .in('status', ['active', 'trialing', 'past_due'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const tier = subscription?.membership_tiers;

  const statusColors: Record<string, string> = {
    active: 'bg-forest-100 text-forest-700',
    trialing: 'bg-mystic-100 text-mystic-700',
    past_due: 'bg-gold-100 text-gold-700',
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-forest-900 to-mystic-900" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm mb-4">Dashboard</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Your Membership</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-earth-100">
            {subscription && tier ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-earth-900">{tier.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[subscription.status] || 'bg-earth-100 text-earth-600'}`}>
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1).replace('_', ' ')}
                  </span>
                </div>

                <p className="text-earth-600 text-sm">{tier.description}</p>

                <ul className="space-y-2">
                  {tier.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-earth-700">
                      <svg className="w-4 h-4 text-forest-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {subscription.current_period_end && (
                  <p className="text-earth-400 text-sm">
                    {subscription.cancel_at_period_end
                      ? `Your subscription ends on ${new Date(subscription.current_period_end).toLocaleDateString()}`
                      : `Renews on ${new Date(subscription.current_period_end).toLocaleDateString()}`}
                  </p>
                )}

                {subscription.cancel_at_period_end && (
                  <div className="bg-gold-50 border border-gold-200 rounded-xl p-4">
                    <p className="text-gold-800 text-sm">Your subscription has been canceled and will end at the current period.</p>
                  </div>
                )}

                <ManageSubscriptionButton />
              </div>
            ) : (
              <div className="text-center py-8">
                <h2 className="font-serif text-2xl font-bold text-earth-900 mb-3">Free Tier</h2>
                <p className="text-earth-600 mb-8">You have access to blog posts and the newsletter. Upgrade to unlock courses, workbooks, and the community.</p>
                <Link
                  href="/pricing"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 text-white rounded-xl font-medium hover:from-mystic-700 hover:to-mystic-600 transition-all shadow-lg shadow-mystic-500/20 text-sm"
                >
                  Upgrade Membership
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
