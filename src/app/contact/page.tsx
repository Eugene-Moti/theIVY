import type { Metadata } from 'next'
import ContactContent from './ContactContent'
import { HEAD_OFFICE } from '@/data/office'

export const metadata: Metadata = {
  title: 'Contact Us | The Ivy Group',
  description: 'Get in touch with The Ivy Group sales team. Call +254 118 266 666, email us, or visit our head office at the Ivy Park Sales Suite, Kirichwa Road, Kilimani (near Yaya Centre), Nairobi.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact The Ivy Group | Luxury Real Estate Nairobi',
    description: 'Reach our sales team for enquiries on luxury apartments across Kileleshwa, Westlands, and Kilimani.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'The Ivy Group',
  url: 'https://www.ivygroup.ke',
  telephone: '+254118266666',
  email: 'marketing.ivy-group@rsunproperty.net',
  address: {
    '@type': 'PostalAddress',
    streetAddress: HEAD_OFFICE.streetAddress,
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi County',
    addressCountry: 'KE',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '18:00',
  },
  sameAs: [
    'https://www.instagram.com/theivygroupke',
    'https://www.facebook.com/share/1JfveKL618/',
    'https://www.tiktok.com/@the.ivy.group.ke',
    'https://youtube.com/@theivygroupke',
  ],
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent />
    </>
  )
}
