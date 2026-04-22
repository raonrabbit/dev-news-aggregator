import { getArticles, PAGE_SIZE } from '@/lib/db';
import ArticleList from './ArticleList';

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function ArticlesPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(0, parseInt(params.page ?? '0', 10));

  let articles;
  try {
    articles = await getArticles(page);
  } catch {
    return (
      <div className="text-center py-16 text-red-500">
        기사를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">최신 개발 뉴스</h1>
      <ArticleList articles={articles} page={page} pageSize={PAGE_SIZE} />
    </div>
  );
}
