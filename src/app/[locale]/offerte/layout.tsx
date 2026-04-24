import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/pageMetadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.offerte' });
  return { title: t('title'), description: t('description'), ...buildPageMetadata(locale, '/offerte') };
}

export default function OfferteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
