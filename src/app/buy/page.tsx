import type { Metadata } from 'next'
import BuyContent from './BuyContent'

export const metadata: Metadata = {
  title: 'Buy a Luxury Apartment in Nairobi | The Ivy Group',
  description: 'Browse apartments for sale in Kileleshwa, Westlands, and Kilimani. Buy direct from The Ivy Group — no agent fees, flexible payment plans, full legal support.',
  alternates: { canonical: '/buy' },
  openGraph: {
    title: 'Buy a Luxury Apartment in Nairobi | The Ivy Group',
    description: 'Premium off-plan and completed apartments for sale. 20% deposit, balance through construction. No agent commissions.',
  },
}

export default function BuyPage() {
  return <BuyContent />
}
