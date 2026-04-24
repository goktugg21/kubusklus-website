import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import FAQ from '@/components/home/FAQ';
import { Link } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/pageMetadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.faq' });
  return { title: t('title'), description: t('description'), ...buildPageMetadata(locale, '/faq') };
}

type Props = {
  params: Promise<{ locale: string }>;
};

function FAQHeader() {
  const t = useTranslations('FAQPage');
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

function FAQCta() {
  const t = useTranslations('FAQPage');
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-heading)]">
          {t('ctaTitle')}
        </h2>
        <p className="mt-3 text-gray-600">{t('ctaSubtitle')}</p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FAQHeader />
      <FAQ />
      <FAQCta />
    </>
  );
}
