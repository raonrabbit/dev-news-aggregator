import { fetchAllFeeds } from '../lib/rss';
import { upsertArticles } from '../lib/db';

async function main() {
  console.log('[fetch-rss] starting');

  const articles = await fetchAllFeeds();
  console.log(`[fetch-rss] fetched ${articles.length} articles`);

  if (articles.length === 0) {
    console.log('[fetch-rss] no articles to save');
    return;
  }

  await upsertArticles(articles);
  console.log('[fetch-rss] saved (duplicates ignored by url unique constraint)');
}

main().catch((err) => {
  console.error('[fetch-rss] fatal error:', err);
  process.exit(1);
});
