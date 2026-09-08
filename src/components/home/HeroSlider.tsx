'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Download, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '@/data/projects'
import { PHONE_RAW, PHONE_PRETTY, waLink } from '@/lib/contact'
import BrochureModal from '@/components/shared/BrochureModal'

// Curated running order — selling priority
const ORDER = ['ivy-myst', 'ivy-park', 'blossom-ivy', 'luckinn-ivy']

const slides = ORDER.map((slug) => {
  const p = projects.find((x) => x.slug === slug)!
  return {
    slug: p.slug,
    name: p.name,
    short: p.name.replace(/\s+Residence$/, ''),
    location: p.locationLabel,
    status: p.statusLabel,
    tagline: p.tagline,
    image: p.heroImage,
    imageMobile: p.heroImageMobile ?? p.heroImage,
    brochure: p.brochurePath,
  }
})

const DWELL = 7000

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [narrow, setNarrow] = useState(false)
  const [brochure, setBrochure] = useState<{ name: string; path: string } | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const on = () => setNarrow(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const go = useCallback((i: number) => setCurrent((i + slides.length) % slides.length), [])

  useEffect(() => {
    if (paused || brochure) return
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), DWELL)
    return () => clearInterval(t)
  }, [paused, brochure])

  const s = slides[current]

  return (
    <section
      className="relative h-[82svh] min-h-[560px] sm:h-[90vh] lg:h-screen overflow-hidden bg-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence>
        <motion.div
          key={s.slug}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, scale: { duration: 7.5, ease: 'linear' } }}
          className="absolute inset-0"
        >
          <Image
            src={narrow ? s.imageMobile : s.image}
            alt={s.name}
            fill
            priority={current === 0}
            quality={86}
            sizes="100vw"
            className="object-cover object-[50%_32%] sm:object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-dark/92 via-dark/35 to-dark/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/55 to-transparent" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-10 sm:pb-14 lg:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="text-gold-light text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-3 sm:mb-4">
              {s.location} &nbsp;·&nbsp; {s.status}
            </p>
            <h1
              className="font-serif text-white font-light leading-[1.02] mb-4 sm:mb-5"
              style={{ fontSize: 'clamp(2.1rem, 6.5vw, 5.6rem)', letterSpacing: '0.01em' }}
            >
              {s.name}
            </h1>
            <p className="text-white/70 text-[13px] sm:text-base font-sans font-light leading-relaxed max-w-md mb-6 sm:mb-8 line-clamp-2 sm:line-clamp-none">
              {s.tagline}
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <Link
                href={`/${s.slug}`}
                className="inline-flex items-center justify-center gap-2.5 bg-gold-dark text-white px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-gold transition-colors duration-300 group"
              >
                Explore {s.short}
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <div className="flex items-stretch gap-3">
                <button
                  type="button"
                  onClick={() => setBrochure({ name: s.name, path: s.brochure })}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-white/35 text-white px-5 py-3.5 text-[11px] font-sans font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-dark transition-all duration-300"
                >
                  <Download size={13} /> Brochure
                </button>
                <a
                  href={waLink(s.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-white/35 text-white px-5 py-3.5 text-[11px] font-sans font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-dark transition-all duration-300"
                >
                  WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="sm:hidden flex-1 inline-flex items-center justify-center gap-2 border border-white/35 text-white px-5 py-3.5 text-[11px] font-sans font-semibold tracking-[0.16em] uppercase"
                >
                  <Phone size={13} /> Call
                </a>
              </div>
            </div>

            <a
              href={`tel:${PHONE_RAW}`}
              className="hidden sm:inline-flex items-center gap-2 mt-5 text-white/55 hover:text-white text-[12px] font-sans tracking-wide transition-colors"
            >
              <Phone size={12} /> {PHONE_PRETTY}
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6 pt-4 sm:mt-10 sm:pt-6 border-t border-white/12">
          <div className="flex items-center gap-2">
            {slides.map((sl, i) => (
              <button
                key={sl.slug}
                onClick={() => go(i)}
                aria-label={`Show ${sl.name}`}
                className={`h-[2px] transition-all duration-500 ${i === current ? 'w-10 bg-gold' : 'w-4 bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
          <span className="text-white/35 text-[10px] font-sans tracking-widest tabular-nums">
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <div className="ml-auto hidden lg:flex items-center gap-2">
            <button
              onClick={() => go(current - 1)}
              aria-label="Previous"
              className="w-9 h-9 border border-white/25 flex items-center justify-center text-white/55 hover:text-white hover:border-white/60 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => go(current + 1)}
              aria-label="Next"
              className="w-9 h-9 border border-white/25 flex items-center justify-center text-white/55 hover:text-white hover:border-white/60 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <BrochureModal
        isOpen={!!brochure}
        onClose={() => setBrochure(null)}
        projectName={brochure?.name ?? ''}
        brochurePath={brochure?.path ?? ''}
      />
    </section>
  )
}
