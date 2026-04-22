import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { getBookmarksForUser, PAGE_SIZE } from '@/lib/db';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BookmarksPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const params = await searchParams;
  const page = Math.max(0, parseInt(params.page ?? '0', 10));

  let articles;
  try {
    articles = await getBookmarksForUser(user.id, page);
  } catch {
    return (
      <div className="text-center py-16 text-red-500">
        북마크를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (articles.length === 0 && page === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-zinc-500 mb-4">저장된 북마크가 없습니다.</p>
        <Link href="/articles" className="text-sm underline">기사 보러 가기</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">내 북마크</h1>
      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {articles.map((article) => (
          <li key={article.id} className="py-4">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium hover:underline text-zinc-900 dark:text-zinc-100"
            >
              {article.title}
            </a>
            <div className="mt-1 flex gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span>{article.source}</span>
              {article.published_at && (
                <span>{new Date(article.published_at).toLocaleDateString('ko-KR')}</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {(articles.length === PAGE_SIZE || page > 0) && (
        <div className="flex gap-3 mt-6 justify-center text-sm">
          {page > 0 && (
            <Link
              href={`/bookmarks?page=${page - 1}`}
              className="px-4 py-2 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              이전
            </Link>
          )}
          {articles.length === PAGE_SIZE && (
            <Link
              href={`/bookmarks?page=${page + 1}`}
              className="px-4 py-2 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              다음
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
