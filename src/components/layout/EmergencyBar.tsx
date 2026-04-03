import { useTranslations } from 'next-intl';

export default function EmergencyBar() {
  const t = useTranslations('EmergencyBar');

  return (
    <div className="bg-[#0F1115] text-white py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-x-3 text-sm">
        <span className="font-semibold text-orange-500">{t('label')}</span>
        <span className="text-gray-400">|</span>
        <a
          href="tel:+31621265372"
          className="font-medium hover:text-orange-500 transition-colors"
        >
          {t('phone')}
        </a>
      </div>
    </div>
  );
}
