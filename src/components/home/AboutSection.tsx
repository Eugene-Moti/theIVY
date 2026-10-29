'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

const highlights = [
  'Delivering premium Nairobi residential developments since 2017',
  'A portfolio of four landmark developments across the city',
  'Prime locations — Kileleshwa, Westlands and Kilimani',
  'A record of on-time delivery and flexible payment plans',
]

// Ivy Myst amenity renders — cycle through these in succession behind the
// "About" copy so the section keeps showing off more of the development.
const p = (path: string) => encodeURI(path)
const AMENITIES_DIR = '/Ivy Myst Assets/New Renders/Myst amenities/'
const EXTERIOR_DIR = '/Ivy Myst Assets/New Renders/Exterior/'
const AMENITY_IMAGES = [
  p(AMENITIES_DIR + '260901_FINAL-Rooftop 25 Pool 05_AZURE IVY.jpg'),
  p(AMENITIES_DIR + '260831_Final_Gym Floor 25th_Creative View 4_AZURE IVY.jpg'),
  p(EXTERIOR_DIR + '260901_Final-ShotArt 01_AZURE IVY.jpg'),
  p(EXTERIOR_DIR + '260901_Final-ShotArt 02_AZURE IVY.jpg'),
  p(AMENITIES_DIR + '260901_FINAL_Massage room_Creaitive Shot_View 1_AZURE IVY.jpg'),
  p(AMENITIES_DIR + '260901_FINAL_Pool And Pood Deck-Creative 4_IVY MYST.jpg'),
  p(AMENITIES_DIR + '260901_FINAL_Restaurant Garden_Creat shot_View 1_Floor 25th_IVY MYST.jpg'),
  p(AMENITIES_DIR + '260901_FINAL_Water Lounge 23rd Floor_Creative View 4_IVY MYST.jpg'),
  p(AMENITIES_DIR + '260901_FINAL_Water Lounge 23rd Floor_View 3_IVY MYST.jpg'),
  p(AMENITIES_DIR + '260901_FINAL_Yoga_Creat shot View 1_Floor 25th_IVY MYST.jpg.jpg'),
  p(AMENITIES_DIR + '260901_FINAL_Yoga_Creat shot View 2_Floor 25th_IVY MYST.jpg'),
  p(AMENITIES_DIR + '260901_FINAL_Gym Weight_Creative shot_View 1_IVY MYST.jpg'),
  p(AMENITIES_DIR + '260901_FINAL_Kids Play-Creative 1_IVY MYST.jpg'),
  p(EXTERIOR_DIR + '260910_FINAL-RooftopAll3_IVY MYST.jpg'),
  p(AMENITIES_DIR + '260910_FINAL_Main Reception_Creative_View 01_IVY MYST.jpg'),
  // IVY MYST MAPPED AMMENITIES.jpg.jpeg — not yet recovered, omitted until found
]

const DWELL = 4500

export default function AboutSection() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % AMENITY_IMAGES.length), DWELL)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="py-24 lg:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center">

          {/* Image column — wider than the text column, and a landscape
              crop so it reads full and doesn't leave dead space beside it */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative"
          >
            {/* Amenity renders cycle through in succession, each with a slow
                Ken Burns zoom, behind the "About" copy */}
            <div className="relative aspect-[4/3] overflow-hidden bg-dark">
              <AnimatePresence>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 1 }, scale: { duration: DWELL / 1000 + 1.5, ease: 'linear' } }}
                  className="absolute inset-0"
                >
                  <Image
                    src={AMENITY_IMAGES[index]}
                    alt="Ivy Myst Residence — Amenities"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 64vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating "Since 2017" card — bottom-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 lg:-right-8 bg-dark px-8 py-6 hidden sm:block"
            >
              <p className="font-serif text-5xl font-light text-white leading-none">2017</p>
              <p className="text-white/50 text-[10px] font-sans tracking-[0.2em] uppercase mt-2">
                Building Since
              </p>
            </motion.div>

            {/* Decorative gold line — top-left accent */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold opacity-60 hidden lg:block" />
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          >
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">
              ABOUT THE IVY GROUP
            </p>

            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-dark leading-[1.1] mb-5">
              Building Modern Communities.<br />
              <span className="italic">Creating Lasting Value.</span>
            </h2>

            {/* Gold rule */}
            <div className="w-12 h-[2px] bg-gold mb-7" />

            <p className="text-dark/65 text-sm font-sans font-light leading-[1.85] mb-8">
              The Ivy Group is a Nairobi residential developer, part of R-Sun Properties. Since 2017 we
              have delivered high-quality developments across the city&apos;s most prestigious
              neighbourhoods — combining refined architecture, premium finishes, and flexible payment
              plans, on time and to specification.
            </p>

            {/* Highlights */}
            <ul className="space-y-3.5 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    size={13}
                    className="text-gold mt-[3px] flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <span className="text-dark/65 text-sm font-sans font-light leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-block border border-dark text-dark px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-dark hover:text-white transition-all duration-300"
            >
              LEARN MORE ABOUT US
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
