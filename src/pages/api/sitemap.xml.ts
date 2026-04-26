import type { NextApiRequest, NextApiResponse } from 'next';

import { buildCanonical, buildLanguageAlternates } from '@/config/seo';
import { searchRoom } from '@/modules/room/roomService';

type StaticEntry = {
  path: string;
  changefreq: string;
  priority: string;
};

const STATIC_ENTRIES: StaticEntry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/search', changefreq: 'daily', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
  { path: '/refund-policy', changefreq: 'yearly', priority: '0.3' },
];

const MAX_SITEMAP_PAGES = 50;
const PAGE_SIZE = 100;

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');

const renderUrl = (
  path: string,
  changefreq: string,
  priority: string,
): string => {
  const loc = escapeXml(buildCanonical(path, 'en'));
  const alternates = buildLanguageAlternates(path)
    .map(
      (alt) =>
        `<xhtml:link rel="alternate" hreflang="${alt.hrefLang}" href="${escapeXml(
          alt.href,
        )}"/>`,
    )
    .join('');
  return `<url><loc>${loc}</loc>${alternates}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
};

const fetchAllRoomSlugs = async (): Promise<string[]> => {
  const slugs: string[] = [];
  let page = 1;
  let lastPage = 1;
  try {
    do {
      // eslint-disable-next-line no-await-in-loop
      const result = await searchRoom({
        page,
        limit: PAGE_SIZE,
      });
      result.rooms.forEach((room) => {
        if (room.slug) {
          slugs.push(room.slug);
        }
      });
      lastPage = result.pagination?.last ?? page;
      page += 1;
      if (page > MAX_SITEMAP_PAGES) {
        break;
      }
    } while (page <= lastPage);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[sitemap] failed to enumerate rooms', err);
  }
  return slugs;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const roomSlugs = await fetchAllRoomSlugs();

    const staticUrls = STATIC_ENTRIES.map((entry) =>
      renderUrl(entry.path, entry.changefreq, entry.priority),
    );

    const roomUrls = roomSlugs.map((slug) =>
      renderUrl(`/room/${slug}`, 'weekly', '0.6'),
    );

    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${staticUrls.join('')}${roomUrls.join('')}</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    res.status(200).send(body);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[sitemap] fatal error', err);
    // Emit the static fallback so crawlers aren't served a 500.
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${STATIC_ENTRIES.map(
      (entry) => renderUrl(entry.path, entry.changefreq, entry.priority),
    ).join('')}</urlset>`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(fallback);
  }
}
