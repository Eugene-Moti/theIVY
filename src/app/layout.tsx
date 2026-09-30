import type { Metadata } from 'next'
import { Jost, IBM_Plex_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import ChatWidget from '@/components/shared/ChatWidget'
import AttributionCapture from '@/components/shared/AttributionCapture'

// Display — Jost: a geometric sans in the Futura lineage. Quiet, architectural,
// upmarket; set light-to-medium at large sizes for the development titles.
const display = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
})

// Body — IBM Plex Sans: a neutral humanist sans for everything read at length.
const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ivygroup.ke'),
  title: 'The Ivy Group | Luxury Real Estate Developer in Nairobi',
  description: "Nairobi's premier luxury residential developer. Delivering landmark apartments in Kileleshwa, Westlands and Kilimani since 2017. Explore our portfolio.",
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
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
  },
}

// Google Ads conversion ID (e.g. "AW-123456789") — unset until it's added in
// Vercel env vars, at which point this also starts configuring gtag for it.
// See src/lib/analytics.ts for how individual conversion events are fired.
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
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
            ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
          `}
        </Script>
        <AttributionCapture />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
      </body>
    </html>
  )
}
