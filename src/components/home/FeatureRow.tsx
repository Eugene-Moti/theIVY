'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const p = (path: string) => encodeURI(path)

const STATS = [
  { value: '2017', label: 'Established' },
  { value: '4', label: 'Developments' },
  { value: '3', label: 'Neighbourhoods' },
  { value: '1,400+', label: 'Residences' },
]

interface Slide {
  status: string
  name: string
  location: string
  description: string
  href: string
  cta: string
  big: string
  side1: { src: string; caption: string }
  side2: { src: string; caption: string }
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
    big: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png'),
    side1: { src: p('/Ivy Myst Assets/New Renders/Exterior/Gate Front View.png'), caption: 'Arrival Gate' },
    side2: { src: p('/Ivy Myst Assets/New Renders/Myst amenities/reception area.png'), caption: 'Reception & Lobby' },
  },
  {
    status: 'Under Construction',
    name: 'Ivy Park Residence',
    location: 'Kilimani',
    description:
      'Three residential towers with a rooftop cinema, lounge and bar — 660 homes minutes from Yaya Centre. Structural works are underway, with completion targeted for December 2028.',
    href: '/ivy-park',
    cta: 'Explore Ivy Park',
    big: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Night new_Ivy Park.jpg'),
    side1: { src: p('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Pool_002 Day.png'), caption: 'Pool & Bar' },
    side2: { src: p('/IVY PARK RESIDENCE Assests/COURTYARD/05_Courtyard 5K.png'), caption: 'Landscaped Courtyard' },
  },
]

const DWELL = 6500

export default function FeatureRow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setActive((a) => (a + 1) % SLIDES.length), DWELL)
    return () => clearTimeout(t)
  }, [active, paused])

  const slide = SLIDES[active]

  return (
    <section
      className="bg-white py-20 lg:py-28 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Milestone banner — the brand stats, blended into a real render
            instead of sitting on a flat block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75 }}
          className="relative overflow-hidden mb-16 lg:mb-24 min-h-[280px] sm:min-h-[260px] flex items-center"
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
          <div className="relative w-full px-7 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">
                The Ivy Group · Est. 2017
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-medium tracking-tight leading-[1.1] max-w-sm">
                Landmark addresses across Nairobi.
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 flex-shrink-0">
              {STATS.map((s) => (
                <div key={s.label} className="border-l border-white/20 pl-4">
                  <p className="font-serif text-2xl sm:text-3xl text-white font-light mb-1 tabular-nums">{s.value}</p>
                  <p className="text-white/45 text-[9px] sm:text-[10px] font-sans tracking-[0.18em] uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project tabs */}
        <div className="flex items-center gap-7 mb-10">
          {SLIDES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setActive(i)}
              className={`text-[11px] font-sans font-semibold tracking-[0.18em] uppercase pb-2.5 border-b-2 transition-colors duration-300 ${
                active === i ? 'text-dark border-gold' : 'text-dark/35 border-transparent hover:text-dark/60'
              }`}
            >
              {s.name.replace(' Residence', '')}
            </button>
          ))}
        </div>

        {/* Rotating project showcase — images scatter out / converge in,
            text fades, on every slide change */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="relative min-h-[280px] sm:min-h-[260px]">
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
                <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-dark leading-[1.1] mb-6">
                  {slide.name}, {slide.location}
                </h3>
                <p className="text-dark/55 text-[14px] font-sans font-light leading-[1.85] mb-9 max-w-md">
                  {slide.description}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2.5 bg-dark text-white px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-gold-dark transition-colors"
                >
                  {slide.cta} <ArrowRight size={13} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image cluster */}
          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            {/* Big image spans both rows — row height comes from the two
                side images below, not from this one's own content. */}
            <div className="row-span-2 relative">
              <AnimatePresence>
                <motion.div
                  key={slide.name}
                  initial={{ opacity: 0, x: -90, y: 60, rotate: -9, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 90, y: -60, rotate: 9, scale: 0.92 }}
                  transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Link href={slide.href} className="relative block h-full w-full bg-dark group">
                    <Image
                      src={slide.big}
                      alt={`${slide.name}, ${slide.location}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      quality={84}
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {[slide.side1, slide.side2].map((img, i) => (
              <div key={i}>
                <div className="relative aspect-[4/3] bg-dark">
                  <AnimatePresence>
                    <motion.div
                      key={slide.name}
                      initial={{
                        opacity: 0,
                        x: i === 0 ? 70 : -70,
                        y: i === 0 ? -70 : 70,
                        rotate: i === 0 ? 12 : -12,
                      }}
                      animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                      exit={{
                        opacity: 0,
                        x: i === 0 ? -70 : 70,
                        y: i === 0 ? 70 : -70,
                        rotate: i === 0 ? -12 : 12,
                      }}
                      transition={{ duration: 0.65, delay: 0.18 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={img.src}
                        alt={img.caption}
                        fill
                        sizes="(max-width: 1024px) 50vw, 30vw"
                        quality={82}
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative h-4 mt-3">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={slide.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 text-dark/45 text-[10px] font-sans tracking-[0.14em] uppercase"
                    >
                      {img.caption}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
