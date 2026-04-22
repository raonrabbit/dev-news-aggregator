import { createClient } from '@supabase/supabase-js';

export const PAGE_SIZE = 20;

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

function serviceClient() {
  return createClient(
    requireEnv('SUPABASE_PROJECT_URL'),
    requireEnv('SUPABASE_SERVICE_ROLE_KEY')
  );
}

export interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  published_at: string | null;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  article_id: string;
  created_at: string;
}

export async function getArticles(page = 0): Promise<Article[]> {
  const db = serviceClient();
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await db
    .from('articles')
    .select('id, title, url, source, published_at, created_at')
    .order('published_at', { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data ?? [];
}

export async function getRecentArticles(lookbackHours = 24): Promise<Article[]> {
  const db = serviceClient();
  const since = new Date(Date.now() - lookbackHours * 60 * 60 * 1000).toISOString();

  const { data, error } = await db
    .from('articles')
    .select('id, title, url, source, published_at, created_at')
    .gte('created_at', since)
    .order('published_at', { ascending: false })
    .limit(PAGE_SIZE * 5);

  if (error) throw error;
  return data ?? [];
}

export async function upsertArticles(
  articles: Omit<Article, 'id' | 'created_at'>[]
): Promise<void> {
  const db = serviceClient();
  const { error } = await db
    .from('articles')
    .upsert(articles, { onConflict: 'url', ignoreDuplicates: true });

  if (error) throw error;
}

export async function getBookmarkIdsForUser(userId: string): Promise<string[]> {
  const db = serviceClient();
  const { data, error } = await db
    .from('bookmarks')
    .select('article_id')
    .eq('user_id', userId);

  if (error) throw error;
  return (data ?? []).map((row) => row.article_id);
}

export async function getBookmarksForUser(userId: string, page = 0): Promise<Article[]> {
  const db = serviceClient();
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await db
    .from('bookmarks')
    .select('article_id, articles!inner(id, title, url, source, published_at, created_at)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;
  return (data ?? []).map((row) => (row as unknown as { articles: Article }).articles);
}

export async function addBookmark(userId: string, articleId: string): Promise<void> {
  const db = serviceClient();
  const { error } = await db
    .from('bookmarks')
    .insert({ user_id: userId, article_id: articleId });

  if (error && error.code !== '23505') throw error;
}

export async function removeBookmark(userId: string, articleId: string): Promise<void> {
  const db = serviceClient();
  const { error } = await db
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('article_id', articleId);

  if (error) throw error;
}

export async function getSubscribers(): Promise<{ email: string }[]> {
  const db = serviceClient();
  const { data, error } = await db
    .from('subscriptions')
    .select('email')
    .eq('enabled', true)
    .limit(1000);

  if (error) throw error;
  return data ?? [];
}

export async function upsertSubscription(userId: string, email: string): Promise<void> {
  const db = serviceClient();
  const { error } = await db
    .from('subscriptions')
    .upsert({ user_id: userId, email, enabled: true }, { onConflict: 'user_id' });

  if (error) throw error;
}
