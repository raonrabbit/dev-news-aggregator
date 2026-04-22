import { getRecentArticles, getSubscribers } from '../lib/db';
import { sendDailyDigest } from '../lib/email';

async function main() {
  const lookbackHours = parseInt(process.env.DIGEST_LOOKBACK_HOURS ?? '24', 10);
  console.log(`[send-digest] lookback: ${lookbackHours}h`);

  const articles = await getRecentArticles(lookbackHours);
  console.log(`[send-digest] ${articles.length} articles in window`);

  if (articles.length === 0) {
    console.log('[send-digest] nothing to send');
    return;
  }

  const items = articles.map((a) => ({ title: a.title, url: a.url }));

  const subscribers = await getSubscribers();
  console.log(`[send-digest] ${subscribers.length} subscribers`);

  const results = await Promise.allSettled(
    subscribers.map(({ email }) => sendDailyDigest({ to: email, items }))
  );

  let succeeded = 0;
  let failed = 0;
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      succeeded++;
    } else {
      failed++;
      console.error(`[send-digest] failed for ${subscribers[i].email}: ${r.reason}`);
    }
  });

  console.log(`[send-digest] done — ${succeeded} sent, ${failed} failed`);
}

main().catch((err) => {
  console.error('[send-digest] fatal error:', err);
  process.exit(1);
});
