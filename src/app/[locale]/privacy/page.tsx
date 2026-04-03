import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description: 'Privacybeleid van Kubusklus. Hoe wij omgaan met uw persoonsgegevens conform de AVG/GDPR.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

function PrivacyContent() {
  const t = useTranslations('PrivacyPage');

  const sections = ['intro', 'data', 'purpose', 'sharing', 'cookies', 'rights', 'contact'] as const;

  return (
    <>
      {/* Header */}
      <section className="bg-[#0F1115] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-[family-name:var(--font-heading)]">
            {t('title')}
          </h1>
          <p className="mt-4 text-gray-400">{t('lastUpdated')}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {sections.map((key) => (
            <div key={key} className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-heading)]">
                {t(`${key}.title`)}
              </h2>
              <p className="mt-3 text-base leading-7 text-gray-600 whitespace-pre-line">
                {t(`${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyContent />;
}
