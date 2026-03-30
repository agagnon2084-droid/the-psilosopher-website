import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/admin';

async function authorize() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isAdmin(user.email)) return null;
  return user;
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authorize())) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  const { id } = await params;
  const body = await request.json();
  const { data, error } = await supabaseAdmin.from('courses').update(body).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authorize())) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  const { id } = await params;
  const { error } = await supabaseAdmin.from('courses').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
