import type { MetadataRoute } from 'next';

const BASE_URL = 'https://kubusklus.nl';

const routes = [
  '',
  '/diensten',
  '/projecten',
  '/werkwijze',
  '/faq',
  '/over-ons',
  '/contact',
  '/offerte',
  '/privacy',
];

const locales = ['nl', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    }
  }

  return entries;
}
