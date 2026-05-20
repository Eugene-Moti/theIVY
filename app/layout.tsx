import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
// @ts-ignore: side-effect import of CSS file without type declarations
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileBar } from "@/components/mobile-bar";
import { SocialQrPopup } from "@/components/social-qr-popup";
import { WhatsAppWidget } from "@/components/whatsapp-widget";
import { AmbientEffects } from "@/components/ambient-effects";
import { assetUrl } from "@/lib/assets";
import { assets, contact } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ivygroup.ke"),
  title: {
    default: "The Ivy Group | Luxury Apartments for Sale in Nairobi",
    template: "%s | The Ivy Group"
  },
  description: "Explore The Ivy Group's premium Nairobi residences, including Ivy Park Residence in Kilimani, Blossoms Ivy in Kileleshwa, and Luckinn Ivy in Westlands.",
  keywords: ["luxury apartments Nairobi", "apartments for sale in Kilimani", "Ivy Park Residence", "off-plan apartments Nairobi", "Kileleshwa apartments for sale"],
  icons: {
    icon: assetUrl("/The Ivygroup/Logo/IVY Group/1x/Artboard 1.png"),
    shortcut: assetUrl("/The Ivygroup/Logo/IVY Group/1x/Artboard 1.png"),
    apple: assetUrl("/The Ivygroup/Logo/IVY Group/1x/Artboard 1.png")
  },
  openGraph: {
    title: "The Ivy Group",
    description: "Premium Nairobi residences designed for modern living and long-term investment.",
    images: [assets.ivyParkHero]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "The Ivy Group",
    address: contact.office,
    telephone: contact.phone,
    email: contact.email,
    areaServed: "Nairobi, Kenya"
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var _iub = _iub || [];
              _iub.csConfiguration = {
                "siteId":4538623,
                "cookiePolicyId":61671428,
                "lang":"en",
                "storage":{"useSiteId":true},
                "googleConsentMode":true,
                "googleAdsDataRedaction":true,
                "googleUrlPassthrough":true
              };
            `
          }}
        />
        <script type="text/javascript" src="https://cs.iubenda.com/autoblocking/4538623.js" />
        <script type="text/javascript" src="//cdn.iubenda.com/cs/gpp/stub.js" />
        <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charSet="UTF-8" async />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G4MF7YCDPV" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G4MF7YCDPV');
            `
          }}
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AmbientEffects />
        <Header />
        <main>{children}</main>
        <Footer />
        <SocialQrPopup />
        <WhatsAppWidget />
        <MobileBar />
      </body>
    </html>
  );
}
