const fallbackUrl = 'http://localhost:3000';

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const rawUrl = configuredUrl ?? (vercelUrl ? `https://${vercelUrl}` : fallbackUrl);

  return rawUrl.replace(/\/$/, '');
}
