import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
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

export const revalidate = 60

export type RentalListing = {
  id: string
  property: string
  unit_type: string
  floor: string | null
  size_sqm: number | null
  price_per_month: number | null
  status: 'available' | 'coming_soon' | 'occupied'
  description: string | null
  amenities: string[]
  images: string[]
  featured_image: string | null
  available_from: string | null
}

export default async function RentPage() {
  let listings: RentalListing[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('rental_listings')
      .select('*')
      .in('status', ['available', 'coming_soon'])
      .order('status')
      .order('created_at', { ascending: false })
    listings = data ?? []
  } catch { /* table not yet created — show coming soon */ }

  return <RentContent listings={listings} />
}
