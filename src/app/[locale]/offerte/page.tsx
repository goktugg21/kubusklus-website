'use client';

import { Suspense, useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const serviceOptions = [
  'facades', 'roughcast', 'walls', 'decorative', 'sanding',
  'painting', 'tiles', 'parquet', 'partitions', 'other',
] as const;

type ServiceKey = typeof serviceOptions[number];

const slugToServiceKey: Record<string, ServiceKey> = {
  'buitengevels': 'facades',
  'raapwerk': 'roughcast',
  'wanden-en-plafond': 'walls',
  'sier-en-pleisterwerk': 'decorative',
  'schuurwerk': 'sanding',
  'schilderwerk': 'painting',
  'tegels-plaatsen': 'tiles',
  'parket-neerleggen': 'parquet',
  'tussenwanden-plaatsen': 'partitions',
};

function groupRtl(s: string): string {
  const groups: string[] = [];
  let rest = s;
  while (rest.length > 2) {
    groups.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }
  if (rest) groups.unshift(rest);
  return groups.join(' ');
}

function formatPhone(value: string): string {
  const hasPlus = value.startsWith('+');
  const digits = value.replace(/\D/g, '');

  if (!digits) return hasPlus ? '+' : '';

  if (hasPlus) {
    if (digits.length <= 2) return '+' + digits;
    const cc = digits.slice(0, 2);
    const national = digits.slice(2);
    if (!national) return '+' + cc;
    return '+' + cc + ' ' + groupRtl(national);
  }

  return groupRtl(digits);
}

export default function OffertePage() {
  return (
    <Suspense fallback={null}>
      <OfferteForm />
    </Suspense>
  );
}

function OfferteForm() {
  const t = useTranslations('OffertePage');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const initialService = slugToServiceKey[searchParams.get('service') ?? ''] ?? '';
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [phone, setPhone] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  function clearError() {
    if (status === 'error') {
      setStatus('idle');
      setErrorMsg('');
      setIsRateLimit(false);
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      description: formData.get('description') as string,
      startDate: (formData.get('startDate') as string) || undefined,
      website: formData.get('website') as string,
      locale,
    };

    try {
      const res = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setIsRateLimit(res.status === 429);
        setErrorMsg(data.error || t('errorGeneric'));
        setStatus('error');
        return;
      }

      setStatus('success');
      formRef.current?.reset();
    } catch {
      setErrorMsg(t('errorGeneric'));
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <>
        <section className="bg-[#0F1115] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-heading">
              {t('successTitle')}
            </h1>
          </div>
        </section>
        <section className="bg-white py-20">
          <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900 font-heading">
              {t('successHeading')}
            </h2>
            <p className="mt-3 text-gray-600">{t('successMessage')}</p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
              >
                {t('backHome')}
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const isSending = status === 'sending';

  return (
    <>
      {/* Header */}
      <section className="bg-[#0F1115] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
            {t('eyebrow')}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-heading">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-[660px] px-4 sm:px-6 lg:px-8">
          <form ref={formRef} onSubmit={handleSubmit} onChange={clearError} className="space-y-6 rounded-2xl bg-white p-8 shadow-[0_4px_24px_rgb(0_0_0_/_0.06)]">
            {/* Honeypot */}
            <div className="absolute -left-2499.75 h-0 w-0 overflow-hidden" aria-hidden="true">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                {t('name')} <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={isSending}
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                placeholder={t('namePlaceholder')}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                {t('email')} <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isSending}
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                placeholder={t('emailPlaceholder')}
              />
            </div>

            {/* Phone (optional) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                {t('phoneOptional')}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                disabled={isSending}
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                placeholder={t('phonePlaceholder')}
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
              />
              <p className="mt-1 text-xs text-gray-500">{t('phoneHint')}</p>
            </div>

            {/* Service type — all 9 + other */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-900">
                {t('service')} <span className="text-red-600">*</span>
              </label>
              <select
                id="service"
                name="service"
                required
                disabled={isSending}
                defaultValue={initialService}
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="">{t('servicePlaceholder')}</option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {t(`serviceOptions.${opt}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                {t('description')} <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                disabled={isSending}
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors resize-y disabled:bg-gray-50 disabled:text-gray-500"
                placeholder={t('descriptionPlaceholder')}
              />
              <p className="mt-1.5 text-sm text-gray-400 italic">{t('descriptionTip')}</p>
            </div>

            {/* Preferred start date */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-900">
                {t('startDate')}
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                disabled={isSending}
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Privacy checkbox */}
            <div className="flex items-start gap-x-3">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                required
                disabled={isSending}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
              />
              <label htmlFor="privacy" className="text-sm text-gray-600">
                {t('privacyLabel')}{' '}
                <Link href="/privacy" className="text-red-600 hover:text-red-700 underline">
                  {t('privacyLink')}
                </Link>{' '}
                <span className="text-red-600">*</span>
              </label>
            </div>

            {/* Error banner — blue for rate-limit (429), red for other errors */}
            {status === 'error' && errorMsg && (
              <div className={`rounded-lg border p-4 ${isRateLimit ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-x-3">
                  {isRateLimit ? (
                    <svg className="h-5 w-5 shrink-0 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 shrink-0 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                  )}
                  <p className={`text-sm font-medium ${isRateLimit ? 'text-blue-800' : 'text-red-800'}`}>{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-[0_4px_12px_rgb(220_38_38_/_0.3)] hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed flex items-center justify-center gap-x-2"
            >
              {isSending && (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {isSending ? t('sending') : t('submit')}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
