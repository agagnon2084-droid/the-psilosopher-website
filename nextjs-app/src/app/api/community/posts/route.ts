import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserTierLevel } from '@/lib/access';

async function requireEssentials(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  const tier = await getUserTierLevel(user.id);
  if (tier < 1) return { user: null, error: NextResponse.json({ error: 'Essentials+ subscription required' }, { status: 403 }) };
  return { user, error: null };
}

export async function GET(request: Request) {
  const supabase = await createClient();
  const { user, error: authError } = await requireEssentials(supabase);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const lessonId = searchParams.get('lesson');
  const sort = searchParams.get('sort') ?? 'recent';
  const cursor = searchParams.get('cursor');
  const limit = 20;

  let query = supabase
    .from('community_posts')
    .select(`
      *,
      profiles!user_id(display_name, avatar_url),
      community_comments(count),
      community_likes(count)
    `)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (category) query = query.eq('category', category);
  if (lessonId) query = query.eq('lesson_id', lessonId);
  if (cursor) query = query.lt('created_at', cursor);

  const { data: posts, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Get user's likes for these posts
  const postIds = (posts ?? []).map((p: any) => p.id);
  const { data: userLikes } = postIds.length > 0
    ? await supabase.from('community_likes').select('post_id').eq('user_id', user.id).in('post_id', postIds)
    : { data: [] };

  const likedPostIds = new Set((userLikes ?? []).map((l: any) => l.post_id));

  const enriched = (posts ?? []).map((p: any) => ({
    ...p,
    profile: Array.isArray(p.profiles) ? p.profiles[0] : p.profiles,
    comment_count: Array.isArray(p.community_comments) ? p.community_comments[0]?.count ?? 0 : 0,
    like_count: Array.isArray(p.community_likes) ? p.community_likes[0]?.count ?? 0 : 0,
    user_has_liked: likedPostIds.has(p.id),
    profiles: undefined,
    community_comments: undefined,
    community_likes: undefined,
  }));

  // Sort by popular if requested (after fetch since Supabase can't sort by aggregated count)
  if (sort === 'popular') {
    enriched.sort((a: any, b: any) => b.like_count - a.like_count || new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  const nextCursor = enriched.length === limit ? enriched[enriched.length - 1].created_at : null;

  return NextResponse.json({ posts: enriched, nextCursor });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { user, error: authError } = await requireEssentials(supabase);
  if (authError) return authError;

  const body = await request.json();
  const { title, body: postBody, category, lesson_id } = body;

  if (!title?.trim() || !postBody?.trim()) {
    return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('community_posts')
    .insert({
      user_id: user.id,
      title: title.trim(),
      body: postBody.trim(),
      category: category || null,
      lesson_id: lesson_id || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
