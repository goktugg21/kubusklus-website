import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[#0F1115] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-white font-[family-name:var(--font-heading)]">
              Kubus<span className="text-red-600">klus</span>
            </span>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              {t('description')}
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('servicesTitle')}
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { key: 'facades', anchor: 'buitengevels' },
                { key: 'roughcast', anchor: 'raapwerk' },
                { key: 'walls', anchor: 'wanden-en-plafond' },
                { key: 'decorative', anchor: 'sier-en-pleisterwerk' },
                { key: 'sanding', anchor: 'schuurwerk' },
                { key: 'painting', anchor: 'schilderwerk' },
                { key: 'tiles', anchor: 'tegels-plaatsen' },
                { key: 'parquet', anchor: 'parket-neerleggen' },
                { key: 'partitions', anchor: 'tussenwanden-plaatsen' },
              ].map((s) => (
                <li key={s.key}>
                  <Link href={`/diensten#${s.anchor}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {t(`services.${s.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('quickLinksTitle')}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/over-ons" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/projecten" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('portfolio')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('contactTitle')}
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-x-3">
                <svg className="h-5 w-5 mt-0.5 shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <div className="text-sm text-gray-400">
                  <a href="tel:+31203642420" className="hover:text-white transition-colors block">020 - 364 24 20</a>
                  <a href="tel:+31621265372" className="hover:text-white transition-colors block">06 212 65 372</a>
                </div>
              </li>
              <li className="flex items-start gap-x-3">
                <svg className="h-5 w-5 mt-0.5 shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:info@kubusklus.nl" className="text-sm text-gray-400 hover:text-white transition-colors">
                  info@kubusklus.nl
                </a>
              </li>
              <li className="flex items-start gap-x-3">
                <svg className="h-5 w-5 mt-0.5 shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-sm text-gray-400">Delflandplein 160<br />1062 HW Amsterdam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Kubus Klussenbedrijf. {t('rights')}
          </p>
          <p className="mt-1 text-xs text-gray-600">KvK: 34238635</p>
        </div>
      </div>
    </footer>
  );
}
