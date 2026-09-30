import type { Metadata } from 'next'
import ThankYouContent from './ThankYouContent'

export const metadata: Metadata = {
  title: 'Thank You | The Ivy Group',
  description: 'Your enquiry has been received.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/thank-you' },
}

export default function ThankYouPage() {
  return <ThankYouContent />
}
