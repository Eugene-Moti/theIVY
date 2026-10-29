'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const p = (path: string) => encodeURI(path)

const STATS = [
  { value: '2017', label: 'Established' },
  { value: '4', label: 'Active Developments' },
  { value: '3', label: 'Completed Projects' },
  { value: '1,400+', label: 'Residences' },
]

interface Slide {
  status: string
  name: string
  location: string
  description: string
  href: string
  cta: string
  video: string
  poster: string
}

const SLIDES: Slide[] = [
  {
    status: 'Now Selling',
    name: 'Ivy Myst Residence',
    location: 'Kileleshwa',
    description:
      'Curved architecture, garden terraces and a rooftop Celestial Pool on Gatundu Road. Groundbreaking is complete — now selling at early-stage pricing.',
    href: '/ivy-myst',
    cta: 'Explore Ivy Myst',
    video: p('/Ivy Myst Assets/New Renders/ivy myst landscape_1_squished.mp4'),
    poster: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png'),
  },
  {
    status: 'Under Construction',
    name: 'Ivy Park Residence',
    location: 'Kilimani',
    description:
      'Three residential towers with a rooftop cinema, lounge and bar — 660 homes minutes from Yaya Centre. Structural works are underway, with completion targeted for December 2028.',
    href: '/ivy-park',
    cta: 'Explore Ivy Park',
    video: p('/Ivy Myst Assets/New Renders/IVY PARK WIDE_squished.mp4'),
    poster: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Night new_Ivy Park.jpg'),
  },
]

const DWELL = 9000

export default function FeatureRow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => setReducedMotion(mqMotion.matches)
    onMotion()
    mqMotion.addEventListener('change', onMotion)
    return () => mqMotion.removeEventListener('change', onMotion)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setActive((a) => (a + 1) % SLIDES.length), DWELL)
    return () => clearTimeout(t)
  }, [active, paused])

  const slide = SLIDES[active]
  // Autoplay everywhere, including mobile — only reduced-motion
  // visitors get the poster frame instead.
  const showVideo = !reducedMotion

  return (
    <section
      className="bg-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Milestone banner — full-bleed, the brand stats blended into a real
          render instead of sitting on a flat block */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75 }}
        className="relative overflow-hidden min-h-[280px] sm:min-h-[260px] mb-3 lg:mb-4 flex items-center"
      >
        <div className="absolute inset-0">
          <Image
            src={p('/Ivy Myst Assets/New Renders/Exterior/Rooftop Deck Exterior day view.png')}
            alt=""
            fill
            sizes="100vw"
            quality={72}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/55" />
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">
              The Ivy Group · Est. 2017
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-medium tracking-tight leading-[1.1] max-w-sm">
              Landmark addresses across Nairobi.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-7 lg:gap-x-8 gap-y-6 flex-shrink-0">
            {STATS.map((s) => (
              <div key={s.label} className="border-l border-white/20 pl-4 max-w-[130px]">
                <p className="font-serif text-2xl sm:text-3xl text-white font-light mb-1 tabular-nums">{s.value}</p>
                <p className="text-white/45 text-[9px] sm:text-[10px] font-sans tracking-[0.14em] uppercase leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Full-bleed rotating video showcase — Ivy Myst / Ivy Park toggle
          top-right, content bottom-left, crossfading on every change. */}
      <div className="relative h-[72vh] sm:h-[78vh] lg:h-[84vh] bg-dark">
        <AnimatePresence>
          <motion.div
            key={slide.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {showVideo ? (
              <video
                key={slide.video}
                autoPlay
                muted
                loop
                playsInline
                poster={slide.poster}
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={slide.video} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={slide.poster}
                alt={`${slide.name}, ${slide.location}`}
                fill
                sizes="100vw"
                quality={80}
                className="object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-dark/92 via-dark/25 to-dark/10" />

        {/* Toggle */}
        <div className="absolute top-6 right-6 lg:top-8 lg:right-10 z-10 inline-flex border border-white/20 bg-dark/50 backdrop-blur-sm overflow-hidden">
          {SLIDES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`px-4 py-2.5 text-[10px] font-sans font-semibold tracking-[0.16em] uppercase transition-colors duration-300 ${
                active === i ? 'bg-gold text-dark' : 'text-white/60 hover:text-white'
              }`}
            >
              {s.name.replace(' Residence', '')}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="relative h-full flex items-end">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 pb-12 sm:pb-16 lg:pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">
                  {slide.status}
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05] mb-6 max-w-2xl">
                  {slide.name}, {slide.location}
                </h3>
                <p className="text-white/65 text-[14px] font-sans font-light leading-[1.85] mb-9 max-w-lg">
                  {slide.description}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2.5 bg-gold text-dark px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-gold-light transition-colors"
                >
                  {slide.cta} <ArrowRight size={13} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
