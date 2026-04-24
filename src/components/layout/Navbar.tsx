'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/diensten', label: t('services') },
    { href: '/projecten', label: t('portfolio') },
    { href: '/werkwijze', label: t('howWeWork') },
    { href: '/over-ons', label: t('about') },
    { href: '/faq', label: t('faq') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-auto py-2 md:py-3 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/kubus-logo-vectorized.svg" alt="Kubusklus" width={220} height={145} className="max-w-full h-auto" style={{ objectFit: 'contain' }} priority />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side: language + CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-4">
            <LanguageSwitcher />
            <Link
              href="/offerte"
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Mobile hamburger + language */}
          <div className="flex items-center gap-x-3 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label={t('toggleMenu')}
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 px-3">
              <Link
                href="/offerte"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-lg bg-red-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
              >
                {t('cta')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
