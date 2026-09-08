import Link from 'next/link'
import Image from 'next/image'
import { HEAD_OFFICE, FORMER_OFFICE } from '@/data/office'

const developments = [
  { label: 'Blossom Ivy Residence', href: '/blossom-ivy' },
  { label: 'Luckinn Ivy Residence', href: '/luckinn-ivy' },
  { label: 'Ivy Park Residence', href: '/ivy-park' },
  { label: 'Ivy Myst', href: '/ivy-myst' },
]

const company = [
  { label: 'About Us', href: '/about' },
  { label: 'All Developments', href: '/developments' },
  { label: 'Contact Us', href: '/contact' },
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/theivygroupke?igsh=M2dtaXdjNG8yejYy',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1JfveKL618/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@the.ivy.group.ke?_r=1&_t=ZS-95YSgA8XeNU',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@theivygroupke?si=3_5qQKdibneUijRm',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Image
              src={encodeURI('/The IvyGroup Logo.png')}
              alt="The Ivy Group"
              width={150}
              height={52}
              className="h-10 w-auto object-contain mb-6"
            />

            <p className="text-white/40 text-xs font-sans font-light leading-relaxed mb-7 max-w-xs">
              Building modern communities and creating lasting value in Nairobi's most prestigious
              neighbourhoods since 2017.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/35 hover:text-gold transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Developments */}
          <div>
            <h4 className="text-white text-[10px] font-sans font-semibold tracking-[0.22em] uppercase mb-6">
              Developments
            </h4>
            <ul className="space-y-3.5">
              {developments.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 text-xs font-sans hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-[10px] font-sans font-semibold tracking-[0.22em] uppercase mb-6">
              Company
            </h4>
            <ul className="space-y-3.5">
              {company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 text-xs font-sans hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-[10px] font-sans font-semibold tracking-[0.22em] uppercase mb-6">
              Contact Us
            </h4>
            <ul className="space-y-5 text-xs font-sans">
              <li>
                <p className="text-white/25 text-[9px] tracking-[0.18em] uppercase mb-1">Phone &amp; WhatsApp</p>
                <a href="tel:+254118266666" className="text-white/50 hover:text-gold transition-colors duration-300">
                  +254 118 266 666
                </a>
              </li>
              <li>
                <p className="text-white/25 text-[9px] tracking-[0.18em] uppercase mb-1">Email</p>
                <a
                  href="mailto:marketing.ivy-group@rsunproperty.net"
                  className="text-white/50 hover:text-gold transition-colors duration-300 break-all leading-relaxed"
                >
                  marketing.ivy-group@rsunproperty.net
                </a>
              </li>
              <li>
                <p className="text-white/25 text-[9px] tracking-[0.18em] uppercase mb-1">Head Office</p>
                <address className="text-white/50 not-italic leading-relaxed">
                  {HEAD_OFFICE.building}<br />
                  {HEAD_OFFICE.street}<br />
                  {HEAD_OFFICE.landmark} · {HEAD_OFFICE.city}, {HEAD_OFFICE.country}
                </address>
                <a
                  href={HEAD_OFFICE.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold/70 hover:text-gold transition-colors duration-300 text-[11px]"
                >
                  Get directions →
                </a>
              </li>
              <li>
                <p className="text-white/25 text-[9px] tracking-[0.18em] uppercase mb-1">By Appointment</p>
                <address className="text-white/40 not-italic leading-relaxed text-[11px]">
                  {FORMER_OFFICE.name}, {FORMER_OFFICE.street}
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-6 lg:px-10 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-[11px] font-sans">
            &copy; {year} The Ivy Group. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[11px] font-sans">
            <Link href="/privacy" className="text-white/30 hover:text-gold transition-colors duration-300">
              Privacy &amp; Cookies
            </Link>
            <Link href="/terms" className="text-white/30 hover:text-gold transition-colors duration-300">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
