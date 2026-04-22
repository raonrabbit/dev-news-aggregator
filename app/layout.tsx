import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderNav from './components/HeaderNav';
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
            <HeaderNav />
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
