import type { Metadata } from 'next'
import DevelopmentsContent from './DevelopmentsContent'

export const metadata: Metadata = {
  title: 'Developments & How to Buy | The Ivy Group Nairobi',
  description: 'Explore The Ivy Group\'s four landmark residential developments in Nairobi — Blossoms Ivy, Luckinn Ivy, Ivy Park, and Ivy Myst — plus payment plans and the buying process. Sold directly by the developer.',
  alternates: { canonical: '/developments' },
  openGraph: {
    title: 'Our Developments | The Ivy Group Nairobi',
    description: 'Four landmark luxury residential projects across Kileleshwa, Westlands, and Kilimani.',
  },
}

export default function DevelopmentsPage() {
  return <DevelopmentsContent />
}
