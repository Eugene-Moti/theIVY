'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sun, Moon } from 'lucide-react'
import { approxUsd } from '@/lib/currency'

const LOGO = {
  src: encodeURI('/Ivy Myst Assets/Ivy Myst Logo.png'),
  w: 792,
  h: 173,
}

const units = [
  { bed: '1 BED', size: '78–84 SQM', price: 'From KES 8.8M', usd: approxUsd(8_800_000) },
  { bed: '2 BED', size: '121–159 SQM', price: 'From KES 14.2M', usd: approxUsd(14_200_000) },
  { bed: '3 BED', size: '169–231 SQM', price: 'From KES 19.8M', usd: approxUsd(19_800_000) },
]

const DAY_IMAGE = 'https://aspvhjmmaaaivzezsnur.supabase.co/storage/v1/object/public/property-media/Ivymyst/260901_Final-Courtyard%2001_Day_AZURE%20IVY.jpg'
const NIGHT_IMAGE = 'https://aspvhjmmaaaivzezsnur.supabase.co/storage/v1/object/public/property-media/Ivymyst/260901_Final-Courtyard%2001_Night_AZURE%20IVY.jpg'

export default function LaunchSection() {
  const [isDay, setIsDay] = useState(false)

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background — crossfades between the day and night courtyard renders.
          The section is min-h-screen so this image always covers the full
          viewport the moment it scrolls into view, with no sliver of the
          section above or below showing through. */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={isDay ? 'day' : 'night'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={isDay ? DAY_IMAGE : NIGHT_IMAGE}
              alt={`Ivy Myst Residence — Courtyard, ${isDay ? 'day' : 'night'} view`}
              fill
              priority
              quality={82}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/92 via-dark/72 to-dark/40" />
        <div className="absolute inset-0 bg-dark/25" />
      </div>

      {/* Day / Night toggle */}
      <div className="absolute top-6 right-6 lg:top-8 lg:right-10 z-10 inline-flex border border-white/20 bg-dark/50 backdrop-blur-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setIsDay(true)}
          aria-pressed={isDay}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-sans font-semibold tracking-[0.16em] uppercase transition-colors duration-300 ${
            isDay ? 'bg-gold text-dark' : 'text-white/60 hover:text-white'
          }`}
        >
          <Sun size={12} /> Day
        </button>
        <button
          type="button"
          onClick={() => setIsDay(false)}
          aria-pressed={!isDay}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-sans font-semibold tracking-[0.16em] uppercase transition-colors duration-300 ${
            !isDay ? 'bg-gold text-dark' : 'text-white/60 hover:text-white'
          }`}
        >
          <Moon size={12} /> Night
        </button>
      </div>

      {/* Content */}
      <div className="relative w-full py-28 lg:py-36 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            {/* "Now Selling" badge */}
            <div className="inline-flex items-center gap-2 border border-gold/60 bg-gold/10 text-gold px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
              <span className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase">
                Now Selling
              </span>
            </div>

            <p className="text-white/50 text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-3">
              Kileleshwa, Nairobi
            </p>

            <Image
              src={LOGO.src}
              alt="Ivy Myst Residence"
              width={LOGO.w}
              height={LOGO.h}
              className="w-auto object-contain brightness-0 invert mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
              style={{ height: 'clamp(3.5rem, 8vw, 6.5rem)' }}
            />

            <p className="text-white/65 text-sm font-sans font-light tracking-wide leading-relaxed max-w-sm mb-8">
              1, 2 &amp; 3 bedroom luxury residences with garden terraces in the heart
              of Kileleshwa. Groundbreaking complete — sales are now open.
            </p>

            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8 bg-gold flex-shrink-0" />
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.2em] uppercase">
                Rooftop Celestial Pool &middot; Garden Terraces &middot; 2 Wings
              </p>
            </div>

            <Link
              href="/ivy-myst"
              className="inline-flex items-center gap-3 bg-gold text-dark px-9 py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300 group"
            >
              EXPLORE IVY MYST
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — unit cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.85, delay: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-3 gap-4"
          >
            {units.map((unit, i) => (
              <motion.div
                key={unit.bed}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="border border-white/15 bg-dark/70 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)] p-5 text-center hover:border-gold/50 transition-colors duration-300"
              >
                <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.2em] uppercase mb-2">
                  {unit.bed}
                </p>
                <p className="text-white/85 text-xs font-sans mb-1">{unit.size}</p>
                <div className="h-px w-8 bg-white/15 mx-auto my-2.5" />
                <p className="text-white text-[11px] font-sans font-light leading-snug">
                  {unit.price}
                </p>
                <p className="text-white/55 text-[10px] font-sans font-light mt-0.5">
                  ({unit.usd})
                </p>
              </motion.div>
            ))}

            <div className="col-span-3 text-center mt-2">
              <p className="inline-block text-white/70 text-[10px] font-sans tracking-wider bg-dark/60 backdrop-blur-sm px-3 py-1.5">
                Now selling · Flexible payment plans available
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
