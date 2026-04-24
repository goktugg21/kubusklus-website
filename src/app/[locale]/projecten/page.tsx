'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const allProjects = [
  { image: '/images/projects/project-luxury-bathroom.webp', category: 'tiles', titleKey: 'p1' },
  { image: '/images/projects/project-modern-bathroom.webp', category: 'tiles', titleKey: 'p2' },
  { image: '/images/projects/tegels-marble-bath.webp', category: 'tiles', titleKey: 'p3' },
  { image: '/images/projects/project-plafond-renovatie.webp', category: 'stucco', titleKey: 'p4' },
  { image: '/images/projects/project-puiopening.webp', category: 'stucco', titleKey: 'p5' },
  { image: '/images/projects/project-vloer-vernieuwing.webp', category: 'tiles', titleKey: 'p6' },
];

const categories = ['all', 'stucco', 'tiles'] as const;

export default function ProjectenPage() {
  const t = useTranslations('ProjectenPage');
  const [active, setActive] = useState<string>('all');
  const [lightbox, setLightbox] = useState<{ image: string; alt: string } | null>(null);

  const filtered = active === 'all'
    ? allProjects
    : allProjects.filter((p) => p.category === active);

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
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  active === cat
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {t(`filters.${cat}`)}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <button
                key={project.titleKey}
                type="button"
                onClick={() => setLightbox({ image: project.image, alt: t(`projects.${project.titleKey}`) })}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] text-left cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  <span className="inline-block self-start rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                    {t(`filters.${project.category}`)}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white font-[family-name:var(--font-heading)]">
                    {t(`projects.${project.titleKey}`)}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label={t('closeLightbox')}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Image */}
          <img
            src={lightbox.image}
            alt={lightbox.alt}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
