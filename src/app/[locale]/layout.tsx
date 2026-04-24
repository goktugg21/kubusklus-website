import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import EmergencyBar from '@/components/layout/EmergencyBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import '../globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.home' });
  const tSite = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://kubusklus.nl'),
    title: {
      default: t('title'),
      template: `%s | ${tSite('siteName')}`,
    },
    description: t('description'),
    icons: { icon: '/favicon.svg' },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      url: `https://kubusklus.nl/${locale}`,
      siteName: tSite('siteName'),
      images: [{
        url: '/images/projects/hero-renovatie.webp',
        width: 1200,
        height: 630,
        alt: t('ogImageAlt'),
      }],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        nl: '/nl',
        en: '/en',
        'x-default': '/nl',
      },
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${plusJakarta.variable} ${dmSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HomeAndConstructionBusiness',
              name: 'Kubus Klussenbedrijf',
              alternateName: 'Kubusklus',
              description: 'Vakkundig stukadoor, tegelwerk en schilderwerk in Amsterdam. Sinds 2006.',
              url: 'https://kubusklus.nl',
              telephone: '+31203642420',
              email: 'info@kubusklus.nl',
              foundingDate: '2006',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Rhoneweg 26H',
                addressLocality: 'Amsterdam',
                postalCode: '1043 AH',
                addressCountry: 'NL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 52.3905,
                longitude: 4.8285,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '07:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '08:00',
                  closes: '14:00',
                },
              ],
              areaServed: [
                { '@type': 'City', name: 'Amsterdam' },
                { '@type': 'Place', name: 'Randstad' },
              ],
              sameAs: ['https://kubusklus.nl'],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <EmergencyBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
