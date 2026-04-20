import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: 'url(/images/projects/hero-bathroom.jpg)',
          backgroundPosition: 'center 20%',
        }}
      />
      {/* Dark gradient overlay — left-to-right, 0.92 to 0.5 opacity */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115]/[0.95] via-[#0F1115]/80 via-55% to-[#0F1115]/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
            {t('eyebrow')}
          </p>

          {/* Heading */}
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-heading)]">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-xl">
            {t('description')}
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/offerte"
              className="rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-red-700 transition-colors"
            >
              {t('primaryCTA')}
            </Link>
            <Link
              href="/projecten"
              className="rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {t('secondaryCTA')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar at bottom — solid dark bg */}
      <div className="absolute bottom-0 left-0 right-0 py-5" style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">20+</p>
              <p className="mt-1 text-sm text-gray-400">{t('stat1')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">500+</p>
              <p className="mt-1 text-sm text-gray-400">{t('stat2')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">100%</p>
              <p className="mt-1 text-sm text-gray-400">{t('stat3')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-white font-[family-name:var(--font-heading)]">24/7</p>
              <p className="mt-1 text-sm text-gray-400">{t('stat4')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
