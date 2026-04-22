import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dev News',
  description: '한국 개발 뉴스 수집',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg">Dev News</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/articles" className="hover:underline">기사</Link>
              <Link href="/bookmarks" className="hover:underline">북마크</Link>
              <Link href="/login" className="hover:underline">로그인</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
