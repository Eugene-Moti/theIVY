'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const p = (path: string) => encodeURI(path)

interface Portfolio {
  name: string
  status: string
  href?: string
  logo: { src: string; w: number; h: number; invert?: boolean }
}

// Currently selling or under construction — each links to its project page.
const CURRENT: Portfolio[] = [
  {
    name: 'Ivy Myst Residence',
    status: 'Now Selling',
    href: '/ivy-myst',
    logo: { src: p('/Ivy Myst Assets/Ivy Myst Logo.png'), w: 792, h: 173, invert: true },
  },
  {
    name: 'Ivy Park Residence',
    status: 'Under Construction',
    href: '/ivy-park',
    logo: { src: p('/IVY PARK RESIDENCE Assests/Ivypark_logo.png'), w: 1552, h: 782 },
  },
  {
    name: 'Blossoms Ivy Residence',
    status: 'Nearing Completion',
    href: '/blossom-ivy',
    logo: { src: p('/Blossoms Ivy Residence Assets/BLOSSOM-LOGO-GOLD.png'), w: 1552, h: 782 },
  },
  {
    name: 'Luckinn Ivy Residence',
    status: 'Limited Units',
    href: '/luckinn-ivy',
    logo: { src: p('/Luckinn Ivy Assets/luckinn_logo.png'), w: 5760, h: 1868 },
  },
]

// Delivered developments from before the current portfolio — no live page,
// shown for legacy / track-record credibility.
const LEGACY: Portfolio[] = [
  {
    name: 'Diamond Homes',
    status: 'Completed',
    logo: { src: p('/previous_projects/Diamond Homes/diamond-homes-logo-gold.png'), w: 4320, h: 1854 },
  },
  {
    name: 'Diamond Ivy Residence',
    status: 'Completed',
    logo: { src: p('/previous_projects/Diamond-ivy/diamond-ivy-gold.png'), w: 4320, h: 2849 },
  },
  {
    name: 'Nandwa Residence',
    status: 'Completed',
    logo: { src: p('/previous_projects/Nandwa-ivy/Nandwa-ivy-full-logo-gold.png'), w: 1897, h: 2382 },
  },
]

const PORTFOLIO = [...CURRENT, ...LEGACY]
const DWELL = 2800

export default function ManifestoStrip() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Self-rescheduling timeout, keyed off `active` — so a manual hover/click
  // on a card resets the countdown instead of fighting it.
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setActive((a) => (a + 1) % PORTFOLIO.length), DWELL)
    return () => clearTimeout(t)
  }, [active, paused])

  const spotlight = PORTFOLIO[active]

  return (
    <section
      className="bg-dark border-b border-white/8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75 }}
          className="text-center mb-14 lg:mb-16"
        >
          <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-3">
            Our Portfolio
          </p>
          <p className="text-white/40 text-[13px] font-sans font-light max-w-md mx-auto">
            Four developments underway today, plus three completed since 2017 — seven landmark
            addresses in total.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-8 gap-y-14">
          {PORTFOLIO.map((item, i) => {
            const isActive = active === i
            const inner = (
              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0.32,
                  scale: isActive ? 1.14 : 0.88,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center justify-center"
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolio-glow"
                    className="absolute -inset-8 rounded-full bg-gold/10 blur-2xl"
                    transition={{ duration: 0.6 }}
                  />
                )}
                <Image
                  src={item.logo.src}
                  alt={item.name}
                  width={item.logo.w}
                  height={item.logo.h}
                  className={`relative h-14 sm:h-16 lg:h-20 w-auto object-contain transition-[filter] duration-500 ${
                    item.logo.invert ? 'brightness-0 invert' : ''
                  }`}
                />
              </motion.div>
            )
            const cardClass = 'group relative flex items-center justify-center h-28 sm:h-32 lg:h-36 transition-colors duration-500'

            return item.href ? (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setActive(i)}
                className={`${cardClass} cursor-pointer`}
              >
                {inner}
              </Link>
            ) : (
              <div key={item.name} onMouseEnter={() => setActive(i)} className={cardClass}>
                {inner}
              </div>
            )
          })}
        </div>

        {/* Single animated caption for whichever logo is currently spotlighted */}
        <div className="mt-6 h-12 flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={spotlight.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-serif text-white text-base font-light">{spotlight.name}</p>
              <p className="text-gold text-[9.5px] font-sans font-semibold tracking-[0.2em] uppercase mt-1">
                {spotlight.status}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots — click to jump straight to a logo */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {PORTFOLIO.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show ${item.name}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                active === i ? 'w-6 bg-gold' : 'w-1.5 bg-white/20 hover:bg-white/35'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
