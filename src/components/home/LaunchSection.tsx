'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

const units = [
  { bed: '1 BED', size: '78 SQM', price: 'From KES 8.8M' },
  { bed: '2 BED', size: '121 SQM', price: 'From KES 14.2M' },
  { bed: '3 BED', size: '169 SQM', price: 'From KES 19.8M' },
]

export default function LaunchSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={encodeURI('/Ivy Myst Assets/RoofDeck.jpg')}
          alt="Ivy Myst Residence"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Layered dark overlay — left side darker for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
        <div className="absolute inset-0 bg-dark/30" />
      </div>

      {/* Content */}
      <div className="relative py-28 lg:py-36 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            {/* "Now Launching" badge */}
            <div className="inline-flex items-center gap-2 border border-gold/60 bg-gold/10 text-gold px-4 py-2 mb-8">
              <Sparkles size={11} />
              <span className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase">
                Now Launching
              </span>
            </div>

            <p className="text-white/50 text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-3">
              Kileleshwa, Nairobi
            </p>

            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white font-light leading-[1.0] mb-5">
              Ivy Myst
            </h2>

            <p className="text-white/65 text-sm font-sans font-light tracking-wide leading-relaxed max-w-sm mb-8">
              1, 2 &amp; 3 bedroom luxury residences in the heart of Kileleshwa —
              private pre-launch sales now open.
            </p>

            {/* 0% offer highlight */}
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8 bg-gold flex-shrink-0" />
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.2em] uppercase">
                0% Transaction Fees &middot; Valid 30 Days
              </p>
            </div>

            <Link
              href="/ivy-myst"
              className="inline-flex items-center gap-3 bg-gold text-dark px-9 py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300 group"
            >
              SECURE YOUR UNIT
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — unit cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-3 gap-4"
          >
            {units.map((unit, i) => (
              <motion.div
                key={unit.bed}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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

            {/* Footnote */}
            <div className="col-span-3 text-center mt-2">
              <p className="text-white/30 text-[10px] font-sans tracking-wider">
                Pre-launch pricing · Limited availability
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
