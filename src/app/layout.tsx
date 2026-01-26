import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport, } from "next";
import { Playfair_Display } from "next/font/google";
import "./css/globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";


// Load Playfair Display font (luxurious serif)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "IVY GROUP Kenya - Premium Real Estate Developer | Luxury Apartments Nairobi",
  description:
    "IVY GROUP Kenya is Nairobi's premier real estate developer specializing in luxury apartments, modern residential developments, and premium property investments in Kileleshwa, Westlands, Kilimani.",
  keywords:
    "real estate Kenya, luxury apartments Nairobi, property developer Kenya, buy apartments Nairobi, rent apartments Kenya, IVY GROUP, Blossom Ivy, Luckinn Ivy, Ivy Park, premium real estate, property investment Kenya",
  authors: [{ name: "IVY GROUP Kenya" }],
  creator: "IVY GROUP Kenya",
  publisher: "IVY GROUP Kenya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ivygroup.ke"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IVY GROUP Kenya - Premium Real Estate Developer",
    description:
      "Nairobi's leading real estate developer offering luxury apartments in prime locations. Discover Blossom Ivy, Luckinn Ivy, and Ivy Park developments.",
    url: "https://ivygroup.ke",
    siteName: "IVY GROUP Kenya",
    images: [
      {
        url: "/designs/Ivy_logo.png",
        width: 1200,
        height: 630,
        alt: "IVY GROUP Kenya Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IVY GROUP Kenya - Premium Real Estate Developer",
    description: "Nairobi's leading real estate developer offering luxury apartments in prime locations.",
    images: ["/designs/Ivy_logo.png"],
    creator: "@ivygroup_ke",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "IVY GROUP Kenya",
    description:
      "Premium real estate developer in Nairobi, Kenya specializing in luxury apartments and residential developments",
    url: "https://ivygroup.ke",
    logo: "https://ivygroup.ke/designs/Ivy_logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gatundu Road",
      addressLocality: "Kileleshwa",
      addressRegion: "Nairobi",
      addressCountry: "KE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+254-700-019-012",
        contactType: "sales",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        telephone: "+254-799-008-564",
        contactType: "customer service",
        availableLanguage: "English",
      },
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61577046309467",
      "https://www.instagram.com/theivygroup_ke/",
      "https://www.tiktok.com/@theivygroup.ke",
    ],
    areaServed: {
      "@type": "City",
      name: "Nairobi",
      addressCountry: "KE",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IVY GROUP Properties",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Blossom Ivy Residence",
            description: "Elegant apartments in Kileleshwa",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Luckinn Ivy",
            description: "Contemporary living spaces in Westlands",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Ivy Park",
            description: "Sophisticated residences in Kilimani",
          },
        },
      ],
    },
  };

  return (
    <html lang="en" className={`${playfair.variable} js-focus-visible`} data-js-focus-visible="">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/designs/Ivy_logo.png" />
        <meta name="theme-color" content="#264C2D" />
      </head>
      <body className="antialiased font-[var(--font-playfair)]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
