import { NextRequest, NextResponse } from 'next/server';
import { getArticles, PAGE_SIZE } from '@/lib/db';

export const revalidate = 60;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const page = Math.max(0, parseInt(searchParams.get('page') ?? '0', 10));

  const articles = await getArticles(page);
  return NextResponse.json({ articles, page, pageSize: PAGE_SIZE });
}
