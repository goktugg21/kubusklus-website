'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const content = {
  nl: {
    title: 'Pagina niet gevonden',
    message: 'De pagina die u zoekt bestaat niet of is verplaatst.',
    button: 'Terug naar homepagina',
  },
  en: {
    title: 'Page not found',
    message: "The page you're looking for doesn't exist or has been moved.",
    button: 'Back to homepage',
  },
};

export default function NotFound() {
  const [lang, setLang] = useState<'nl' | 'en'>('nl');

  useEffect(() => {
    if (window.location.pathname.startsWith('/en')) setLang('en');
  }, []);

  const t = content[lang];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <p className="text-7xl font-extrabold text-red-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          {t.title}
        </h1>
        <p className="mt-4 text-base text-gray-600">
          {t.message}
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
          >
            {t.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
