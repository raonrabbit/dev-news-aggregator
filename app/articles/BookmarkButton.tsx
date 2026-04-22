'use client';

import { useState, useEffect } from 'react';

interface Props {
  articleId: string;
  initialBookmarked?: boolean;
}

export default function BookmarkButton({ articleId, initialBookmarked = false }: Props) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  async function toggle() {
    setLoading(true);
    try {
      const method = bookmarked ? 'DELETE' : 'POST';
      const res = await fetch('/api/bookmarks', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId }),
      });

      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }

      if (res.ok) setBookmarked((prev) => !prev);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={bookmarked ? '북마크 해제' : '북마크 추가'}
      className={`text-xs px-2 py-1 rounded border transition-colors ${
        bookmarked
          ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
          : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
      } disabled:opacity-50`}
    >
      {bookmarked ? '★ 저장됨' : '☆ 저장'}
    </button>
  );
}
