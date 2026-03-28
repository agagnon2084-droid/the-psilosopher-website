import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const priceId = 'price_1TG3yl5pbKqpMaZK06dcKUtY';

  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const keyPrefix = process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20) ?? 'NOT SET';

  const { data: tier, error: tierError } = await supabaseAdmin
    .from('membership_tiers')
    .select('id, slug')
    .or(`stripe_price_id_monthly.eq.${priceId},stripe_price_id_yearly.eq.${priceId}`)
    .single();

  const { data: allTiers, error: allTiersError } = await supabaseAdmin
    .from('membership_tiers')
    .select('id, slug, stripe_price_id_monthly, stripe_price_id_yearly');

  return NextResponse.json({
    hasServiceKey,
    keyPrefix,
    priceId,
    tier,
    tierError,
    allTiers,
    allTiersError,
  });
}
