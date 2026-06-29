import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About The Ivy Group | Premium Real Estate Developer in Nairobi',
  description: 'Learn about The Ivy Group — Nairobi\'s premier luxury residential developer. Over 10 years of experience delivering landmark apartments in Kileleshwa, Westlands, and Kilimani.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About The Ivy Group | Premium Real Estate Developer in Nairobi',
    description: 'Over 10 years building Nairobi\'s finest addresses across Kileleshwa, Westlands, and Kilimani.',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
