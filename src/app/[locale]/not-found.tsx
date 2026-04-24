import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function LocaleNotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-red-600">404</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl font-heading">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-md text-base text-gray-600">
        {t('description')}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
        >
          {t('backHome')}
        </Link>
        <Link
          href="/contact"
          className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors"
        >
          {t('contact')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
