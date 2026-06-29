import type { Metadata } from 'next'
import DevelopmentsContent from './DevelopmentsContent'

export const metadata: Metadata = {
  title: 'Our Developments | Luxury Apartments in Nairobi | The Ivy Group',
  description: 'Explore The Ivy Group\'s portfolio of four landmark residential developments in Nairobi — Blossom Ivy, Luckinn Ivy, Ivy Park, and Ivy Myst.',
  alternates: { canonical: '/developments' },
  openGraph: {
    title: 'Our Developments | The Ivy Group Nairobi',
    description: 'Four landmark luxury residential projects across Kileleshwa, Westlands, and Kilimani.',
  },
}

export default function DevelopmentsPage() {
  return <DevelopmentsContent />
}
