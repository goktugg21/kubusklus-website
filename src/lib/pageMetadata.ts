import type { Metadata } from 'next';

const BASE_URL = 'https://kubusklus.nl';

export function buildPageMetadata(locale: string, route: string): Pick<Metadata, 'alternates'> {
  const path = route === '' ? '' : route;
  return {
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: {
        nl: `${BASE_URL}/nl${path}`,
        en: `${BASE_URL}/en${path}`,
        'x-default': `${BASE_URL}/nl${path}`,
      },
    },
  };
}
