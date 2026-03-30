import { supabaseAdmin } from '@/lib/supabase/admin';

export default async function AdminCommunityPage() {
  // Stats
  const [
    { count: postCount },
    { count: commentCount },
    { data: pinnedPosts },
  ] = await Promise.all([
    supabaseAdmin.from('community_posts').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('community_comments').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('community_posts').select('id').eq('is_pinned', true),
  ]);

  // Recent posts with author info
  const { data: posts } = await supabaseAdmin
    .from('community_posts')
    .select(`
      *,
      profiles!user_id(display_name)
    `)
    .order('created_at', { ascending: false })
    .limit(50);

  // Comment counts per post
  const postIds = (posts ?? []).map((p: any) => p.id);
  const { data: commentCounts } = postIds.length > 0
    ? await supabaseAdmin
        .from('community_comments')
        .select('post_id')
        .in('post_id', postIds)
    : { data: [] };

  const commentCountMap: Record<string, number> = {};
  (commentCounts ?? []).forEach((c: any) => {
    commentCountMap[c.post_id] = (commentCountMap[c.post_id] || 0) + 1;
  });

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-earth-900 mb-8">Community</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl border border-earth-100 p-6">
          <p className="text-sm text-earth-500 mb-1">Total Posts</p>
          <p className="text-3xl font-bold text-earth-900">{postCount ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-earth-100 p-6">
          <p className="text-sm text-earth-500 mb-1">Total Comments</p>
          <p className="text-3xl font-bold text-earth-900">{commentCount ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-earth-100 p-6">
          <p className="text-sm text-earth-500 mb-1">Pinned Posts</p>
          <p className="text-3xl font-bold text-earth-900">{pinnedPosts?.length ?? 0}</p>
        </div>
      </div>

      {/* Posts table */}
      <div className="bg-white rounded-xl border border-earth-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-earth-100">
          <h2 className="font-semibold text-earth-900">Recent Posts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-earth-100 text-left">
                <th className="px-6 py-3 text-earth-500 font-medium">Title</th>
                <th className="px-6 py-3 text-earth-500 font-medium">Author</th>
                <th className="px-6 py-3 text-earth-500 font-medium">Category</th>
                <th className="px-6 py-3 text-earth-500 font-medium text-center">Comments</th>
                <th className="px-6 py-3 text-earth-500 font-medium text-center">Pinned</th>
                <th className="px-6 py-3 text-earth-500 font-medium text-center">Locked</th>
                <th className="px-6 py-3 text-earth-500 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {(posts ?? []).map((post: any) => {
                const profile = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles;
                return (
                  <tr key={post.id} className="border-b border-earth-50 hover:bg-earth-50">
                    <td className="px-6 py-3">
                      <a
                        href={`/community/${post.id}`}
                        className="text-earth-900 font-medium hover:text-mystic-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.title}
                      </a>
                    </td>
                    <td className="px-6 py-3 text-earth-600">
                      {profile?.display_name ?? 'Anonymous'}
                    </td>
                    <td className="px-6 py-3 text-earth-500">{post.category ?? '—'}</td>
                    <td className="px-6 py-3 text-earth-600 text-center">
                      {commentCountMap[post.id] ?? 0}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {post.is_pinned ? (
                        <span className="text-gold-500">Yes</span>
                      ) : (
                        <span className="text-earth-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {post.is_locked ? (
                        <span className="text-red-500">Yes</span>
                      ) : (
                        <span className="text-earth-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-earth-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
              {(posts ?? []).length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-earth-400">
                    No community posts yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
