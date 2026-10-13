'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const facts = [
  { value: '2017', label: 'Established' },
  { value: '4', label: 'Developments' },
  { value: '3', label: 'Nairobi Neighbourhoods' },
  { value: '1,400+', label: 'Residences' },
]

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
    <section className="bg-dark border-b border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">
              The Ivy Group · Est. 2017
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.6rem] text-white font-medium tracking-tight leading-[1.1]">
              Landmark addresses<br className="hidden lg:block" /> across Nairobi.
            </h2>
            <div className="h-px w-10 bg-gold mt-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="grid grid-cols-2 gap-6 lg:gap-8"
          >
            {facts.map((f) => (
              <div key={f.label} className="border-l border-white/12 pl-6">
                <p className="font-serif text-3xl text-white font-light mb-1 tabular-nums">{f.value}</p>
                <p className="text-white/35 text-[10px] font-sans tracking-[0.2em] uppercase">{f.label}</p>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Portfolio showcase — current developments + legacy track record,
            one spotlighted at a time while the rest dim, cycling on its own. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="mt-16 lg:mt-20 pt-14 lg:pt-16 border-t border-white/8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-3">
                Our Portfolio
              </p>
              <p className="text-white/40 text-[13px] font-sans font-light">
                Four developments shaping Nairobi today, built on a legacy that goes back to 2017.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-x-6 gap-y-10">
            {PORTFOLIO.map((item, i) => {
              const isActive = active === i
              const inner = (
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0.32,
                    scale: isActive ? 1.1 : 0.9,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-center justify-center"
                >
                  {isActive && (
                    <motion.span
                      layoutId="portfolio-glow"
                      className="absolute -inset-5 rounded-full bg-gold/10 blur-xl"
                      transition={{ duration: 0.6 }}
                    />
                  )}
                  <Image
                    src={item.logo.src}
                    alt={item.name}
                    width={item.logo.w}
                    height={item.logo.h}
                    className={`relative h-9 sm:h-11 w-auto object-contain transition-[filter] duration-500 ${
                      item.logo.invert ? 'brightness-0 invert' : ''
                    }`}
                  />
                </motion.div>
              )
              const cardClass = 'group relative flex items-center justify-center h-20 sm:h-24 transition-colors duration-500'

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
          <div className="mt-10 h-12 flex flex-col items-center text-center">
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
        </motion.div>
      </div>
    </section>
  )
}
