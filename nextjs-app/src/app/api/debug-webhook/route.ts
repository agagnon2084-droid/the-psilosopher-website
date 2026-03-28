import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const priceId = 'price_1TG3yl5pbKqpMaZK06dcKUtY';

  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const keyLength = process.env.SUPABASE_SERVICE_ROLE_KEY?.length ?? 0;
  const keyStart = process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10) ?? 'NOT SET';
  const keyEnd = process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-10) ?? 'NOT SET';
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'NOT SET';

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
    keyLength,
    keyStart,
    keyEnd,
    supabaseUrl,
    priceId,
    tier,
    tierError,
    allTiers,
    allTiersError,
  });
}
