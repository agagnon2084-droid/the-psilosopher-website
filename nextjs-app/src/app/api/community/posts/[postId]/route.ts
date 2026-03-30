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

  const { data: post, error } = await supabase
    .from('community_posts')
    .select(`
      *,
      profiles!user_id(display_name, avatar_url),
      community_comments(count),
      community_likes(count)
    `)
    .eq('id', postId)
    .single();

  if (error || !post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  const { data: userLike } = await supabase
    .from('community_likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('post_id', postId)
    .maybeSingle();

  const enriched = {
    ...post,
    profile: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles,
    comment_count: Array.isArray(post.community_comments) ? post.community_comments[0]?.count ?? 0 : 0,
    like_count: Array.isArray(post.community_likes) ? post.community_likes[0]?.count ?? 0 : 0,
    user_has_liked: !!userLike,
    profiles: undefined,
    community_comments: undefined,
    community_likes: undefined,
  };

  return NextResponse.json(enriched);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const tier = await getUserTierLevel(user.id);
  if (tier < 1) return NextResponse.json({ error: 'Essentials+ required' }, { status: 403 });

  const body = await request.json();
  const { data, error } = await supabase
    .from('community_posts')
    .update({ title: body.title, body: body.body })
    .eq('id', postId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const tier = await getUserTierLevel(user.id);
  if (tier < 1) return NextResponse.json({ error: 'Essentials+ required' }, { status: 403 });

  const { error } = await supabase
    .from('community_posts')
    .delete()
    .eq('id', postId)
    .eq('user_id', user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
