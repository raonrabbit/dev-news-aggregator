import { Resend } from 'resend';

export interface DigestItem {
  title: string;
  url: string;
}

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

function buildHtml(items: DigestItem[]): string {
  const rows = items
    .map(
      (item) =>
        `<li style="margin-bottom:8px"><a href="${item.url}" style="color:#1d4ed8">${item.title}</a></li>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="utf-8"><title>Daily Dev News</title></head>
<body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">
  <h1 style="font-size:20px;margin-bottom:16px">Daily Dev News</h1>
  <p style="color:#6b7280;font-size:14px;margin-bottom:16px">
    오늘의 개발 뉴스 ${items.length}건입니다.
  </p>
  <ul style="padding-left:20px">${rows}</ul>
  <hr style="margin-top:24px;border:none;border-top:1px solid #e5e7eb">
  <p style="font-size:12px;color:#9ca3af;margin-top:8px">Dev News Aggregator</p>
</body>
</html>`;
}

export async function sendDailyDigest(input: {
  to: string;
  items: DigestItem[];
}): Promise<void> {
  const resend = new Resend(requireEnv('RESEND_API_KEY'));
  const from = requireEnv('RESEND_FROM_EMAIL');

  const { error } = await resend.emails.send({
    from,
    to: input.to,
    subject: `Daily Dev News — ${new Date().toLocaleDateString('ko-KR')}`,
    html: buildHtml(input.items),
  });

  if (error) throw new Error(`Resend error: ${error.message}`);
}
