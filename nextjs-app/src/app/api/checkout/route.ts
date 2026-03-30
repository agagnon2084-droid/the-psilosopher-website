import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { priceId } = await request.json();

  if (!priceId) {
    return NextResponse.json({ error: 'Price ID required' }, { status: 400 });
  }

  // Check for existing Stripe customer and whether they've had a prior subscription
  const { data: existingSub } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .not('stripe_customer_id', 'is', null)
    .limit(1)
    .maybeSingle();

  let customerId = existingSub?.stripe_customer_id;

  // A user is trial-eligible only if they have never had a subscription record
  const { count: subCount } = await supabase
    .from('subscriptions')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const isTrialEligible = !subCount || subCount === 0;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
  }

  const origin = request.headers.get('origin') || 'https://thepsilosopher.com';

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
    subscription_data: {
      metadata: { supabase_user_id: user.id },
      ...(isTrialEligible ? { trial_period_days: 7 } : {}),
    },
    allow_promotion_codes: true,
    // Don't require a payment method upfront during a free trial
    ...(isTrialEligible ? { payment_method_collection: 'if_required' } : {}),
  });

  return NextResponse.json({ url: session.url });
}
