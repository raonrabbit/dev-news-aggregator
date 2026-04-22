'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Article } from '@/lib/db';
import BookmarkButton from './BookmarkButton';

interface Props {
  articles: Article[];
  page: number;
  pageSize: number;
}

export default function ArticleList({ articles, page, pageSize }: Props) {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/bookmarks?ids=true')
      .then((res) => (res.ok ? (res.json() as Promise<{ ids: string[] }>) : { ids: [] }))
      .then(({ ids }) => setBookmarkedIds(new Set(ids)))
      .catch(() => {});
  }, []);
  if (articles.length === 0 && page === 0) {
    return (
      <p className="text-center py-16 text-zinc-500">
        아직 수집된 기사가 없습니다.
      </p>
    );
  }

  return (
    <div>
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
            <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span>{article.source}</span>
              {article.published_at && (
                <span>{new Date(article.published_at).toLocaleDateString('ko-KR')}</span>
              )}
              <BookmarkButton articleId={article.id} initialBookmarked={bookmarkedIds.has(article.id)} />
            </div>
          </li>
        ))}
      </ul>

      {(articles.length === pageSize || page > 0) && (
        <div className="flex gap-3 mt-6 justify-center text-sm">
          {page > 0 && (
            <Link
              href={`/articles?page=${page - 1}`}
              className="px-4 py-2 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              이전
            </Link>
          )}
          {articles.length === pageSize && (
            <Link
              href={`/articles?page=${page + 1}`}
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
