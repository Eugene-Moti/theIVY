import HeroSlider from '@/components/home/HeroSlider'
import ProjectsSection from '@/components/home/ProjectsSection'
import LaunchSection from '@/components/home/LaunchSection'
import AboutSection from '@/components/home/AboutSection'
import StatsSection from '@/components/home/StatsSection'
import CTASection from '@/components/home/CTASection'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'The Ivy Group',
  alternateName: 'Ivy Group Kenya',
  url: 'https://www.ivygroup.ke',
  telephone: '+254118266666',
  email: 'marketing.ivy-group@rsunproperty.net',
  description: 'Premium luxury residential property developer in Nairobi, Kenya. Building landmark apartment communities in Kileleshwa, Westlands, and Kilimani for over 10 years.',
  foundingDate: '2014',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gatundu Road, Kileleshwa',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi County',
    addressCountry: 'KE',
  },
  areaServed: {
    '@type': 'City',
    name: 'Nairobi',
  },
  sameAs: [
    'https://www.instagram.com/theivygroupke',
    'https://www.facebook.com/share/1JfveKL618/',
    'https://www.tiktok.com/@the.ivy.group.ke',
    'https://youtube.com/@theivygroupke',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Luxury Residential Apartments',
    itemListElement: [
      { '@type': 'Offer', name: 'Blossom Ivy Residence — Kileleshwa' },
      { '@type': 'Offer', name: 'Luckinn Ivy Residence — Westlands' },
      { '@type': 'Offer', name: 'Ivy Park Residence — Kilimani' },
      { '@type': 'Offer', name: 'Ivy Myst — Kileleshwa' },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSlider />
      <ProjectsSection />
      <LaunchSection />
      <AboutSection />
      <StatsSection />
      <CTASection />
    </>
  )
}
