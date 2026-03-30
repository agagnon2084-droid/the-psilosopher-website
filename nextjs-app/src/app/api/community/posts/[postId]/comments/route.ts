import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserTierLevel } from '@/lib/access';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const tier = await getUserTierLevel(user.id);
  if (tier < 1) return NextResponse.json({ error: 'Essentials+ required' }, { status: 403 });

  const { data: comments, error } = await supabase
    .from('community_comments')
    .select(`
      *,
      profiles!user_id(display_name, avatar_url),
      community_likes(count)
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const commentIds = (comments ?? []).map((c: any) => c.id);
  const { data: userLikes } = commentIds.length > 0
    ? await supabase.from('community_likes').select('comment_id').eq('user_id', user.id).in('comment_id', commentIds)
    : { data: [] };

  const likedIds = new Set((userLikes ?? []).map((l: any) => l.comment_id));

  const enriched = (comments ?? []).map((c: any) => ({
    ...c,
    profile: Array.isArray(c.profiles) ? c.profiles[0] : c.profiles,
    like_count: Array.isArray(c.community_likes) ? c.community_likes[0]?.count ?? 0 : 0,
    user_has_liked: likedIds.has(c.id),
    profiles: undefined,
    community_likes: undefined,
  }));

  return NextResponse.json(enriched);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const tier = await getUserTierLevel(user.id);
  if (tier < 1) return NextResponse.json({ error: 'Essentials+ required' }, { status: 403 });

  // Check if post is locked
  const { data: post } = await supabase
    .from('community_posts')
    .select('is_locked')
    .eq('id', postId)
    .single();

  if (post?.is_locked) {
    return NextResponse.json({ error: 'This thread is locked' }, { status: 403 });
  }

  const body = await request.json();
  if (!body.body?.trim()) {
    return NextResponse.json({ error: 'Comment body is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('community_comments')
    .insert({
      post_id: postId,
      user_id: user.id,
      body: body.body.trim(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
