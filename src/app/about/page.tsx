import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About The Ivy Group | Premium Real Estate Developer in Nairobi',
  description: 'Learn about The Ivy Group — Nairobi\'s premier luxury residential developer, building landmark apartments in Kileleshwa, Westlands, and Kilimani since 2017.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About The Ivy Group | Premium Real Estate Developer in Nairobi',
    description: 'Building Nairobi\'s finest addresses across Kileleshwa, Westlands, and Kilimani since 2017.',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
