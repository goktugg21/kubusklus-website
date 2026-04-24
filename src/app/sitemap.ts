import type { MetadataRoute } from 'next';

const BASE_URL = 'https://kubusklus.nl';
const BUILD_TIME = new Date('2026-04-24');

const ROUTES = ['', '/diensten', '/projecten', '/over-ons', '/werkwijze', '/contact', '/faq', '/offerte', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((route) => {
    const nl = `${BASE_URL}/nl${route}`;
    const en = `${BASE_URL}/en${route}`;
    const entry = {
      lastModified: BUILD_TIME,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8,
      alternates: { languages: { nl, en } },
    };
    return [
      { url: nl, ...entry },
      { url: en, ...entry },
    ];
  });
}
