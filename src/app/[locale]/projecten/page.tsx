'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const allProjects = [
  { image: 'https://images.unsplash.com/photo-1770885514360-f42594da979e?w=600&q=80&auto=format&fit=crop', category: 'stucco', titleKey: 'p1' },
  { image: 'https://images.unsplash.com/photo-1722604831218-2d6f55871c49?w=600&q=80&auto=format&fit=crop', category: 'tiles', titleKey: 'p2' },
  { image: 'https://plus.unsplash.com/premium_photo-1681566677688-9b6b09cfadd2?w=600&q=80&auto=format&fit=crop', category: 'painting', titleKey: 'p3' },
  { image: 'https://images.unsplash.com/photo-1768742844927-bed23ad6e365?w=600&q=80&auto=format&fit=crop', category: 'stucco', titleKey: 'p4' },
  { image: 'https://plus.unsplash.com/premium_photo-1683134399397-2407679051f7?w=600&q=80&auto=format&fit=crop', category: 'tiles', titleKey: 'p5' },
  { image: 'https://images.unsplash.com/photo-1664702927005-2270b144ef04?w=600&q=80&auto=format&fit=crop', category: 'painting', titleKey: 'p6' },
];

const categories = ['all', 'stucco', 'tiles', 'painting'] as const;

export default function ProjectenPage() {
  const t = useTranslations('ProjectenPage');
  const [active, setActive] = useState<string>('all');
  const [lightbox, setLightbox] = useState<string | null>(null);

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
                onClick={() => setLightbox(project.image.replace('w=600', 'w=1600'))}
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
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Image */}
          <img
            src={lightbox}
            alt="Project foto"
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
