import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'DevNewsAggregator/1.0' },
});

export interface RssArticle {
  title: string;
  url: string;
  source: string;
  published_at: string | null;
}

const FEEDS: { url: string; source: string }[] = [
  { url: 'https://d2.naver.com/d2.atom', source: 'NAVER D2' },
  { url: 'https://engineering.kakaopay.com/feed', source: 'KakaoPay Engineering' },
  { url: 'https://techblog.woowahan.com/feed', source: '우아한형제들 기술블로그' },
  { url: 'https://tech.kakao.com/feed/', source: 'Kakao Tech' },
  { url: 'https://engineering.linecorp.com/ko/feed/index.xml', source: 'LINE Engineering' },
  { url: 'https://medium.com/feed/daangn', source: '당근마켓 Medium' },
  { url: 'https://toss.tech/rss.xml', source: 'Toss Tech' },
  { url: 'https://dev.gmarket.com/feed', source: 'Gmarket Dev' },
  { url: 'https://blog.coupang.engineering/ko/feed/', source: 'Coupang Engineering' },
];

function normalizeDate(raw: string | undefined): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

async function fetchFeed(
  feedUrl: string,
  source: string
): Promise<RssArticle[]> {
  const feed = await parser.parseURL(feedUrl);
  return (feed.items ?? [])
    .filter((item) => item.link && item.title)
    .map((item) => ({
      title: (item.title ?? '').trim(),
      url: item.link!.trim(),
      source,
      published_at: normalizeDate(item.pubDate ?? item.isoDate),
    }));
}

export async function fetchAllFeeds(): Promise<RssArticle[]> {
  const results = await Promise.allSettled(
    FEEDS.map(({ url, source }) => fetchFeed(url, source))
  );

  const articles: RssArticle[] = [];
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
    } else {
      console.error(`[rss] fetch failed: ${FEEDS[i].source} — ${result.reason}`);
    }
  });

  return articles;
}
