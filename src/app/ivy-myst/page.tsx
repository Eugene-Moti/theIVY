import type { Metadata } from 'next'
import { getProject } from '@/data/projects'
import ProjectTemplate from '@/components/project/ProjectTemplate'

export const metadata: Metadata = {
  title: 'Ivy Myst — Now Selling | Luxury Residences in Kileleshwa | The Ivy Group',
  description: 'Ivy Myst is now selling. 1, 2 & 3 bedroom luxury residences with garden terraces in Kileleshwa, Nairobi. Groundbreaking complete — secure your unit today.',
  alternates: { canonical: '/ivy-myst' },
  openGraph: {
    title: 'Ivy Myst — Now Selling | Luxury Residences in Kileleshwa',
    description: 'Iconic curved architecture, rooftop Celestial Pool, and generously proportioned residences with garden terraces. Now Selling in Kileleshwa, Nairobi.',
    url: 'https://www.ivygroup.ke/ivy-myst',
    siteName: 'The Ivy Group',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.jpg',
        width: 1200,
        height: 630,
        alt: 'Ivy Myst — Luxury Residences in Kileleshwa, Nairobi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ivy Myst — Now Selling | Luxury Residences in Kileleshwa',
    description: 'Iconic curved architecture, rooftop Celestial Pool, and garden terraces. Now Selling in Kileleshwa, Nairobi.',
    images: ['/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.jpg'],
  },
}

export default function IvyMystPage() {
  const data = getProject('ivy-myst')!
  return <ProjectTemplate data={data} />
}
