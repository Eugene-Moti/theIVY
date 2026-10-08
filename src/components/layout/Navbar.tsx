'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import TrackedLink from '@/components/shared/TrackedLink'

const devDropdown = [
  { name: 'Blossoms Ivy Residence', location: 'Kileleshwa', status: 'Available', href: '/blossom-ivy', image: encodeURI('/Blossoms Ivy Residence Assets/Exterior/Blossoms_Ivy exterior.png') },
  { name: 'Luckinn Ivy Residence', location: 'Westlands', status: 'Limited Units', href: '/luckinn-ivy', image: encodeURI('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Entrance.png') },
  { name: 'Ivy Park Residence', location: 'Kilimani', status: 'Early Bird', href: '/ivy-park', image: encodeURI('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Day_Ivy Park.jpg') },
  { name: 'Ivy Myst Residence', location: 'Kileleshwa', status: 'Now Selling', href: '/ivy-myst', image: encodeURI('/Ivy Myst Assets/Entrance.jpg') },
]

const navLinks = [
  { label: 'DEVELOPMENTS', href: '/developments', hasDropdown: true },
  { label: 'RENT', href: '/rent' },
  { label: 'INSIGHTS', href: '/insights' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
]

const mobileLinks = [
  { label: 'Developments', href: '/developments' },
  { label: 'Rent', href: '/rent' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [devOpen, setDevOpen] = useState(false)
  const devRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (devRef.current && !devRef.current.contains(e.target as Node)) setDevOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isLight = !scrolled && !menuOpen

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            <Image
              src={encodeURI('/The IvyGroup Logo.png')}
              alt="The Ivy Group"
              width={160}
              height={55}
              className={`h-11 w-auto object-contain transition-all duration-500 ${isLight ? 'brightness-0 invert' : ''}`}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} ref={devRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setDevOpen(v => !v)}
                    onMouseEnter={() => setDevOpen(true)}
                    className={`flex items-center gap-1 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 hover:text-gold ${scrolled ? 'text-dark' : 'text-white'}`}
                  >
                    {link.label}
                    <ChevronDown size={11} className={`transition-transform duration-300 ${devOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {devOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22 }}
                        onMouseLeave={() => setDevOpen(false)}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[580px] bg-white shadow-2xl z-50"
                      >
                        <div className="grid grid-cols-2 gap-px bg-dark/5">
                          {devDropdown.map((proj) => (
                            <Link
                              key={proj.href}
                              href={proj.href}
                              onClick={() => setDevOpen(false)}
                              className="group flex items-center gap-3 bg-white p-4 hover:bg-cream transition-colors duration-200"
                            >
                              <div className="relative w-14 h-12 flex-shrink-0 overflow-hidden">
                                <Image src={proj.image} alt={proj.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-dark text-xs font-semibold truncate">{proj.name}</p>
                                <p className="text-dark/50 text-[10px] font-sans">{proj.location}</p>
                                <span className="text-gold text-[9px] font-semibold tracking-wider uppercase">{proj.status}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="px-4 py-3 border-t border-dark/8 flex justify-between items-center">
                          <p className="text-dark/40 text-[10px] font-sans">All developments by The Ivy Group</p>
                          <Link href="/developments" onClick={() => setDevOpen(false)} className="text-gold text-[10px] font-semibold tracking-wider uppercase hover:underline">
                            View All →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 hover:text-gold ${scrolled ? 'text-dark' : 'text-white'}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-5">
            <TrackedLink
              kind="call"
              href="tel:+254118266666"
              extra={{ source: 'navbar-desktop' }}
              className={`hidden lg:inline-flex border px-6 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 ${scrolled ? 'border-gold text-gold hover:bg-gold hover:text-white' : 'border-white/80 text-white hover:bg-white hover:text-dark'}`}
            >
              ENQUIRE NOW
            </TrackedLink>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-1.5 transition-colors ${menuOpen ? 'text-white' : scrolled ? 'text-dark' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="flex flex-col items-center gap-8"
            >
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white font-serif text-4xl font-light hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <div className="w-px h-10 bg-white/20 my-1" />
              <TrackedLink
                kind="call"
                href="tel:+254118266666"
                extra={{ source: 'navbar-mobile' }}
                className="border border-gold text-gold px-10 py-3.5 text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-gold hover:text-dark transition-all duration-300"
              >
                +254 118 266 666
              </TrackedLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
