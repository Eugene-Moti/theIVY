'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const units = [
  { bed: '1 BED', size: '79–84 SQM', price: 'From KES 8.8M' },
  { bed: '2 BED', size: '121–159 SQM', price: 'From KES 14.2M' },
  { bed: '3 BED', size: '169–231 SQM', price: 'From KES 19.8M' },
]

export default function LaunchSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={encodeURI('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png')}
          alt="Ivy Myst Residence — Now Selling"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/92 via-dark/72 to-dark/40" />
        <div className="absolute inset-0 bg-dark/25" />
      </div>

      {/* Content */}
      <div className="relative py-28 lg:py-36 max-w-7xl mx-auto px-6 lg:px-10">
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

            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white font-semibold leading-[0.95] mb-5" style={{ letterSpacing: '-0.035em' }}>
              Ivy Myst Residence
            </h2>

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
                className="border border-white/15 bg-white/5 backdrop-blur-sm p-5 text-center hover:border-gold/50 transition-colors duration-300"
              >
                <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.2em] uppercase mb-2">
                  {unit.bed}
                </p>
                <p className="text-white/80 text-xs font-sans mb-1">{unit.size}</p>
                <div className="h-px w-8 bg-white/15 mx-auto my-2.5" />
                <p className="text-white text-[11px] font-sans font-light leading-snug">
                  {unit.price}
                </p>
              </motion.div>
            ))}

            <div className="col-span-3 text-center mt-2">
              <p className="text-white/30 text-[10px] font-sans tracking-wider">
                Now selling · Flexible payment plans available
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
