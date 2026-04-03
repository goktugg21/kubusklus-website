import { useTranslations } from 'next-intl';

const steps = [
  { number: '01', key: 'step1' },
  { number: '02', key: 'step2' },
  { number: '03', key: 'step3' },
];

export default function HowWeWork() {
  const t = useTranslations('HowWeWork');

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
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={step.key} className="relative text-center">
              {/* Connecting line (between steps on desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] right-[calc(-50%+32px)] h-0.5 bg-red-200" />
              )}

              {/* Number circle */}
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
                <span className="text-xl font-extrabold font-[family-name:var(--font-heading)]">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900 font-[family-name:var(--font-heading)]">
                {t(`${step.key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600 max-w-xs mx-auto">
                {t(`${step.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
