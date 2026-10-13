'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectAmenity } from '@/data/projects'

const DWELL = 5500

export default function AmenityShowcase({ amenities }: { amenities: ProjectAmenity[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = (i: number) => setActive((i + amenities.length) % amenities.length)

  useEffect(() => {
    if (paused || amenities.length < 2) return
    const t = setTimeout(() => setActive((a) => (a + 1) % amenities.length), DWELL)
    return () => clearTimeout(t)
  }, [active, paused, amenities.length])

  if (amenities.length === 0) return null
  const current = amenities[active]

  return (
    <section
      className="relative h-[78vh] sm:h-[82vh] lg:h-[88vh] bg-dark overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background — crossfades with a slow Ken Burns zoom */}
      <AnimatePresence>
        <motion.div
          key={current.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: DWELL / 1000 + 1.5, ease: 'linear' }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.label}
              fill
              priority
              sizes="100vw"
              quality={82}
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-dark/92 via-dark/15 to-dark/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/50 via-transparent to-transparent" />

      {/* Prev / Next */}
      {amenities.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous amenity"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/25 bg-dark/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next amenity"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/25 bg-dark/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 pb-6 sm:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl mb-8 sm:mb-10"
            >
              <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-3">
                Amenities · {String(active + 1).padStart(2, '0')} / {String(amenities.length).padStart(2, '0')}
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium tracking-tight leading-[1.05] mb-4">
                {current.label}
              </h3>
              <p className="text-white/70 text-[13.5px] sm:text-sm font-sans font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Horizontal amenity menu — auto-advances with the background,
              click any item to jump straight to it */}
          {amenities.length > 1 && (
            <div className="border border-white/15 bg-dark/45 backdrop-blur-md overflow-x-auto no-scrollbar">
              <div className="flex w-max sm:w-full divide-x divide-white/10">
                {amenities.map((a, i) => (
                  <button
                    key={a.label}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative flex-shrink-0 sm:flex-1 text-left px-4 sm:px-5 py-3.5 transition-colors duration-300 ${
                      active === i ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <span
                      className={`block text-[8.5px] font-sans font-semibold tracking-[0.2em] mb-1 transition-colors duration-300 ${
                        active === i ? 'text-gold' : 'text-white/35'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`block text-[10.5px] font-sans font-semibold tracking-[0.08em] uppercase whitespace-nowrap transition-colors duration-300 ${
                        active === i ? 'text-white' : 'text-white/45'
                      }`}
                    >
                      {a.label}
                    </span>
                    {active === i && (
                      <motion.span
                        layoutId="amenity-underline"
                        className="absolute bottom-0 left-4 right-4 sm:left-5 sm:right-5 h-[2px] bg-gold"
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
