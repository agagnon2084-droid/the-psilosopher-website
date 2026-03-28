import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('[webhook] checkout.session.completed', { mode: session.mode, subscription: session.subscription });
      if (session.mode !== 'subscription' || !session.subscription) break;

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      const item = subscription.items.data[0];
      const priceId = item?.price.id;
      const userId = subscription.metadata.supabase_user_id;

      console.log('[webhook] userId:', userId, 'priceId:', priceId);
      if (!userId || !priceId) {
        console.error('[webhook] BREAK: missing userId or priceId', { userId, priceId });
        break;
      }

      // Find matching tier
      const { data: tier, error: tierError } = await supabaseAdmin
        .from('membership_tiers')
        .select('id')
        .or(`stripe_price_id_monthly.eq.${priceId},stripe_price_id_yearly.eq.${priceId}`)
        .single();

      console.log('[webhook] tier:', JSON.stringify(tier), 'tierError:', JSON.stringify(tierError));
      if (!tier) {
        console.error('[webhook] BREAK: tier not found', { priceId, tierError });
        break;
      }

      const { error: upsertError } = await supabaseAdmin.from('subscriptions').upsert(
        {
          user_id: userId,
          tier_id: tier.id,
          status: 'active',
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer as string,
          current_period_start: new Date(item.current_period_start * 1000).toISOString(),
          current_period_end: new Date(item.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
        },
        { onConflict: 'stripe_subscription_id' }
      );
      console.log('[webhook] upsertError:', JSON.stringify(upsertError));
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      const subItem = subscription.items.data[0];
      const priceId = subItem?.price.id;

      // Find matching tier for potential plan change
      const { data: tier } = await supabaseAdmin
        .from('membership_tiers')
        .select('id')
        .or(`stripe_price_id_monthly.eq.${priceId},stripe_price_id_yearly.eq.${priceId}`)
        .maybeSingle();

      const updateData: Record<string, unknown> = {
        status: subscription.status,
        cancel_at_period_end: subscription.cancel_at_period_end,
        current_period_start: subItem ? new Date(subItem.current_period_start * 1000).toISOString() : null,
        current_period_end: subItem ? new Date(subItem.current_period_end * 1000).toISOString() : null,
      };

      if (tier) {
        updateData.tier_id = tier.id;
      }

      await supabaseAdmin
        .from('subscriptions')
        .update(updateData)
        .eq('stripe_subscription_id', subscription.id);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      await supabaseAdmin
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      const subDetails = invoice.parent?.subscription_details;
      if (subDetails?.subscription) {
        await supabaseAdmin
          .from('subscriptions')
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', subDetails.subscription as string);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
