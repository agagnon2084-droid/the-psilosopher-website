import { supabaseAdmin } from '@/lib/supabase/admin';

export default async function AdminOverviewPage() {
  const [
    { count: userCount },
    { count: subCount },
    { count: courseCount },
    { count: workbookCount },
  ] = await Promise.all([
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('subscriptions').select('*', { count: 'exact', head: true }).in('status', ['active', 'trialing']),
    supabaseAdmin.from('courses').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabaseAdmin.from('workbooks').select('*', { count: 'exact', head: true }).eq('is_published', true),
  ]);

  const stats = [
    { label: 'Total Users', value: userCount ?? 0, color: 'text-mystic-600' },
    { label: 'Active Subscribers', value: subCount ?? 0, color: 'text-forest-600' },
    { label: 'Published Courses', value: courseCount ?? 0, color: 'text-gold-600' },
    { label: 'Published Workbooks', value: workbookCount ?? 0, color: 'text-earth-600' },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-earth-900 mb-8">Admin Overview</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 border border-earth-100 shadow-sm">
            <p className="text-earth-500 text-sm mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
