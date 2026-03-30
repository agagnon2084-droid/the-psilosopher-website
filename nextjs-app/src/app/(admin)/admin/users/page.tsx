import { supabaseAdmin } from '@/lib/supabase/admin';

interface UserRow {
  id: string;
  email: string;
  created_at: string;
  display_name: string | null;
  tier_name: string | null;
  sub_status: string | null;
}

export default async function AdminUsersPage() {
  // Get all users from auth
  const { data: { users } } = await supabaseAdmin.auth.admin.listUsers({ perPage: 500 });

  // Get profiles
  const { data: profiles } = await supabaseAdmin
    .from('profiles')
    .select('id, display_name');

  // Get active subscriptions with tier names
  const { data: subs } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id, status, membership_tiers(name)')
    .in('status', ['active', 'trialing', 'past_due']);

  const profileMap = new Map((profiles ?? []).map((p: { id: string; display_name: string | null }) => [p.id, p.display_name]));
  const subMap = new Map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (subs ?? []).map((s: any) => [
      s.user_id,
      { status: s.status, tier: s.membership_tiers?.name ?? null },
    ])
  );

  const userRows: UserRow[] = (users ?? []).map((u) => ({
    id: u.id,
    email: u.email ?? '',
    created_at: u.created_at,
    display_name: profileMap.get(u.id) ?? null,
    tier_name: subMap.get(u.id)?.tier ?? 'Free',
    sub_status: subMap.get(u.id)?.status ?? null,
  }));

  const statusColors: Record<string, string> = {
    active: 'bg-forest-100 text-forest-700',
    trialing: 'bg-mystic-100 text-mystic-700',
    past_due: 'bg-gold-100 text-gold-700',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-earth-900">Users</h1>
        <span className="text-sm text-earth-500">{userRows.length} total</span>
      </div>

      <div className="bg-white rounded-xl border border-earth-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-earth-100 bg-earth-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">User</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Tier</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-earth-500 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-earth-50">
            {userRows.map((u) => (
              <tr key={u.id} className="hover:bg-earth-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-earth-900">{u.display_name || u.email}</div>
                  {u.display_name && <div className="text-xs text-earth-400">{u.email}</div>}
                </td>
                <td className="px-6 py-4 text-sm text-earth-600">{u.tier_name}</td>
                <td className="px-6 py-4">
                  {u.sub_status ? (
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[u.sub_status] || 'bg-earth-100 text-earth-500'}`}>
                      {u.sub_status.charAt(0).toUpperCase() + u.sub_status.slice(1)}
                    </span>
                  ) : (
                    <span className="text-xs text-earth-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-earth-500">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
