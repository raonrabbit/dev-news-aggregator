-- ============================================================
-- Dev News Aggregator - Database Schema
-- Run this in the Supabase SQL editor to initialize the DB.
-- ============================================================

-- articles
create table if not exists public.articles (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  url         text unique not null,
  source      text not null,
  published_at timestamptz,
  created_at  timestamptz default now()
);

create index if not exists articles_published_at_idx on public.articles (published_at desc);
create index if not exists articles_created_at_idx   on public.articles (created_at  desc);

-- bookmarks
create table if not exists public.bookmarks (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade not null,
  article_id uuid references public.articles(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique (user_id, article_id)
);

create index if not exists bookmarks_user_id_idx on public.bookmarks (user_id);

-- subscriptions
create table if not exists public.subscriptions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade not null unique,
  email      text not null,
  enabled    boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- RLS
-- ============================================================

alter table public.articles      enable row level security;
alter table public.bookmarks     enable row level security;
alter table public.subscriptions enable row level security;

-- articles: anyone can read
create policy "articles_public_read" on public.articles
  for select using (true);

-- articles: service role writes (scripts use service key, bypasses RLS)
-- No insert policy needed for anon; scripts run with service role key.

-- bookmarks: owner only
create policy "bookmarks_owner_select" on public.bookmarks
  for select using (auth.uid() = user_id);

create policy "bookmarks_owner_insert" on public.bookmarks
  for insert with check (auth.uid() = user_id);

create policy "bookmarks_owner_delete" on public.bookmarks
  for delete using (auth.uid() = user_id);

-- subscriptions: owner only
create policy "subscriptions_owner_all" on public.subscriptions
  for all using (auth.uid() = user_id);
