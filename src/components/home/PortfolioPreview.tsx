import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const projects = [
  {
    image: '/images/projects/portfolio-stucwerk.webp',
    categoryKey: 'stucco',
  },
  {
    image: '/images/projects/portfolio-tegelwerk.webp',
    categoryKey: 'tiles',
  },
  {
    image: '/images/projects/project-decorative-floor.webp',
    categoryKey: 'decorative',
  },
];

export default function PortfolioPreview() {
  const t = useTranslations('Portfolio');

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl font-[family-name:var(--font-heading)]">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Project cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.categoryKey}
              href="/projecten"
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <span className="inline-block self-start rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                  {t(`categories.${project.categoryKey}`)}
                </span>
                <h3 className="mt-2 text-xl font-bold text-white font-[family-name:var(--font-heading)]">
                  {t(`projects.${project.categoryKey}`)}
                </h3>
                <p className="mt-1 text-sm text-gray-300">Amsterdam</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link
            href="/projecten"
            className="inline-flex items-center text-base font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            {t('viewAll')} <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
