import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import ServicesOverview from '@/components/home/ServicesOverview';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import HowWeWork from '@/components/home/HowWeWork';
import CTASection from '@/components/home/CTASection';
import FAQ from '@/components/home/FAQ';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <PortfolioPreview />
      <HowWeWork />
      <CTASection />
      <FAQ />
    </>
  );
}
