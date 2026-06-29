import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import Script from 'next/script'
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
  metadataBase: new URL('https://www.ivygroup.ke'),
  title: 'The Ivy Group | Luxury Real Estate Developer in Nairobi',
  description:
    "The Ivy Group is a premium real estate developer with over 10 years of experience delivering luxury residential developments across Nairobi's most prestigious neighbourhoods — Kileleshwa, Westlands and Kilimani.",
  keywords:
    'luxury apartments Nairobi, Kileleshwa apartments, Westlands apartments, Kilimani apartments, The Ivy Group, Blossom Ivy, Luckinn Ivy, Ivy Park, Ivy Myst',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'The Ivy Group | Luxury Real Estate Developer in Nairobi',
    description: 'Building Modern Communities. Creating Lasting Value.',
    url: 'https://www.ivygroup.ke',
    siteName: 'The Ivy Group',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/The Ivy Group  Luxury Real Estate Developer in Nairobi.png',
        width: 1200,
        height: 630,
        alt: 'The Ivy Group — Luxury Real Estate Developer in Nairobi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ivy Group | Luxury Real Estate Developer in Nairobi',
    description: 'Building Modern Communities. Creating Lasting Value.',
    images: ['/The Ivy Group  Luxury Real Estate Developer in Nairobi.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${montserrat.variable}`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G4MF7YCDPV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G4MF7YCDPV');
          `}
        </Script>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
