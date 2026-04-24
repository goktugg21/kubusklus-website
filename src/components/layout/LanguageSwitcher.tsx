'use client';

import { Suspense } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function LanguageSwitcherInner() {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('Common');

  function switchLocale() {
    const nextLocale = locale === 'nl' ? 'en' : 'nl';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    const query = searchParams.toString();
    router.push(query ? `${newPath}?${query}` : newPath);
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="flex items-center gap-x-1 rounded-md border border-gray-200 px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      aria-label={locale === 'nl' ? t('switchToEN') : t('switchToNL')}
    >
      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
      {locale === 'nl' ? 'EN' : 'NL'}
    </button>
  );
}

export default function LanguageSwitcher() {
  return (
    <Suspense fallback={null}>
      <LanguageSwitcherInner />
    </Suspense>
  );
}
