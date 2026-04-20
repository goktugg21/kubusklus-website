import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('CTA');

  return (
    <section className="bg-[#0F1115] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-[family-name:var(--font-heading)]">
          {t('title')}
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="mt-8">
          <Link
            href="/offerte"
            className="inline-block rounded-lg bg-red-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-red-700 transition-colors"
          >
            {t('button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
