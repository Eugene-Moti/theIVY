'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'

const slides = [
  {
    image: encodeURI('/Blossoms Ivy Residence Assets/Exterior/Blossoms_Ivy exterior.png'),
    location: 'KILELESHWA, NAIROBI',
    title: 'Blossom Ivy\nResidence',
    subtitle: 'Luxury Living in One of Nairobi\'s Most Prestigious Addresses',
    href: '/blossom-ivy',
    cta: 'EXPLORE PROJECT',
  },
  {
    image: encodeURI('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg'),
    location: 'KILIMANI, NAIROBI',
    title: 'Ivy Park\nResidence',
    subtitle: 'The Future of Modern Living and Investment in Kilimani',
    href: '/ivy-park',
    cta: 'EXPLORE PROJECT',
  },
  {
    image: encodeURI('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Exterior.png'),
    location: 'WESTLANDS, NAIROBI',
    title: 'Luckinn Ivy\nResidence',
    subtitle: 'Premium Urban Living in the Heart of Westlands',
    href: '/luckinn-ivy',
    cta: 'EXPLORE PROJECT',
  },
  {
    image: encodeURI('/Ivy Myst Assets/Entrance.jpg'),
    location: 'KILELESHWA — LAUNCHING SOON',
    title: 'Ivy Myst',
    subtitle: '0% Transaction Fees · Pre-Launch Sales Now Open',
    href: '/ivy-myst',
    cta: 'REGISTER INTEREST',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (transitioning || index === current) return
      setTransitioning(true)
      setCurrent(index)
      setTimeout(() => setTransitioning(false), 1600)
    },
    [transitioning, current],
  )

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  /* Auto-advance every 6 seconds */
  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-dark">

      {/* ── Slides ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`slide-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Ken Burns zoom on the image itself */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 ken-burns">
              <Image
                src={slides[current].image}
                alt={slides[current].title.replace('\n', ' ')}
                fill
                className="object-cover"
                priority={current === 0}
                sizes="100vw"
              />
            </div>
          </div>

          {/* Gradient overlay — stronger at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/15" />
        </motion.div>
      </AnimatePresence>

      {/* ── Slide content ── */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.85, delay: 0.25, ease: 'easeOut' }}
            className="max-w-4xl w-full"
          >
            {/* Location label */}
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-6">
              {slides[current].location}
            </p>

            {/* Main heading — large serif */}
            <h1 className="font-serif text-[clamp(3rem,8vw,6.5rem)] font-light leading-[1.04] mb-7 whitespace-pre-line">
              {slides[current].title}
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-7">
              <div className="h-px w-12 bg-gold/60" />
              <p className="text-white/75 text-xs font-sans font-light tracking-[0.12em] max-w-sm">
                {slides[current].subtitle}
              </p>
              <div className="h-px w-12 bg-gold/60" />
            </div>

            {/* CTAs */}
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <Link
                href={slides[current].href}
                className="inline-flex items-center gap-2.5 bg-gold text-dark px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300 group"
              >
                {slides[current].cta}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+254118266666"
                className="inline-block border border-white/60 text-white px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                CALL US
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Slide progress indicators ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`block transition-all duration-500 ${
              i === current
                ? 'w-10 h-[2px] bg-gold'
                : 'w-4 h-[2px] bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* ── Slide counter (top-right) ── */}
      <div className="absolute top-1/2 right-6 lg:right-10 -translate-y-1/2 flex flex-col items-center gap-2 text-white/40 hidden lg:flex">
        <span className="font-sans text-xs tracking-widest">{String(current + 1).padStart(2, '0')}</span>
        <div className="w-px h-12 bg-white/20" />
        <span className="font-sans text-xs tracking-widest">{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 z-10"
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown size={14} strokeWidth={1.5} />
      </motion.div>
    </section>
  )
}
