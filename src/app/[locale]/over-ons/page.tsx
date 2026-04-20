import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Over Ons',
  description: 'Kubus Klussenbedrijf — sinds 2006 vakmanschap in Amsterdam. Meer dan 20 jaar ervaring, 500+ projecten.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

const certificates = [
  { name: 'VCA', color: 'bg-blue-100 text-blue-800' },
  { name: 'BouwGarant', color: 'bg-green-100 text-green-800' },
  { name: 'Sigma Certified', color: 'bg-red-100 text-red-800' },
];

function AboutContent() {
  const t = useTranslations('AboutPage');

  return (
    <>
      {/* Header */}
      <section className="bg-[#0F1115] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
            {t('eyebrow')}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-[family-name:var(--font-heading)]">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 font-[family-name:var(--font-heading)]">
                {t('storyTitle')}
              </h2>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {t('storyP1')}
              </p>
              <p className="mt-4 text-base leading-7 text-gray-600">
                {t('storyP2')}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-extrabold text-red-600 font-[family-name:var(--font-heading)]">20+</p>
                  <p className="mt-1 text-sm text-gray-600">{t('statYears')}</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-red-600 font-[family-name:var(--font-heading)]">500+</p>
                  <p className="mt-1 text-sm text-gray-600">{t('statProjects')}</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-red-600 font-[family-name:var(--font-heading)]">100%</p>
                  <p className="mt-1 text-sm text-gray-600">{t('statSatisfaction')}</p>
                </div>
              </div>
            </div>
            <div
              className="aspect-[4/3] rounded-2xl bg-cover bg-center"
              style={{
                backgroundImage: 'url(/images/projects/over-ons-team.jpg)',
              }}
            />
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 font-[family-name:var(--font-heading)]">
            {t('certsTitle')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('certsSubtitle')}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.name}
                className="flex h-28 w-44 flex-col items-center justify-center rounded-xl bg-white p-4 shadow-sm"
              >
                <div className={`rounded-lg px-3 py-1 text-xs font-bold ${cert.color}`}>
                  {cert.name}
                </div>
                <p className="mt-2 text-xs text-gray-500">{t('certPlaceholder')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 font-[family-name:var(--font-heading)]">
            {t('areaTitle')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('areaDescription')}
          </p>
          <div className="mt-8">
            <Link
              href="/offerte"
              className="inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function OverOnsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}
