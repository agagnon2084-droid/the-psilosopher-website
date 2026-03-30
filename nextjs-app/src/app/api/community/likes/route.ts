import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserTierLevel } from '@/lib/access';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const tier = await getUserTierLevel(user.id);
  if (tier < 1) return NextResponse.json({ error: 'Essentials+ required' }, { status: 403 });

  const { post_id, comment_id } = await request.json();

  if (!post_id && !comment_id) {
    return NextResponse.json({ error: 'post_id or comment_id required' }, { status: 400 });
  }

  const column = post_id ? 'post_id' : 'comment_id';
  const targetId = post_id ?? comment_id;

  // Check if already liked
  const { data: existing } = await supabase
    .from('community_likes')
    .select('id')
    .eq('user_id', user.id)
    .eq(column, targetId)
    .maybeSingle();

  if (existing) {
    await supabase.from('community_likes').delete().eq('id', existing.id);
    return NextResponse.json({ liked: false });
  }

  const insertData: Record<string, string> = { user_id: user.id };
  insertData[column] = targetId;

  const { error } = await supabase.from('community_likes').insert(insertData);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ liked: true });
}
