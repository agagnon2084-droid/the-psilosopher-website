-- ============================================================
-- The Psilosopher — Initial Database Schema
-- Run this in Supabase SQL Editor or via supabase db push
-- ============================================================

-- ── Custom Types ────────────────────────────────────────────

create type public.subscription_status as enum (
  'trialing', 'active', 'past_due', 'canceled',
  'unpaid', 'incomplete', 'incomplete_expired', 'paused'
);

-- ── Reusable updated_at trigger function ────────────────────

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── 1. Profiles ─────────────────────────────────────────────

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Authenticated users can read all profiles"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- ── 2. Membership Tiers ────────────────────────────────────

create table public.membership_tiers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price_monthly integer not null default 0,
  price_yearly integer not null default 0,
  stripe_price_id_monthly text,
  stripe_price_id_yearly text,
  features jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.membership_tiers enable row level security;

create policy "Anyone can read active tiers"
  on public.membership_tiers for select
  using (true);

create trigger membership_tiers_updated_at
  before update on public.membership_tiers
  for each row execute function public.handle_updated_at();

-- ── 3. Subscriptions ───────────────────────────────────────

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  tier_id uuid not null references public.membership_tiers(id) on delete restrict,
  status public.subscription_status not null default 'active',
  stripe_subscription_id text unique,
  stripe_customer_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "Users can read own subscriptions"
  on public.subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_subscriptions_user_status on public.subscriptions(user_id, status);
create index idx_subscriptions_stripe_sub on public.subscriptions(stripe_subscription_id);
create index idx_subscriptions_stripe_cust on public.subscriptions(stripe_customer_id);

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.handle_updated_at();

-- ── 4. Courses ─────────────────────────────────────────────

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  thumbnail_url text,
  tier_id uuid references public.membership_tiers(id) on delete set null,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Anyone can read published courses"
  on public.courses for select
  using (is_published = true);

create trigger courses_updated_at
  before update on public.courses
  for each row execute function public.handle_updated_at();

-- ── 5. Lessons ─────────────────────────────────────────────

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  slug text not null,
  description text,
  mux_playback_id text,
  mux_asset_id text,
  duration_seconds integer,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  is_free_preview boolean not null default false,
  created_at timestamptz not null default now(),
  unique (course_id, slug)
);

alter table public.lessons enable row level security;

create policy "Anyone can read published lessons of published courses"
  on public.lessons for select
  using (
    is_published = true
    and exists (
      select 1 from public.courses c
      where c.id = course_id and c.is_published = true
    )
  );

create index idx_lessons_course_order on public.lessons(course_id, sort_order);

-- ── 6. User Progress ──────────────────────────────────────

create table public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed_at timestamptz,
  last_position_seconds integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

alter table public.user_progress enable row level security;

create policy "Users can read own progress"
  on public.user_progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.user_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  to authenticated
  using (auth.uid() = user_id);

create index idx_user_progress_user on public.user_progress(user_id);

create trigger user_progress_updated_at
  before update on public.user_progress
  for each row execute function public.handle_updated_at();

-- ── 7. Workbooks ───────────────────────────────────────────

create table public.workbooks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  file_url text not null,
  thumbnail_url text,
  tier_id uuid references public.membership_tiers(id) on delete set null,
  download_count integer not null default 0,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.workbooks enable row level security;

create policy "Anyone can read published workbooks"
  on public.workbooks for select
  using (is_published = true);

-- ── 8. Community Posts ─────────────────────────────────────

create table public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  category text,
  is_pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.community_posts enable row level security;

create policy "Authenticated users can read all posts"
  on public.community_posts for select
  to authenticated
  using (true);

create policy "Users can create posts"
  on public.community_posts for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own posts"
  on public.community_posts for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete own posts"
  on public.community_posts for delete
  to authenticated
  using (auth.uid() = user_id);

create index idx_community_posts_category on public.community_posts(category);
create index idx_community_posts_created on public.community_posts(created_at desc);

create trigger community_posts_updated_at
  before update on public.community_posts
  for each row execute function public.handle_updated_at();

-- ── 9. Community Comments ──────────────────────────────────

create table public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.community_comments enable row level security;

create policy "Authenticated users can read all comments"
  on public.community_comments for select
  to authenticated
  using (true);

create policy "Users can create comments"
  on public.community_comments for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own comments"
  on public.community_comments for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete own comments"
  on public.community_comments for delete
  to authenticated
  using (auth.uid() = user_id);

create index idx_community_comments_post on public.community_comments(post_id);

-- ── Helper Function: Get User Tier Level ───────────────────

create or replace function public.get_user_tier_level(lookup_user_id uuid)
returns integer
language sql
stable
security definer
as $$
  select coalesce(
    (
      select mt.sort_order
      from public.subscriptions s
      join public.membership_tiers mt on mt.id = s.tier_id
      where s.user_id = lookup_user_id
        and s.status in ('active', 'trialing')
      order by mt.sort_order desc
      limit 1
    ),
    0
  );
$$;

-- ── Trigger: Auto-create Profile on Signup ─────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Seed Data: Membership Tiers ────────────────────────────

insert into public.membership_tiers (name, slug, description, price_monthly, price_yearly, features, sort_order)
values
  ('Free', 'free', 'Access to blog and newsletter', 0, 0,
   '["Blog access", "Weekly newsletter"]'::jsonb, 0),
  ('Essentials', 'essentials', 'Core integration tools and workbooks', 999, 7900,
   '["Everything in Free", "Downloadable workbooks", "Integration tools"]'::jsonb, 1),
  ('Premium', 'premium', 'Full video course library and community', 2499, 19900,
   '["Everything in Essentials", "Video course library", "Community forum access"]'::jsonb, 2),
  ('Pro', 'pro', 'Complete access plus live sessions', 4999, 39900,
   '["Everything in Premium", "Live group sessions", "Priority support"]'::jsonb, 3);
