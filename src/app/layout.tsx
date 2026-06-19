import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Ivy Group | Luxury Real Estate Developer in Nairobi',
  description:
    "The Ivy Group is a premium real estate developer with over 10 years of experience delivering luxury residential developments across Nairobi's most prestigious neighbourhoods — Kileleshwa, Westlands and Kilimani.",
  keywords:
    'luxury apartments Nairobi, Kileleshwa apartments, Westlands apartments, Kilimani apartments, The Ivy Group, Blossom Ivy, Luckinn Ivy, Ivy Park, Ivy Myst',
  openGraph: {
    title: 'The Ivy Group | Luxury Real Estate Developer in Nairobi',
    description: 'Building Modern Communities. Creating Lasting Value.',
    locale: 'en_KE',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${montserrat.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
