import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ServicesOverview() {
  const t = useTranslations('Services');

  const services = [
    {
      key: 'facades',
      anchor: 'buitengevels',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      ),
    },
    {
      key: 'decorative',
      anchor: 'sier-en-pleisterwerk',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      ),
    },
    {
      key: 'painting',
      anchor: 'schilderwerk',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      ),
    },
    {
      key: 'tiles',
      anchor: 'tegels-plaatsen',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      ),
    },
  ];

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

        {/* Service cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.key}
              className="group rounded-2xl bg-white p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              {/* Red icon box */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  {service.icon}
                </svg>
              </div>

              <Link href={`/diensten#${service.anchor}`} className="mt-5 block text-lg font-bold text-gray-900 hover:text-red-600 transition-colors font-[family-name:var(--font-heading)]">
                {t(`${service.key}.title`)}
              </Link>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t(`${service.key}.description`)}
              </p>

              <Link
                href={`/diensten#${service.anchor}`}
                className="mt-4 inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                {t('learnMore')} <span className="ml-1" aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* View all services link */}
        <div className="mt-10 text-center">
          <Link
            href="/diensten"
            className="inline-flex items-center text-base font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            {t('viewAll')} <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
