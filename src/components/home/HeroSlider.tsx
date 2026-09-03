'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const slides = [
  {
    image: encodeURI('/Blossoms Ivy Residence Assets/Blossoms Ivy Gate.jpg'),
    location: 'KILELESHWA, NAIROBI',
    title: 'Blossom Ivy\nResidence',
    subtitle: 'Luxury Living in One of Nairobi\'s Most Prestigious Addresses',
    href: '/blossom-ivy',
    cta: 'EXPLORE PROJECT',
  },
  {
    image: encodeURI('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Night new_Ivy Park.jpg'),
    location: 'KILIMANI, NAIROBI',
    title: 'Ivy Park\nResidence',
    subtitle: 'The Future of Modern Living and Investment in Kilimani',
    href: '/ivy-park',
    cta: 'EXPLORE PROJECT',
  },
  {
    image: encodeURI('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Entrance.png'),
    location: 'WESTLANDS, NAIROBI',
    title: 'Luckinn Ivy\nResidence',
    subtitle: 'Premium Urban Living in the Heart of Westlands',
    href: '/luckinn-ivy',
    cta: 'EXPLORE PROJECT',
  },
  {
    image: encodeURI('/Ivy Myst Assets/New Renders/Exterior/Gate Front View.png'),
    location: 'KILELESHWA — NOW SELLING',
    title: 'Ivy Myst',
    subtitle: '1, 2 & 3 Bedroom Luxury Residences · Garden Terraces · Completion Aug 2029',
    href: '/ivy-myst',
    cta: 'EXPLORE IVY MYST',
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

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative h-screen overflow-hidden bg-dark">

      {/* ── Full-screen image — covers entire section including panel zone ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`slide-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={slides[current].image}
              alt={slides[current].title.replace('\n', ' ')}
              fill
              className="object-cover"
              priority={current === 0}
              sizes="100vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide counter */}
      <div className="absolute top-1/2 right-6 lg:right-10 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 text-white/40 z-10">
        <span className="font-sans text-xs tracking-widest">{String(current + 1).padStart(2, '0')}</span>
        <div className="w-px h-12 bg-white/20" />
        <span className="font-sans text-xs tracking-widest">{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* ── Frosted-glass content panel — absolute at bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/15 px-7 lg:px-14 pt-6 pb-7 lg:pt-7 lg:pb-8"
        style={{ background: 'rgba(10, 10, 10, 0.38)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            {/* Main row: left info | divider | right actions */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-12">

              {/* Left: location + title */}
              <div className="lg:flex-1 min-w-0">
                <p className="text-gold text-[9px] font-sans font-semibold tracking-[0.32em] uppercase mb-2.5">
                  {slides[current].location}
                </p>
                <h1
                  className="font-serif text-white font-light leading-[1.05] whitespace-pre-line"
                  style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3.1rem)', letterSpacing: '0.01em' }}
                >
                  {slides[current].title}
                </h1>
              </div>

              {/* Vertical divider — desktop only */}
              <div className="hidden lg:block w-px self-stretch bg-white/15 shrink-0" />

              {/* Right: subtitle + CTAs */}
              <div className="lg:w-[360px] shrink-0">
                <p className="text-white/60 text-[12.5px] font-sans font-light leading-[1.7] mb-5">
                  {slides[current].subtitle}
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href={slides[current].href}
                    className="inline-flex items-center gap-2.5 bg-gold text-dark px-6 py-3 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300 group"
                  >
                    {slides[current].cta}
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <a
                    href="tel:+254118266666"
                    className="inline-block border border-white/40 text-white px-6 py-3 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase hover:border-white/70 hover:bg-white/10 transition-all duration-300"
                  >
                    CALL US
                  </a>
                </div>
              </div>
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/12">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`block transition-all duration-500 ${
                    i === current
                      ? 'w-10 h-[2px] bg-gold'
                      : 'w-4 h-[2px] bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
              <span className="ml-auto text-white/30 text-[9px] font-sans tracking-widest">
                {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  )
}
