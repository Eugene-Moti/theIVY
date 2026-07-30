'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Check, ArrowRight, Download, Phone } from 'lucide-react'
import BrochureModal from '@/components/shared/BrochureModal'

const p = (path: string) => encodeURI(path)

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

type FloorPlanTab = 'overview' | 'wing-a' | 'wing-b'

const floorPlanTabs = [
  { key: 'overview' as FloorPlanTab, label: 'Full Overview' },
  { key: 'wing-a' as FloorPlanTab, label: 'Wing A' },
  { key: 'wing-b' as FloorPlanTab, label: 'Wing B' },
]

const wingAPlans = [
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 01 -3BR 213SQM.jpg'), label: '3 Bed + DSQ', size: '213 SQM', unit: 'Unit 1' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 02 Odd - 3BR 217SQM.jpg'), label: '3 Bed + Garden', size: '217 SQM', unit: 'Unit 2 — Odd Floors' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 02 Even - 3BR 231QM.jpg'), label: '3 Bed + Garden', size: '231 SQM', unit: 'Unit 2 — Even Floors' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 03&04 -1BR 84SQM.jpg'), label: '1 Bed + Garden', size: '84 SQM', unit: 'Units 3 & 4' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 05&06 - 2BR 142SQM.jpg'), label: '2 Bed + Garden', size: '142 SQM', unit: 'Units 5 & 6' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 07 Odd- 2BR 146SQM.jpg'), label: '2 Bed + Garden', size: '146 SQM', unit: 'Unit 7 — Odd Floors' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 07 Even- 2BR 159SQM.jpg'), label: '2 Bed + Garden', size: '159 SQM', unit: 'Unit 7 — Even Floors' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 08-2BR 142SQM.jpg'), label: '2 Bedroom', size: '142 SQM', unit: 'Unit 8' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 09&010&11 -1BR 79SQM.jpg'), label: '1 Bedroom', size: '79 SQM', unit: 'Units 9, 10 & 11' },
]

const wingBPlans = [
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 01 - 3BR 212SQM.jpg'), label: '3 Bed + DSQ', size: '212 SQM', unit: 'Unit 1' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 02 - 3BR 169SQM.jpg'), label: '3 Bed + DSQ', size: '169 SQM', unit: 'Unit 2' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 03 - 2BR 128SQM.jpg'), label: '2 Bedroom', size: '128 SQM', unit: 'Unit 3' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 04 - 2BR 128SQM.jpg'), label: '2 Bedroom', size: '128 SQM', unit: 'Unit 4' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 05 - 2BR 121SQM.jpg'), label: '2 Bedroom', size: '121 SQM', unit: 'Unit 5' },
  { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 07&08 -1BR 79SQM.jpg'), label: '1 Bedroom', size: '79 SQM', unit: 'Units 7 & 8' },
]

const amenities = [
  { src: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop Celestial Pool.png'), label: 'Celestial Rooftop Pool' },
  { src: p('/Ivy Myst Assets/New Renders/Myst amenities/rooftop restaurant.png'), label: 'Rooftop Restaurant' },
  { src: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop bar area.png'), label: 'Rooftop Bar & Lounge' },
  { src: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop lounge area night view.png'), label: 'Rooftop Lounge' },
  { src: p('/Ivy Myst Assets/New Renders/Myst amenities/gym and yoga space.jpg'), label: 'Gym & Yoga Studio' },
  { src: p('/Ivy Myst Assets/New Renders/Myst amenities/garden stream.png'), label: 'Garden Stream' },
  { src: p('/Ivy Myst Assets/New Renders/Myst amenities/indoor restaurant.png'), label: 'Indoor Restaurant' },
  { src: p('/Ivy Myst Assets/New Renders/Myst amenities/reception area.png'), label: 'Grand Reception' },
]

const interiors = [
  p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (1).png'),
  p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (5).png'),
  p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (6).png'),
  p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (7).png'),
  p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (8).png'),
  p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (10).png'),
  p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (12).png'),
]

const units = [
  { type: '1 Bedroom', sizes: '79 – 84 SQM', price: 'From KES 8,800,000', note: 'Garden terrace on select units' },
  { type: '2 Bedroom', sizes: '121 – 159 SQM', price: 'From KES 14,200,000', note: 'Garden terrace options available' },
  { type: '3 Bedroom + DSQ', sizes: '169 – 231 SQM', price: 'From KES 19,800,000', note: 'DSQ & garden terrace on select units' },
]

export default function IvyMystTemplate() {
  const [brochureOpen, setBrochureOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<FloorPlanTab>('overview')

  return (
    <>
      {/* ── VIDEO HERO ── */}
      <section className="relative h-screen w-full overflow-hidden bg-dark">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={p('/Ivy Myst Assets/New Renders/ivy-myst-bg.webm')} type="video/webm" />
          {/* Fallback image if video can't play */}
          <Image src={p('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png')} alt="Ivy Myst" fill className="object-cover" priority sizes="100vw" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/20" />

        <div className="relative h-full flex flex-col justify-end pb-16 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
            <div className="flex items-center gap-2 mb-5">
              <MapPin size={11} className="text-gold" />
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.28em] uppercase">KILELESHWA, NAIROBI</p>
            </div>
            <div className="mb-4 w-48">
              <Image
                src={p('/Ivy Myst Assets/Ivy Myst Logo.png')}
                alt="Ivy Myst"
                width={192}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-white/65 text-sm font-sans font-light max-w-lg leading-relaxed mb-8">
              1, 2 &amp; 3 Bedroom Luxury Residences with Garden Terraces — Now Selling
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#floor-plans"
                className="bg-gold text-dark px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
              >
                VIEW FLOOR PLANS
              </a>
              <button
                type="button"
                onClick={() => setBrochureOpen(true)}
                className="flex items-center gap-2 border border-white/60 text-white px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
              >
                <Download size={12} /> DOWNLOAD BROCHURE
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW STRIP ── */}
      <div className="bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-white/10 border-t border-b border-white/10">
            {[
              { label: 'Location', value: 'Kileleshwa' },
              { label: 'Type', value: 'Luxury Residences' },
              { label: 'Wings', value: '2 Wings (A & B)' },
              { label: 'Unit Types', value: '1, 2 & 3 Bedroom' },
              { label: 'Status', value: 'Now Selling' },
            ].map(item => (
              <div key={item.label} className="py-5 px-6 text-center">
                <p className="text-white/30 text-[9px] font-sans tracking-[0.2em] uppercase mb-1">{item.label}</p>
                <p className="text-white text-xs font-sans font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESCRIPTION + EXTERIOR ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">THE DEVELOPMENT</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-[1.1] mb-5">Ivy Myst</h2>
              <div className="w-12 h-[2px] bg-gold mb-7" />
              <p className="text-dark/60 text-sm font-sans font-light leading-[1.9] mb-4">
                Ivy Myst is a landmark luxury residential development in the heart of Kileleshwa. Following a celebrated groundbreaking ceremony, sales are now officially open — offering buyers the opportunity to secure one of Nairobi's most architecturally distinctive addresses.
              </p>
              <p className="text-dark/60 text-sm font-sans font-light leading-[1.9] mb-4">
                Comprising two wings of generously proportioned 1, 2 and 3 bedroom residences — many with private garden terraces — Ivy Myst raises the benchmark for luxury living in Nairobi. Its sweeping curved architecture, lush green balconies, and world-class rooftop amenities define an entirely new standard for the city.
              </p>
              <p className="text-dark/60 text-sm font-sans font-light leading-[1.9]">
                Every detail has been considered — from the sculptural reception lobby to the signature Celestial Pool with cascading waterfall overlooking the Nairobi skyline. This is not merely a residence; it is an experience.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {['Wing A & Wing B', 'Garden Terraces', 'Rooftop Amenities', 'Smart Home Ready'].map(tag => (
                  <span key={tag} className="border border-dark/15 text-dark/60 text-[10px] font-sans tracking-wider px-3 py-1.5">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-2 gap-3">
              <div className="col-span-2 relative aspect-[16/7] overflow-hidden">
                <Image src={p('/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.png')} alt="Ivy Myst Day View" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="100vw" />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image src={p('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png')} alt="Ivy Myst Night View" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="50vw" />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image src={p('/Ivy Myst Assets/New Renders/Exterior/Gate Front View.png')} alt="Ivy Myst Gate" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="50vw" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── UNITS & PRICING ── */}
      <section id="units" className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">UNITS & PRICING</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-tight">Available Residences</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {units.map((unit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white p-7 border border-dark/8 hover:border-gold/40 transition-colors"
              >
                <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.2em] uppercase mb-3">AVAILABLE</p>
                <h3 className="font-serif text-xl text-dark font-light mb-2">{unit.type}</h3>
                <p className="text-dark/50 text-xs font-sans mb-1">{unit.sizes}</p>
                <p className="text-dark/35 text-[10px] font-sans italic mb-5">{unit.note}</p>
                <div className="border-t border-dark/8 pt-4 flex items-end justify-between">
                  <div>
                    <p className="text-dark/40 text-[9px] font-sans tracking-widest uppercase mb-1">From</p>
                    <p className="font-serif text-lg text-dark">{unit.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBrochureOpen(true)}
                    className="text-[10px] font-sans font-semibold tracking-wider uppercase text-gold hover:underline flex items-center gap-1"
                  >
                    ENQUIRE <ArrowRight size={10} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">LIFESTYLE</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight">World-Class Amenities</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
          </motion.div>

          {/* Gallery — Celestial Pool spans 2 cols/rows */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {amenities.map((amenity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className={`group relative overflow-hidden ${i === 0 ? 'col-span-2 row-span-2 aspect-[16/9] lg:aspect-auto lg:min-h-[360px]' : 'aspect-[4/3]'}`}
              >
                <Image src={amenity.src} alt={amenity.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                <p className="absolute bottom-4 left-4 text-white text-xs font-sans font-semibold tracking-wider uppercase">{amenity.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Amenity list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Celestial Rooftop Pool with Waterfall Feature',
              'Rooftop Bar & Lounge',
              'Rooftop & Indoor Restaurant',
              'Gymnasium & Yoga Studio',
              'Sculptural Garden Stream',
              'Grand Lobby Reception',
              'Private Garden Terraces (select units)',
              'Smart Home Features',
              'High-Speed Elevators',
              '24-Hour Security & CCTV',
              'Borehole Water Supply',
              'Backup Generator',
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <Check size={13} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                <span className="text-white/60 text-sm font-sans font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CELESTIAL POOL SHOWCASE ── */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src={p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop Celestial Pool.png')}
          alt="Ivy Myst Celestial Rooftop Pool"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark/55" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.35em] uppercase mb-4">CROWNING JEWEL</p>
            <h2 className="font-serif text-4xl md:text-6xl text-white font-light mb-5">The Celestial Rooftop Pool</h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mb-5" />
            <p className="text-white/60 text-sm font-sans font-light max-w-md mx-auto leading-relaxed">
              Perched at the pinnacle of Ivy Myst, a cascading infinity pool with signature waterfall feature looks out over the Nairobi skyline — the defining statement of this extraordinary development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INTERIOR RENDERS ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">INTERIORS</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-tight">Living in Luxury</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
            <p className="text-dark/55 text-sm font-sans font-light mt-5 max-w-2xl leading-relaxed">
              Every residence at Ivy Myst is finished to an uncompromising standard — premium marble floors, bespoke kitchen and joinery, and curated interiors that define contemporary luxury living in Nairobi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interiors.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className={`relative overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'}`}
              >
                <Image
                  src={src}
                  alt={`Ivy Myst Interior ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOOR PLANS ── */}
      <section id="floor-plans" className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">FLOOR PLANS</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-tight">Unit Layouts</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
          </motion.div>

          {/* Tab switcher */}
          <div className="flex border border-dark/15 w-fit mb-8">
            {floorPlanTabs.map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase transition-colors ${
                  activeTab === tab.key
                    ? 'bg-dark text-white'
                    : 'text-dark/50 hover:text-dark hover:bg-dark/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview tab */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-dark/8 p-4 lg:p-8">
              <Image
                src={p('/Ivy Myst Assets/Ivy Myst Floor-plans/IVY MYST FULL FLOOR PLAN.jpg')}
                alt="Ivy Myst Full Floor Plan — Wing A & Wing B"
                width={1400}
                height={1200}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          )}

          {/* Wing A tab */}
          {activeTab === 'wing-a' && (
            <motion.div key="wing-a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {wingAPlans.map((plan, i) => (
                <div key={i} className="bg-white border border-dark/8 hover:border-gold/40 transition-colors overflow-hidden">
                  <div className="relative aspect-[4/3] bg-cream">
                    <Image src={plan.src} alt={`${plan.unit} — ${plan.label}`} fill className="object-contain p-4" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-4 border-t border-dark/8">
                    <p className="text-dark/35 text-[9px] font-sans tracking-[0.2em] uppercase mb-0.5">{plan.unit}</p>
                    <p className="font-serif text-dark text-base font-light">{plan.label}</p>
                    <p className="text-gold text-xs font-sans mt-1">{plan.size}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Wing B tab */}
          {activeTab === 'wing-b' && (
            <motion.div key="wing-b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {wingBPlans.map((plan, i) => (
                <div key={i} className="bg-white border border-dark/8 hover:border-gold/40 transition-colors overflow-hidden">
                  <div className="relative aspect-[4/3] bg-cream">
                    <Image src={plan.src} alt={`${plan.unit} — ${plan.label}`} fill className="object-contain p-4" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-4 border-t border-dark/8">
                    <p className="text-dark/35 text-[9px] font-sans tracking-[0.2em] uppercase mb-0.5">{plan.unit}</p>
                    <p className="font-serif text-dark text-base font-light">{plan.label}</p>
                    <p className="text-gold text-xs font-sans mt-1">{plan.size}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setBrochureOpen(true)}
              className="inline-flex items-center gap-2 border border-dark text-dark px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-dark hover:text-white transition-all"
            >
              <Download size={12} /> DOWNLOAD BROCHURE WITH ALL FLOOR PLANS
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY INVEST ── */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">WHY INVEST</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight mb-5">Why Secure Your Unit Now?</h2>
              <div className="w-12 h-[2px] bg-gold mb-8" />
              <ul className="space-y-4">
                {[
                  'Groundbreaking completed — construction actively underway',
                  'Early-stage pricing for maximum capital appreciation',
                  'Prime Kileleshwa address with proven strong rental demand',
                  'Architecturally distinctive — a landmark on the Nairobi skyline',
                  'Garden terrace units available — a rare offering in Nairobi',
                  'Flexible payment plans: 20% deposit, balance through construction',
                  'Developed by The Ivy Group — 10+ years of on-time delivery',
                ].map(point => (
                  <li key={point} className="flex items-start gap-3">
                    <Check size={13} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white/65 text-sm font-sans font-light leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col gap-5">
              <div className="border border-white/10 p-7">
                <p className="text-white/30 text-[10px] font-sans tracking-[0.2em] uppercase mb-3">LOCATION ADVANTAGES</p>
                <ul className="space-y-2.5">
                  {[
                    'Prestigious Kileleshwa address',
                    'Minutes from Westlands and Nairobi CBD',
                    'Close to top international schools',
                    'Near major hospitals and health facilities',
                    'Shopping malls & supermarkets nearby',
                    'Easy highway and expressway access',
                  ].map(adv => (
                    <li key={adv} className="flex items-center gap-3 text-white/60 text-sm font-sans font-light">
                      <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />{adv}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setBrochureOpen(true)}
                className="flex items-center justify-center gap-2 border border-gold text-gold py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold hover:text-dark transition-all duration-300"
              >
                <Download size={13} />
                DOWNLOAD FULL BROCHURE
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ROOFTOP VIEWS ── */}
      <section className="grid grid-cols-1 md:grid-cols-3">
        {[
          p('/Ivy Myst Assets/New Renders/Exterior/Rooftop Deck Exterior day view.png'),
          p('/Ivy Myst Assets/New Renders/Exterior/Rooftop view to the city.png'),
          p('/Ivy Myst Assets/New Renders/Exterior/Rooftop Surrounding Views.png'),
        ].map((src, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden group">
            <Image src={src} alt={`Ivy Myst Rooftop View ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
          </div>
        ))}
      </section>

      {/* ── LOCATION MAP ── */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">LOCATION</p>
            <h2 className="font-serif text-4xl font-light text-dark">Kileleshwa, Nairobi</h2>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </motion.div>
          <div className="w-full h-[420px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d451.6556133047034!2d36.78503743441678!3d-1.276938025382227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x182f170056423b43%3A0xac4d412392285ae0!2sBLOSSOMS%20IVY%20RESIDENCE%2C%20Nairobi!3m2!1d-1.2771432999999999!2d36.785353199999996!5e1!3m2!1sen!2ske!4v1781850935628!5m2!1sen!2ske"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ivy Myst location map"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">SECURE YOUR RESIDENCE</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">Own a Piece of Ivy Myst</h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mb-7" />
            <p className="text-white/55 text-sm font-sans font-light max-w-md mx-auto leading-relaxed mb-8">
              Units are selling. Contact our sales team today to discuss availability, pricing, and payment plans tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setBrochureOpen(true)}
                className="inline-flex items-center gap-2.5 bg-gold text-dark px-10 py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300"
              >
                <Download size={13} />
                DOWNLOAD BROCHURE
              </button>
              <a
                href="tel:+254118266666"
                className="inline-flex items-center gap-2.5 border border-white/50 text-white px-10 py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300"
              >
                <Phone size={13} />
                CALL US NOW
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OTHER DEVELOPMENTS ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
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
              <motion.div key={proj.href} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <Link href={proj.href} className="group block relative overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={proj.image} alt={proj.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/20 to-transparent" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-gold text-[9px] font-sans font-semibold tracking-widest uppercase mb-1">{proj.location}</p>
                      <h3 className="font-serif text-white text-xl font-light">{proj.name}</h3>
                      <p className="text-white/50 text-[10px] font-sans mt-1 flex items-center gap-1">VIEW PROJECT <ArrowRight size={10} /></p>
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
