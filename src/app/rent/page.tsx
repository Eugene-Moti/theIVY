import type { Metadata } from 'next'
import RentContent from './RentContent'

export const metadata: Metadata = {
  title: 'Rent a Luxury Apartment in Nairobi | The Ivy Group',
  description: 'Rental units from The Ivy Group are coming soon. Register your interest to be notified when premium apartments become available for rent across our Nairobi portfolio.',
  alternates: { canonical: '/rent' },
  openGraph: {
    title: 'Luxury Rentals Coming Soon | The Ivy Group Nairobi',
    description: 'Register your interest for premium rental apartments in Kileleshwa, Westlands, and Kilimani.',
  },
}

export default function RentPage() {
  return <RentContent />
}
