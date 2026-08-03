'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { MapPin, Check, ArrowRight, Download, Phone, X, ChevronLeft, ChevronRight, ZoomIn, Pause, Play } from 'lucide-react'
import BrochureModal from '@/components/shared/BrochureModal'

const p = (path: string) => encodeURI(path)

const vp = { once: false, margin: '-80px' }

type FloorPlanTab = 'overview' | 'wing-a' | 'wing-b'
type LightboxImage = { src: string; label: string }

// ─── DATA ───────────────────────────────────────────────────────────────────

const wingAPlans: LightboxImage[] = [
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 01 -3BR 213SQM.jpg'), label: 'Unit 1 — 3 Bed + DSQ · 213 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 02 Odd - 3BR 217SQM.jpg'), label: 'Unit 2 Odd Floors — 3 Bed + Garden · 217 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 02 Even - 3BR 231QM.jpg'), label: 'Unit 2 Even Floors — 3 Bed + Garden · 231 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 03&04 -1BR 84SQM.jpg'), label: 'Units 3 & 4 — 1 Bed + Garden · 84 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 05&06 - 2BR 142SQM.jpg'), label: 'Units 5 & 6 — 2 Bed + Garden · 142 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 07 Odd- 2BR 146SQM.jpg'), label: 'Unit 7 Odd Floors — 2 Bed + Garden · 146 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 07 Even- 2BR 159SQM.jpg'), label: 'Unit 7 Even Floors — 2 Bed + Garden · 159 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 08-2BR 142SQM.jpg'), label: 'Unit 8 — 2 Bedroom · 142 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 09&010&11 -1BR 79SQM.jpg'), label: 'Units 9, 10 & 11 — 1 Bedroom · 79 SQM' },
]

const wingBPlans: LightboxImage[] = [
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 01 - 3BR 212SQM.jpg'), label: 'Unit 1 — 3 Bed + DSQ · 212 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 02 - 3BR 169SQM.jpg'), label: 'Unit 2 — 3 Bed + DSQ · 169 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 03 - 2BR 128SQM.jpg'), label: 'Unit 3 — 2 Bedroom · 128 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 04 - 2BR 128SQM.jpg'), label: 'Unit 4 — 2 Bedroom · 128 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 05 - 2BR 121SQM.jpg'), label: 'Unit 5 — 2 Bedroom · 121 SQM' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 07&08 -1BR 79SQM.jpg'), label: 'Units 7 & 8 — 1 Bedroom · 79 SQM' },
]


const interiorImages: LightboxImage[] = [
  { src: p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (1).png'), label: 'Living & Dining' },
  { src: p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (5).png'), label: 'Master Bedroom' },
  { src: p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (6).png'), label: 'Kitchen' },
  { src: p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (7).png'), label: 'Living Room' },
  { src: p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (8).png'), label: 'Master Suite' },
  { src: p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (10).png'), label: 'Dining Space' },
  { src: p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (12).png'), label: 'Bedroom' },
]

const exteriorImages: LightboxImage[] = [
  { src: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.png'), label: 'Day View' },
  { src: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png'), label: 'Night View' },
  { src: p('/Ivy Myst Assets/New Renders/Exterior/Gate Front View.png'), label: 'Gate' },
  { src: p('/Ivy Myst Assets/New Renders/Exterior/Rooftop Deck Exterior day view.png'), label: 'Rooftop Deck' },
  { src: p('/Ivy Myst Assets/New Renders/Exterior/Rooftop view to the city.png'), label: 'Rooftop City View' },
  { src: p('/Ivy Myst Assets/New Renders/Exterior/Rooftop Surrounding Views.png'), label: 'Rooftop Surrounds' },
]

const gallerySlides = [
  {
    src: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.png'),
    label: 'The Architecture',
    category: 'EXTERIOR',
    description: "The sweeping curved facade of Ivy Myst rises above Gatundu Road, Kileleshwa — a landmark that redefines the neighbourhood's skyline and sets a new standard for architectural ambition in Nairobi.",
  },
  {
    src: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop Celestial Pool.png'),
    label: 'Celestial Rooftop Pool',
    category: 'AMENITY',
    description: 'An infinity pool with signature waterfall, perched at the apex of Ivy Myst. Morning laps with a city-wide view. Twilight drinks as Nairobi lights up below. A feature unlike anything else in the city.',
  },
  {
    src: p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (1).png'),
    label: 'Living & Dining',
    category: 'INTERIOR',
    description: 'Premium marble floors, bespoke cabinetry and carefully curated joinery define every living space at Ivy Myst. Expansive openings frame the city beyond, bringing the outside in.',
  },
  {
    src: p('/Ivy Myst Assets/New Renders/Exterior/Rooftop view to the city.png'),
    label: 'Above Nairobi',
    category: 'ROOFTOP',
    description: 'From the rooftop of Ivy Myst, Nairobi stretches in every direction. This uninterrupted panorama — available to all residents — transforms an ordinary evening into an unforgettable experience.',
  },
  {
    src: p('/Ivy Myst Assets/New Renders/Myst amenities/rooftop restaurant.png'),
    label: 'Rooftop Restaurant',
    category: 'DINING',
    description: "Nairobi's most elevated dining destination. An inspired menu, curated interiors and a panoramic backdrop make every meal at Ivy Myst's rooftop restaurant a memory worth keeping.",
  },
  {
    src: p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (5).png'),
    label: 'Master Bedroom',
    category: 'INTERIOR',
    description: 'Generous proportions, premium finishes and considered lighting design make the master bedrooms at Ivy Myst a genuine sanctuary — designed for deep rest and quiet morning light.',
  },
  {
    src: p('/Ivy Myst Assets/New Renders/Myst amenities/garden stream.png'),
    label: 'Garden Stream',
    category: 'LANDSCAPE',
    description: "A sculpted water feature flows through the heart of Ivy Myst's landscaped gardens — an unexpected moment of nature in Kileleshwa. The sound of water, the scent of greenery, the feeling of home.",
  },
  {
    src: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png'),
    label: 'After Dark',
    category: 'EXTERIOR',
    description: 'As Nairobi comes alive at night, Ivy Myst glows. The illuminated facade, rooftop bar lights, garden lanterns — a development that looks as remarkable by night as it does by day.',
  },
]

const amenityShowcases = [
  {
    label: 'Celestial Rooftop Pool',
    image: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop Celestial Pool.png'),
    description: 'An infinity pool with signature waterfall, positioned at the apex of Ivy Myst. Overlooking the Nairobi skyline, the Celestial Pool is a landmark in itself — a destination for morning laps and twilight gatherings high above the city.',
  },
  {
    label: 'Rooftop Restaurant & Bar',
    image: p('/Ivy Myst Assets/New Renders/Myst amenities/rooftop restaurant.png'),
    description: "Nairobi's most elevated dining experience combines panoramic city views with an inspired menu. As evening falls, the rooftop bar takes centre stage — signature cocktails and a shimmering skyline backdrop unlike anywhere else in the city.",
  },
  {
    label: 'Gym & Yoga Studio',
    image: p('/Ivy Myst Assets/New Renders/Myst amenities/gym and yoga space.jpg'),
    description: 'A state-of-the-art gymnasium paired with a dedicated yoga and meditation studio — designed for residents who prioritise wellness as a way of life. Every piece of equipment chosen with precision, every corner of the studio built for focus.',
  },
  {
    label: 'Garden Stream',
    image: p('/Ivy Myst Assets/New Renders/Myst amenities/garden stream.png'),
    description: "A sculptural water feature flowing through Ivy Myst's lush landscaped gardens — a rare element of tranquillity in the heart of Kileleshwa. Nature integrated into architecture, creating a living centrepiece at the development's core.",
  },
  {
    label: 'Grand Reception',
    image: p('/Ivy Myst Assets/New Renders/Myst amenities/reception area.png'),
    description: "First impressions define a residence. Ivy Myst's grand reception lobby is a sculptural statement — soaring ceilings, premium marble finishes, and dedicated concierge service that sets the standard from the moment you arrive.",
  },
]

const units = [
  { type: '1 Bedroom', sizes: '78–84 SQM', priceRange: 'KES 8.8M – 10.5M', roiU: '13.67%', roiF: '19.75%', note: 'Garden terrace on select units' },
  { type: '2 Bedroom', sizes: '121–159 SQM', priceRange: 'KES 14.2M – 20.4M', roiU: '10.95%', roiF: '15.17%', note: 'Garden terrace options available' },
  { type: '3 Bedroom + DSQ', sizes: '169–231 SQM', priceRange: 'KES 19.8M – 29.6M', roiU: '12.06%', roiF: '18.09%', note: 'DSQ & garden terrace on select units' },
]

// ─── LIGHTBOX ───────────────────────────────────────────────────────────────

function Lightbox({ images, initialIndex, onClose }: { images: LightboxImage[]; initialIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(initialIndex)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, images.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] bg-black/96 flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" onClick={e => e.stopPropagation()}>
        <p className="text-white/35 text-[10px] font-sans tracking-[0.28em] uppercase">
          {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </p>
        <p className="text-white/45 text-xs font-sans hidden md:block">{images[current].label}</p>
        {/* Prominent close button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white px-4 py-2 transition-all"
        >
          <X size={14} />
          <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase">Close</span>
        </button>
      </div>

      {/* Image area */}
      <div className="flex-1 relative min-h-0" onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image src={images[current].src} alt={images[current].label} fill className="object-contain" quality={95} sizes="90vw" />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next */}
        <div className="absolute inset-y-0 left-0 flex items-center px-3">
          <button
            onClick={() => setCurrent(i => (i - 1 + images.length) % images.length)}
            className="w-11 h-11 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-3">
          <button
            onClick={() => setCurrent(i => (i + 1) % images.length)}
            className="w-11 h-11 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Click-to-close hint */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 text-[9px] font-sans tracking-widest uppercase pointer-events-none">
          Click outside image · Press ESC to close
        </p>
      </div>

      {/* Thumbnail strip */}
      <div className="flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-3 overflow-x-auto" onClick={e => e.stopPropagation()}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-shrink-0 w-12 h-8 relative overflow-hidden border-2 transition-all duration-300 ${i === current ? 'border-gold opacity-100' : 'border-white/15 opacity-40 hover:opacity-70'}`}
          >
            <Image src={img.src} alt="" fill className="object-cover" sizes="48px" quality={40} />
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// ─── GALLERY CAROUSEL ────────────────────────────────────────────────────────

function GalleryCarousel({ onOpen }: { onOpen: (i: number) => void }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = gallerySlides.length

  const paginate = useCallback((dir: number) => {
    setDirection(dir)
    setCurrent(c => (c + dir + total) % total)
  }, [total])

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
  }

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => paginate(1), 6000)
    return () => clearInterval(t)
  }, [paused, paginate])

  const imgVariants = {
    enter: (d: number) => ({ opacity: 0, scale: 1.06, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } },
    exit: (d: number) => ({ opacity: 0, scale: 0.97, x: d < 0 ? 40 : -40, transition: { duration: 0.55 } }),
  }

  const textVariants = {
    enter: { opacity: 0, y: 22 },
    center: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
    exit: { opacity: 0, y: -14, transition: { duration: 0.3 } },
  }

  return (
    <section
      className="bg-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image stage */}
      <div className="relative overflow-hidden" style={{ height: '72vh' }}>
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={current}
            custom={direction}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 cursor-zoom-in"
            onClick={() => onOpen(current)}
          >
            <Image
              src={gallerySlides[current].src}
              alt={gallerySlides[current].label}
              fill
              quality={92}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Side arrows */}
        <button
          onClick={e => { e.stopPropagation(); paginate(-1) }}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/70 hover:bg-white/10 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={e => { e.stopPropagation(); paginate(1) }}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/70 hover:bg-white/10 transition-all"
        >
          <ChevronRight size={20} />
        </button>

        {/* Pause/play */}
        <button
          onClick={e => { e.stopPropagation(); setPaused(p => !p) }}
          className="absolute bottom-5 right-5 z-10 w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 transition-all"
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-10">
          {!paused && (
            <motion.div
              key={`prog-${current}`}
              className="h-full bg-gold"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 6, ease: 'linear' }}
            />
          )}
        </div>
      </div>

      {/* Text panel */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 py-8 lg:py-10 items-end">

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-white/25 text-[9px] font-sans tracking-[0.3em] uppercase">
                    {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                  <span className="w-px h-3 bg-white/15" />
                  <span className="text-gold text-[9px] font-sans tracking-[0.28em] uppercase font-semibold">
                    {gallerySlides[current].category}
                  </span>
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-light mb-3 leading-[1.2]">
                  {gallerySlides[current].label}
                </h3>
                <p className="text-white/45 text-sm font-sans font-light leading-[1.85] max-w-2xl">
                  {gallerySlides[current].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dot nav */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {gallerySlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-400 ${i === current ? 'w-8 h-[2px] bg-gold' : 'w-2 h-[2px] bg-white/25 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FLOOR PLAN CAROUSEL ─────────────────────────────────────────────────────

function FloorPlanCarousel({ plans, onOpen }: { plans: LightboxImage[]; onOpen: (i: number) => void }) {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(0)
  const total = plans.length

  const go = (i: number) => {
    setDir(i > active ? 1 : -1)
    setActive(i)
  }

  const prev = () => go(Math.max(0, active - 1))
  const next = () => go(Math.min(total - 1, active + 1))

  const cardVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: (d: number) => ({ opacity: 0, x: d < 0 ? 60 : -60, transition: { duration: 0.3 } }),
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Main plan viewer */}
      <div
        className="relative bg-[#f5f4f0] border border-dark/8 overflow-hidden cursor-zoom-in group"
        style={{ aspectRatio: '4/3' }}
        onClick={() => onOpen(active)}
      >
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={active}
            custom={dir}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center p-6 lg:p-10"
          >
            <div className="relative w-full h-full">
              <Image
                src={plans[active].src}
                alt={plans[active].label}
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Zoom hint */}
        <div className="absolute top-3 right-3 bg-dark/25 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn size={14} className="text-white" />
        </div>
      </div>

      {/* Label + navigation */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-dark/35 text-[9px] font-sans tracking-widest uppercase mb-0.5 truncate">
                {plans[active].label.split('·')[0].trim()}
              </p>
              <p className="text-gold text-sm font-sans font-medium">
                {plans[active].label.split('·')[1]?.trim() ?? ''}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-dark/30 text-[10px] font-sans tabular-nums">
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            onClick={prev}
            disabled={active === 0}
            className="w-9 h-9 border border-dark/15 flex items-center justify-center text-dark/40 hover:text-dark hover:border-dark/40 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            disabled={active === total - 1}
            className="w-9 h-9 border border-dark/15 flex items-center justify-center text-dark/40 hover:text-dark hover:border-dark/40 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-2 pb-1">
          {plans.map((plan, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-shrink-0 w-14 h-10 relative border-2 overflow-hidden transition-all duration-300 ${
                i === active ? 'border-gold' : 'border-dark/10 opacity-50 hover:opacity-80 hover:border-dark/25'
              }`}
            >
              <Image src={plan.src} alt="" fill className="object-contain p-1 bg-[#f5f4f0]" sizes="56px" quality={30} />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function IvyMystTemplate() {
  const [brochureOpen, setBrochureOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<FloorPlanTab>('overview')
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null)

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const openLB = (images: LightboxImage[], index: number) => setLightbox({ images, index })

  // Gallery lightbox opens into all gallery slides
  const galleryLbImages: LightboxImage[] = gallerySlides.map(s => ({ src: s.src, label: s.label }))

  return (
    <>
      <AnimatePresence>
        {lightbox && (
          <Lightbox images={lightbox.images} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-dark">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src={p('/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.png')}
            alt="Ivy Myst"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/45 to-dark/15" />

        <motion.div
          className="relative h-full flex flex-col justify-end pb-16 max-w-7xl mx-auto px-6 lg:px-10"
          style={{ opacity: heroOpacity }}
        >
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.3 }}>
            <div className="flex items-center gap-2 mb-5">
              <MapPin size={11} className="text-gold" />
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.28em] uppercase">GATUNDU ROAD, KILELESHWA</p>
            </div>
            <h1 className="font-serif text-[clamp(4rem,10vw,8rem)] text-white font-light leading-[0.95] mb-5">Ivy Myst</h1>
            <p className="text-white/60 text-sm font-sans font-light max-w-md leading-relaxed mb-3">
              1, 2 &amp; 3 Bedroom Luxury Residences with Garden Terraces
            </p>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.25em] uppercase">
                Now Selling · Completion August 2029
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#units"
                className="bg-gold text-dark px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
              >
                VIEW UNITS & PRICING
              </a>
              <button
                type="button"
                onClick={() => setBrochureOpen(true)}
                className="flex items-center gap-2 border border-white/50 text-white px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
              >
                <Download size={12} /> DOWNLOAD BROCHURE
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── OVERVIEW STRIP ── */}
      <div className="bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-3 lg:grid-cols-6 divide-x divide-white/10 border-t border-b border-white/10">
            {[
              { label: 'Location', value: 'Kileleshwa' },
              { label: 'Type', value: 'Luxury Residences' },
              { label: 'Wings', value: 'A & B' },
              { label: 'Units', value: '1, 2 & 3 Bed' },
              { label: 'Completion', value: 'Aug 2029' },
              { label: 'Status', value: 'Now Selling' },
            ].map(item => (
              <div key={item.label} className="py-5 px-4 text-center">
                <p className="text-white/30 text-[8px] font-sans tracking-[0.2em] uppercase mb-1">{item.label}</p>
                <p className="text-white text-[11px] font-sans font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── IN-PAGE NAV ── */}
      <nav className="sticky top-16 lg:top-[72px] z-30 bg-white border-b border-dark/8 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 flex items-center">
          {[
            { href: '#overview', label: 'Overview' },
            { href: '#units', label: 'Residences' },
            { href: '#amenities', label: 'Amenities' },
            { href: '#gallery', label: 'Gallery' },
            { href: '#floor-plans', label: 'Floor Plans' },
            { href: '#location', label: 'Location' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              className="flex-shrink-0 px-4 py-4 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-dark/40 hover:text-gold border-b-2 border-transparent hover:border-gold transition-all"
            >
              {item.label}
            </a>
          ))}
          <div className="ml-auto pl-4 flex-shrink-0">
            <button
              type="button"
              onClick={() => setBrochureOpen(true)}
              className="flex items-center gap-1.5 py-4 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase text-gold"
            >
              <Download size={10} /> BROCHURE
            </button>
          </div>
        </div>
      </nav>

      {/* ── OVERVIEW / DESCRIPTION ── */}
      <section id="overview" className="py-24 lg:py-36 bg-white scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2"
            >
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">THE DEVELOPMENT</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-[1.1] mb-5">
                A New Icon<br />for Nairobi
              </h2>
              <div className="w-12 h-[2px] bg-gold mb-7" />
              <p className="text-dark/60 text-sm font-sans font-light leading-[1.9] mb-4">
                Ivy Myst is a landmark luxury residential development on Gatundu Road, Kileleshwa. Following a celebrated groundbreaking ceremony, sales are now officially open — offering buyers the opportunity to secure one of Nairobi's most architecturally distinctive addresses.
              </p>
              <p className="text-dark/60 text-sm font-sans font-light leading-[1.9] mb-4">
                Comprising two wings of generously proportioned 1, 2 and 3 bedroom residences — many with private garden terraces — Ivy Myst raises the benchmark for luxury living in Nairobi. Its sweeping curved architecture, lush green balconies, and world-class rooftop amenities define an entirely new standard for the city.
              </p>
              <p className="text-dark/60 text-sm font-sans font-light leading-[1.9] mb-7">
                From the sculptural reception lobby to the signature Celestial Pool overlooking the Nairobi skyline. Estimated completion: <strong className="text-dark/80 font-medium">August 2029</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Wing A & B', 'Garden Terraces', 'Rooftop Amenities', 'Aug 2029'].map(tag => (
                  <span key={tag} className="border border-dark/15 text-dark/50 text-[9px] font-sans tracking-widest px-3 py-1.5 uppercase">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="lg:col-span-3 flex flex-col gap-3"
            >
              <div
                className="relative overflow-hidden cursor-zoom-in group"
                style={{ aspectRatio: '16/8' }}
                onClick={() => openLB(exteriorImages, 0)}
              >
                <Image src={exteriorImages[0].src} alt="Ivy Myst Day Exterior" fill quality={92} sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute top-3 right-3 bg-dark/50 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={14} className="text-white" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {exteriorImages.slice(1, 3).map((img, i) => (
                  <div key={i} className="relative overflow-hidden cursor-zoom-in group" style={{ aspectRatio: '4/3' }} onClick={() => openLB(exteriorImages, i + 1)}>
                    <Image src={img.src} alt={img.label} fill quality={90} sizes="(max-width: 768px) 50vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                    <div className="absolute top-3 right-3 bg-dark/50 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={13} className="text-white" /></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ROOFTOP PANORAMA ── */}
      <motion.div
        className="relative overflow-hidden cursor-zoom-in group"
        style={{ height: '60vh' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: '-40px' }}
        transition={{ duration: 0.8 }}
        onClick={() => openLB(exteriorImages, 4)}
      >
        <motion.div className="absolute inset-0" initial={{ scale: 1.06 }} whileInView={{ scale: 1 }} viewport={{ once: false, margin: '-40px' }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
          <Image src={p('/Ivy Myst Assets/New Renders/Exterior/Rooftop view to the city.png')} alt="Ivy Myst Rooftop City View" fill quality={92} sizes="100vw" className="object-cover object-center" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/65 via-dark/20 to-transparent" />
        <motion.div className="absolute bottom-10 left-10 lg:left-16" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: '-40px' }} transition={{ duration: 0.7, delay: 0.3 }}>
          <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-2">NAIROBI SKYLINE</p>
          <p className="font-serif text-white text-3xl lg:text-5xl font-light">Above the City</p>
        </motion.div>
        <div className="absolute top-4 right-4 bg-dark/50 p-2 opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={16} className="text-white" /></div>
      </motion.div>

      {/* ── UNITS & PRICING ── */}
      <section id="units" className="py-24 lg:py-32 bg-cream scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.75, ease: 'easeOut' }} className="mb-14">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">UNITS & PRICING</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-tight">Available Residences</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
            <p className="text-dark/45 text-sm font-sans font-light mt-4 max-w-lg leading-relaxed">
              Select units include private garden terraces — a rare offering in Nairobi. 20% deposit secures your unit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {units.map((unit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.6, delay: i * 0.12 }} className="bg-white border border-dark/8 hover:border-gold/30 transition-colors overflow-hidden">
                <div className="p-7">
                  <p className="text-gold text-[9px] font-sans font-semibold tracking-[0.25em] uppercase mb-3">AVAILABLE NOW</p>
                  <h3 className="font-serif text-2xl text-dark font-light mb-1">{unit.type}</h3>
                  <p className="text-dark/40 text-xs font-sans mb-0.5">{unit.sizes}</p>
                  <p className="text-dark/30 text-[10px] font-sans italic mb-5">{unit.note}</p>
                  <div className="border-t border-dark/8 pt-4 mb-4">
                    <p className="text-dark/35 text-[9px] font-sans tracking-widest uppercase mb-1">PRICE RANGE</p>
                    <p className="font-serif text-xl text-dark">{unit.priceRange}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-dark/4 p-3 text-center">
                      <p className="text-dark/30 text-[8px] font-sans tracking-widest uppercase mb-1.5">ROI Unfurnished</p>
                      <p className="text-dark font-sans font-bold text-base">{unit.roiU}</p>
                    </div>
                    <div className="bg-gold/8 border border-gold/20 p-3 text-center">
                      <p className="text-dark/30 text-[8px] font-sans tracking-widest uppercase mb-1.5">ROI Furnished</p>
                      <p className="text-gold font-sans font-bold text-base">{unit.roiF}</p>
                    </div>
                  </div>
                </div>
                <button type="button" onClick={() => setBrochureOpen(true)} className="w-full py-3.5 bg-dark/3 hover:bg-gold/8 text-dark/50 hover:text-gold text-[9px] font-sans font-semibold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-1.5 border-t border-dark/8">
                  ENQUIRE ABOUT THIS UNIT <ArrowRight size={10} />
                </button>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-dark/30 text-[10px] font-sans tracking-wider mt-6">
            Mortgage financing available · Instalment plan available throughout construction
          </p>
        </div>
      </section>

      {/* ── AMENITIES — Full-width editorial showcases ── */}
      <section id="amenities" className="scroll-mt-32">
        <div className="bg-dark py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.75, ease: 'easeOut' }}>
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">LIFESTYLE</p>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-white leading-[1.05] mb-6">World-Class Amenities</h2>
              <div className="w-12 h-[2px] bg-gold" />
            </motion.div>
          </div>
        </div>

        {amenityShowcases.map((amenity, i) => {
          const imgLeft = i % 2 === 0
          return (
            <div
              key={amenity.label}
              className={`flex flex-col lg:flex-row lg:h-[90vh] ${imgLeft ? '' : 'lg:flex-row-reverse'}`}
            >
              {/* ── Image panel — curtain wipe reveal ── */}
              <div className="relative overflow-hidden lg:w-[55%] h-[52vh] lg:h-full">
                <div className="absolute inset-0">
                  <Image src={amenity.image} alt={amenity.label} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 80vw" quality={92} />
                </div>
                <motion.div
                  className="absolute inset-0 bg-dark"
                  style={{ originX: imgLeft ? 0 : 1 }}
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: false, margin: '-20px' }}
                  transition={{ duration: 1.35, ease: [0.76, 0, 0.24, 1] }}
                />
              </div>

              {/* ── Text panel — slides in from opposite side ── */}
              <div className={`relative overflow-hidden lg:w-[45%] flex items-center ${i % 2 === 0 ? 'bg-white' : 'bg-cream'}`}>
                {/* Ghost number watermark */}
                <span
                  className="absolute font-serif font-light select-none pointer-events-none leading-none"
                  style={{
                    fontSize: 'clamp(10rem, 22vw, 16rem)',
                    color: 'rgba(0,0,0,0.035)',
                    bottom: '-1.5rem',
                    [imgLeft ? 'right' : 'left']: '-0.5rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative px-10 lg:px-14 xl:px-18 py-16 lg:py-24 w-full">
                  {/* Number + rule */}
                  <motion.div
                    className="flex items-center gap-4 mb-7"
                    initial={{ opacity: 0, x: imgLeft ? 48 : -48 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  >
                    <span className="text-gold font-sans text-[9px] font-semibold tracking-[0.35em] tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px bg-gold/30" style={{ width: '3rem' }} />
                  </motion.div>

                  {/* Heading */}
                  <motion.h3
                    className="font-serif font-light text-dark leading-[1.1] mb-6"
                    style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.9rem)' }}
                    initial={{ opacity: 0, x: imgLeft ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: '-60px' }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
                  >
                    {amenity.label}
                  </motion.h3>

                  {/* Expanding underline */}
                  <motion.div
                    className="bg-gold mb-7"
                    style={{ height: '1.5px' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '2.5rem' }}
                    viewport={{ once: false, margin: '-60px' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                  />

                  {/* Description */}
                  <motion.p
                    className="text-dark/55 font-sans font-light text-[13.5px] leading-[2] max-w-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.7 }}
                  >
                    {amenity.description}
                  </motion.p>
                </div>
              </div>
            </div>
          )
        })}

        <div className="bg-dark py-16 lg:py-20 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.7 }}>
              <p className="text-white/30 text-[10px] font-sans tracking-[0.3em] uppercase mb-8">ALL AMENITIES</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {['Celestial Rooftop Pool with Waterfall','Rooftop Bar & Lounge','Rooftop & Indoor Restaurant','Gymnasium & Yoga Studio','Sculptural Garden Stream','Grand Lobby Reception','Private Garden Terraces (select units)','Smart Home Features','High-Speed Elevators','24-Hour Security & CCTV','Borehole Water Supply','Backup Generator'].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <Check size={13} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white/60 text-sm font-sans font-light">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INTERIORS ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.75, ease: 'easeOut' }} className="mb-14">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">INTERIORS</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-tight">Crafted to Perfection</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
            <p className="text-dark/45 text-sm font-sans font-light mt-4 max-w-xl leading-relaxed">
              Premium marble floors, bespoke kitchen and joinery, and curated interiors that define luxury living.
            </p>
          </motion.div>
          <div className="flex flex-col gap-4">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp} transition={{ duration: 0.8 }} className="relative overflow-hidden cursor-zoom-in group w-full" style={{ aspectRatio: '21/8' }} onClick={() => openLB(interiorImages, 0)}>
              <motion.div className="absolute inset-0" initial={{ scale: 1.04 }} whileInView={{ scale: 1 }} viewport={vp} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
                <Image src={interiorImages[0].src} alt={interiorImages[0].label} fill quality={92} sizes="100vw" className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4 bg-dark/50 p-2 opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={16} className="text-white" /></div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {interiorImages.slice(1).map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.55, delay: i * 0.07 }} className="relative overflow-hidden cursor-zoom-in group" style={{ aspectRatio: '4/3' }} onClick={() => openLB(interiorImages, i + 1)}>
                  <Image src={img.src} alt={img.label} fill quality={90} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity"><p className="text-white text-xs font-sans tracking-widest uppercase">{img.label}</p></div>
                  <div className="absolute top-3 right-3 bg-dark/50 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={13} className="text-white" /></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY CAROUSEL ── */}
      <div id="gallery" className="scroll-mt-32">
        <div className="bg-white px-6 lg:px-10 pt-20 pb-10">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.75, ease: 'easeOut' }}>
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">THE FULL PICTURE</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-tight">Gallery</h2>
              <div className="w-12 h-[2px] bg-gold mt-5" />
            </motion.div>
          </div>
        </div>
        <GalleryCarousel onOpen={i => openLB(galleryLbImages, i)} />
      </div>

      {/* ── FLOOR PLANS ── */}
      <section id="floor-plans" className="py-24 lg:py-32 bg-cream scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.75, ease: 'easeOut' }} className="mb-10">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">FLOOR PLANS</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-tight">Unit Layouts</h2>
            <div className="w-12 h-[2px] bg-gold mt-5 mb-3" />
            <p className="text-dark/40 text-[11px] font-sans tracking-wide flex items-center gap-1.5">
              <ZoomIn size={12} className="text-gold" /> Click any plan to view fullscreen · Navigate with arrows or thumbnails
            </p>
          </motion.div>

          {/* Tab switcher */}
          <div className="flex border border-dark/15 w-fit mb-8">
            {([
              { key: 'overview', label: 'Full Overview' },
              { key: 'wing-a', label: 'Wing A (9 units)' },
              { key: 'wing-b', label: 'Wing B (6 units)' },
            ] as { key: FloorPlanTab; label: string }[]).map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase transition-colors ${
                  activeTab === tab.key ? 'bg-dark text-white' : 'text-dark/40 hover:text-dark hover:bg-dark/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <div
                  className="bg-white border border-dark/8 cursor-zoom-in group overflow-hidden"
                  onClick={() => openLB([{ src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/IVY MYST FULL FLOOR PLAN.jpg'), label: 'Full Floor Plan Overview — Wing A & B' }], 0)}
                >
                  <div className="relative w-full" style={{ aspectRatio: '7/5' }}>
                    <Image src={p('/Ivy Myst Assets/Ivy Myst Floor-plans/IVY MYST FULL FLOOR PLAN.jpg')} alt="Ivy Myst Full Floor Plan" fill quality={95} sizes="100vw" className="object-contain p-4 lg:p-10 transition-transform duration-500 group-hover:scale-[1.01]" />
                  </div>
                  <div className="border-t border-dark/8 px-6 py-4 flex items-center justify-between">
                    <p className="text-dark/35 text-[10px] font-sans tracking-wider uppercase">Wing A & B — All Unit Types</p>
                    <p className="text-gold text-[9px] font-sans font-semibold tracking-wider uppercase flex items-center gap-1"><ZoomIn size={11} /> Click to Expand</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'wing-a' && (
              <motion.div key="wing-a" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="max-w-2xl">
                <FloorPlanCarousel plans={wingAPlans} onOpen={i => openLB(wingAPlans, i)} />
              </motion.div>
            )}

            {activeTab === 'wing-b' && (
              <motion.div key="wing-b" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="max-w-2xl">
                <FloorPlanCarousel plans={wingBPlans} onOpen={i => openLB(wingBPlans, i)} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 text-center">
            <button type="button" onClick={() => setBrochureOpen(true)} className="inline-flex items-center gap-2 border border-dark text-dark px-8 py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-dark hover:text-white transition-all">
              <Download size={12} /> DOWNLOAD BROCHURE WITH ALL FLOOR PLANS
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY INVEST ── */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">WHY INVEST</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight mb-5">Secure Your Unit Now</h2>
              <div className="w-12 h-[2px] bg-gold mb-8" />
              <ul className="space-y-4">
                {['Groundbreaking completed — construction actively underway','Early-stage pricing for maximum capital appreciation','ROI up to 19.75% furnished (1 bedroom)','Prime Kileleshwa address, proven rental demand','Garden terraces — rare offering in Nairobi','Flexible: 20% deposit, balance through construction','The Ivy Group — 10+ years of on-time delivery'].map(point => (
                  <li key={point} className="flex items-start gap-3">
                    <Check size={13} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white/65 text-sm font-sans font-light leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="flex flex-col gap-5">
              <div className="border border-white/10 p-7">
                <p className="text-white/30 text-[10px] font-sans tracking-[0.2em] uppercase mb-5">PROJECTED RETURNS</p>
                <div className="space-y-0">
                  {units.map((u, i) => (
                    <div key={i} className={`flex items-center justify-between py-4 ${i < units.length - 1 ? 'border-b border-white/8' : ''}`}>
                      <div>
                        <p className="text-white text-xs font-sans font-medium">{u.type}</p>
                        <p className="text-white/30 text-[10px] font-sans mt-0.5">{u.sizes}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gold font-sans font-semibold text-sm">{u.roiF} <span className="text-[10px] font-normal text-white/35">furnished</span></p>
                        <p className="text-white/45 text-xs mt-0.5">{u.roiU} <span className="text-[10px] text-white/25">unfurnished</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => setBrochureOpen(true)} className="flex items-center justify-center gap-2 border border-gold text-gold py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold hover:text-dark transition-all duration-300">
                <Download size={13} /> DOWNLOAD FULL BROCHURE
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section id="location" className="py-24 lg:py-32 bg-cream scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.75, ease: 'easeOut' }} className="mb-10">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">LOCATION</p>
            <h2 className="font-serif text-4xl font-light text-dark">Gatundu Road, Kileleshwa</h2>
            <div className="w-12 h-[2px] bg-gold mt-4 mb-4" />
            <p className="text-dark/45 text-sm font-sans font-light max-w-lg leading-relaxed">
              Positioned in one of Nairobi's most prestigious residential addresses — minutes from Westlands, the CBD, top schools, and major amenities.
            </p>
          </motion.div>
          <div className="w-full overflow-hidden" style={{ height: '500px' }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.3640841920273!2d36.7854601!3d-1.2774497999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f171eb89deccd%3A0xe0d248c01f726963!2sIVY%20MYST%20RESIDENCE!5e1!3m2!1sen!2ske!4v1785406432997!5m2!1sen!2ske" width="100%" height="100%" className="border-0" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Ivy Myst — Gatundu Road, Kileleshwa" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.75, ease: 'easeOut' }}>
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">SECURE YOUR RESIDENCE</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">Own a Piece of Ivy Myst</h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mb-7" />
            <p className="text-white/50 text-sm font-sans font-light max-w-md mx-auto leading-relaxed mb-8">
              Units are selling. Contact our sales team today to discuss availability, pricing, and flexible payment plans.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button type="button" onClick={() => setBrochureOpen(true)} className="inline-flex items-center gap-2.5 bg-gold text-dark px-10 py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors">
                <Download size={13} /> DOWNLOAD BROCHURE
              </button>
              <a href="tel:+254118266666" className="inline-flex items-center gap-2.5 border border-white/50 text-white px-10 py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-white/10 transition-all">
                <Phone size={13} /> CALL US NOW
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OTHER DEVELOPMENTS ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.75, ease: 'easeOut' }} className="mb-12">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">EXPLORE MORE</p>
            <h2 className="font-serif text-4xl font-light text-dark">Other Developments</h2>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Blossom Ivy Residence', location: 'KILELESHWA', image: p('/Blossoms Ivy Residence Assets/Exterior/Blossoms_Ivy exterior.png'), href: '/blossom-ivy' },
              { name: 'Luckinn Ivy Residence', location: 'WESTLANDS', image: p('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Exterior.png'), href: '/luckinn-ivy' },
              { name: 'Ivy Park Residence', location: 'KILIMANI', image: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg'), href: '/ivy-park' },
            ].map((proj, i) => (
              <motion.div key={proj.href} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <Link href={proj.href} className="group block overflow-hidden">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <Image src={proj.image} alt={proj.name} fill quality={82} sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/15 to-transparent" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-gold text-[9px] font-sans font-semibold tracking-widest uppercase mb-1">{proj.location}</p>
                      <h3 className="font-serif text-white text-xl font-light">{proj.name}</h3>
                      <p className="text-white/45 text-[10px] font-sans mt-1 flex items-center gap-1">VIEW PROJECT <ArrowRight size={10} /></p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        projectName="Ivy Myst"
        brochurePath={p('/Ivy Myst Assets/IvyMystBrochure.pdf')}
      />
    </>
  )
}
