import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/pageMetadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.diensten' });
  return { title: t('title'), description: t('description'), ...buildPageMetadata(locale, '/diensten') };
}

type Props = {
  params: Promise<{ locale: string }>;
};

const iconPaths = {
  building: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  layers: "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-4.179 2.25m0 0L12 17.25l-5.571-3m11.142 0l4.179 2.25L12 21.75l-9.75-5.25 4.179-2.25",
  squares: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
  sparkle: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  paint: "M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z",
  sand: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z",
  floor: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H5.625a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125z",
  wall: "M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z",
};

const services = [
  { key: 'facades', anchor: 'buitengevels', image: '/images/projects/buitengevels-facade.webp', icon: iconPaths.building },
  { key: 'roughcast', anchor: 'raapwerk', image: '/images/projects/raapwerk-plastering.webp', icon: iconPaths.layers },
  { key: 'walls', anchor: 'wanden-en-plafond', image: '/images/projects/wanden-plafond-afgewerkt.webp', icon: iconPaths.squares, imagePosition: 'center bottom' },
  { key: 'decorative', anchor: 'sier-en-pleisterwerk', image: '/images/projects/sier-pleisterwerk.webp', icon: iconPaths.sparkle, imagePosition: 'right bottom' },
  { key: 'sanding', anchor: 'schuurwerk', image: '/images/projects/schuurwerk-actie.webp', icon: iconPaths.sand, imagePosition: 'center 25%' },
  { key: 'painting', anchor: 'schilderwerk', image: '/images/projects/sigma-paint.webp', icon: iconPaths.paint },
  { key: 'tiles', anchor: 'tegels-plaatsen', image: '/images/projects/tegels-leggen.webp', icon: iconPaths.squares },
  { key: 'parquet', anchor: 'parket-neerleggen', image: '/images/projects/parket-werk.webp', icon: iconPaths.floor },
  { key: 'partitions', anchor: 'tussenwanden-plaatsen', image: '/images/projects/tussenwanden-ceiling.webp', icon: iconPaths.wall },
];

function ServiceContent() {
  const t = useTranslations('DienstenPage');

  return (
    <>
      {/* Page header */}
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

      {/* Service sections — alternating bg */}
      {services.map((service, idx) => (
        <section
          key={service.key}
          id={service.anchor}
          className={`py-20 scroll-mt-20 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Text */}
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                  </svg>
                </div>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 font-[family-name:var(--font-heading)]">
                  {t(`${service.key}.title`)}
                </h2>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {t(`${service.key}.description`)}
                </p>
                <ul className="mt-6 space-y-3">
                  {[0, 1, 2].map((i) => (
                    <li key={i} className="flex items-center gap-x-3 text-sm text-gray-600">
                      <svg className="h-5 w-5 shrink-0 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      {t(`${service.key}.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href={`/offerte?service=${service.anchor}`}
                    className="inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
                  >
                    {t('cta')}
                  </Link>
                </div>
              </div>
              {/* Image */}
              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                <div
                  className="aspect-[4/3] rounded-2xl bg-cover"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundPosition: service.imagePosition ?? 'center',
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export default async function DienstenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServiceContent />;
}
