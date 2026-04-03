import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import EmergencyBar from '@/components/layout/EmergencyBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
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

export const metadata: Metadata = {
  title: {
    default: 'Kubusklus — Stukadoor, Tegelwerk & Schilderwerk Amsterdam',
    template: '%s | Kubusklus Amsterdam',
  },
  description:
    'Vakkundig stukadoor, tegelwerk en schilderwerk in Amsterdam. Sinds 2006. Wij beweren niet, wij bewijzen het. Gratis offerte.',
  metadataBase: new URL('https://kubusklus.nl'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Kubusklus — Vakkundig Stukadoor, Tegelwerk & Schilderwerk',
    description: 'Uw betrouwbare onderaannemer in Amsterdam. Sinds 2006.',
    url: 'https://kubusklus.nl',
    siteName: 'Kubusklus',
    images: [
      {
        url: 'https://plus.unsplash.com/premium_photo-1683120653498-1d98e5148154?w=1200&h=630&fit=crop&q=80',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'nl_NL',
    type: 'website',
  },
};

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
                streetAddress: 'Delflandplein 160',
                addressLocality: 'Amsterdam',
                postalCode: '1062 HW',
                addressCountry: 'NL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 52.3456,
                longitude: 4.8147,
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
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
