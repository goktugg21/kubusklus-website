'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const leftColumn = ['q1', 'q3', 'q5', 'q7'];
const rightColumn = ['q2', 'q4', 'q6', 'q8'];

export default function FAQ() {
  const t = useTranslations('FAQ');
  const [openKey, setOpenKey] = useState<string | null>(null);

  function toggle(key: string) {
    setOpenKey(openKey === key ? null : key);
  }

  function renderItem(key: string) {
    const isOpen = openKey === key;
    const panelId = `faq-answer-${key}`;
    return (
      <div
        key={key}
        className={`rounded-xl bg-white p-6 shadow-sm transition-all ${
          isOpen ? 'border-l-4 border-red-600' : 'border-l-4 border-transparent'
        }`}
      >
        <h3 className="text-base font-semibold text-gray-900">
          <button
            type="button"
            onClick={() => toggle(key)}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="pr-4">
              {t(`${key}.question`)}
            </span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
              {isOpen ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )}
            </span>
          </button>
        </h3>
        <div id={panelId} role="region" hidden={!isOpen}>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            {t(`${key}.answer`)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl font-[family-name:var(--font-heading)]">
            {t('title')}
          </h2>
        </div>

        {/* 2-column layout with explicit column split */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            {leftColumn.map(renderItem)}
          </div>
          <div className="space-y-4">
            {rightColumn.map(renderItem)}
          </div>
        </div>
      </div>
    </section>
  );
}
