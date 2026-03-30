import { createClient } from '@/lib/supabase/server';

/**
 * Get the user's tier sort_order (0 = free/no subscription).
 */
export async function getUserTierLevel(userId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('subscriptions')
    .select('membership_tiers(sort_order)')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!data?.membership_tiers) return 0;
  const tier = data.membership_tiers as unknown as { sort_order: number };
  return tier.sort_order;
}

/**
 * Check if a user can access content gated to a specific tier.
 * If tier_id is null, the content is free (accessible to all authenticated users).
 */
export async function canAccessTier(
  userId: string,
  tierId: string | null
): Promise<boolean> {
  if (!tierId) return true; // free content

  const supabase = await createClient();

  // Get the required tier's sort_order
  const { data: requiredTier } = await supabase
    .from('membership_tiers')
    .select('sort_order')
    .eq('id', tierId)
    .single();

  if (!requiredTier) return false;

  const userLevel = await getUserTierLevel(userId);
  return userLevel >= requiredTier.sort_order;
}
