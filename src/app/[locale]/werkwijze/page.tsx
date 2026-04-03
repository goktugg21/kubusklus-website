import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import HowWeWork from '@/components/home/HowWeWork';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Werkwijze',
  description: 'Hoe Kubusklus werkt: gratis offerte, vakwerk met A-kwaliteit materialen, en oplevering met garantie.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

function WerkwijzeHeader() {
  const t = useTranslations('WerkwijzePage');
  return (
    <section className="bg-[#0F1115] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
          {t('eyebrow')}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-[family-name:var(--font-heading)]">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
}

function WerkwijzeCta() {
  const t = useTranslations('WerkwijzePage');
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-heading)]">
          {t('ctaTitle')}
        </h2>
        <p className="mt-3 text-gray-600">{t('ctaSubtitle')}</p>
        <div className="mt-6">
          <Link
            href="/offerte"
            className="inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function WerkwijzePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <WerkwijzeHeader />
      <HowWeWork />
      <WerkwijzeCta />
    </>
  );
}
