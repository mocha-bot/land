import type { NextApiRequest, NextApiResponse } from 'next';

import { buildCanonical } from '@/config/seo';
import { searchRoom } from '@/modules/room/roomService';

type StaticEntry = {
  path: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
};

const LAST_MODIFIED = '2026-06-18';

const STATIC_ENTRIES: StaticEntry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0', lastmod: LAST_MODIFIED },
  {
    path: '/donut',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/pricing',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/search',
    changefreq: 'daily',
    priority: '0.8',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/solutions',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/solutions/gaming',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/solutions/study-groups',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/solutions/open-source',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/solutions/creator-networks',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/solutions/regional-communities',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/solutions/events',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/solutions/developer-communities',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/solutions/fan-clubs',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/solutions/dao-web3',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/solutions/professional-networks',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/privacy-policy',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/terms-of-service',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/refund-policy',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: LAST_MODIFIED,
  },
  {
    path: '/eula',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: LAST_MODIFIED,
  },
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
  lastmod?: string,
): string => {
  const loc = escapeXml(buildCanonical(path, 'en'));
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
  return `\n  <url>\n    <loc>${loc}</loc>${lastmodTag}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
};

const ROOM_FETCH_TIMEOUT_MS = 8000;

const fetchAllRoomSlugs = async (): Promise<string[]> => {
  const slugs: string[] = [];
  let page = 1;
  let lastPage = 1;
  const deadline = Date.now() + ROOM_FETCH_TIMEOUT_MS;
  try {
    do {
      if (Date.now() >= deadline) {
        break;
      }
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
      renderUrl(entry.path, entry.changefreq, entry.priority, entry.lastmod),
    );

    const roomUrls = roomSlugs.map((slug) =>
      renderUrl(`/room/${slug}`, 'weekly', '0.6'),
    );

    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls.join(
      '',
    )}${roomUrls.join('')}\n</urlset>`;

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
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${STATIC_ENTRIES.map(
      (entry) =>
        renderUrl(entry.path, entry.changefreq, entry.priority, entry.lastmod),
    ).join('')}\n</urlset>`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(fallback);
  }
}
