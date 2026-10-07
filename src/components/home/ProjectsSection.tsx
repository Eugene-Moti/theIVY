'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, MessageCircle } from 'lucide-react'
import { projects, ProjectUnit } from '@/data/projects'
import { waLink } from '@/lib/contact'

const ORDER = ['ivy-myst', 'ivy-park', 'blossom-ivy', 'luckinn-ivy']

// Per-card override for this section only (doesn't touch the shared
// heroImage used elsewhere, e.g. OG tags, floor plan pages).
const COVER_OVERRIDE: Record<string, string> = {
  'ivy-myst': encodeURI('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png'),
}

const blurbs: Record<string, string> = {
  'blossom-ivy': 'Heated indoor pool, spa, yoga studio and a grand lobby across 22 floors — nearing completion in Kileleshwa.',
  'luckinn-ivy': 'Premium 2 & 3-bedroom apartments with a heated pool, co-working spaces and a business lounge in the heart of Westlands.',
  'ivy-park': '1, 2 & 3-bedroom homes with a rooftop garden, lounge and bar — 660 residences across three blocks near Yaya Centre.',
  'ivy-myst': '1, 2 & 3-bedroom residences with private garden terraces and the rooftop Celestial Pool. Now selling in Kileleshwa.',
}

function priceFrom(units: ProjectUnit[]): string | null {
  const nums = units
    .map((u) => Number(String(u.price).replace(/[^0-9]/g, '')))
    .filter((n) => n > 100000)
  if (!nums.length) return null
  return `From KES ${Math.min(...nums).toLocaleString('en-KE')}`
}

const list = ORDER.map((slug) => projects.find((p) => p.slug === slug)!)

export default function ProjectsSection() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">
              Our Developments
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-dark leading-[1.1]">
              Choose where you&apos;ll live, or invest
            </h2>
          </div>
          <Link
            href="/developments"
            className="hidden sm:inline-flex items-center gap-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-dark/50 hover:text-gold transition-colors flex-shrink-0"
          >
            View all <ArrowRight size={11} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {list.map((proj, i) => {
            const from = priceFrom(proj.availableUnits)
            const cover = COVER_OVERRIDE[proj.slug] ?? proj.heroImage
            // The Ivy Myst override is a portrait render — a plain crop would
            // lose most of it in this landscape box, so it gets a blurred
            // fill behind a fully-visible, uncropped copy on top instead of
            // a hard crop.
            const showFull = proj.slug in COVER_OVERRIDE
            return (
              <motion.article
                key={proj.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-white border border-dark/8 hover:border-gold/40 transition-colors flex flex-col"
              >
                <Link href={`/${proj.slug}`} className="relative aspect-[16/10] overflow-hidden block bg-dark">
                  {showFull && (
                    <Image
                      src={cover}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={55}
                      className="object-cover scale-110 blur-2xl opacity-50"
                    />
                  )}
                  <Image
                    src={cover}
                    alt={proj.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={84}
                    className={showFull
                      ? 'object-contain'
                      : 'object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]'
                    }
                  />
                  <span className="absolute top-4 left-4 bg-dark/75 backdrop-blur-sm px-3 py-[6px] text-white text-[8px] font-sans font-semibold tracking-[0.2em]">
                    {proj.statusLabel}
                  </span>
                </Link>

                <div className="p-7 lg:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin size={11} className="text-gold flex-shrink-0" />
                    <p className="text-gold text-[9px] font-sans font-semibold tracking-[0.24em] uppercase">
                      {proj.locationLabel}
                    </p>
                  </div>

                  <Link href={`/${proj.slug}`}>
                    <h3
                      className="font-serif text-2xl text-dark font-light leading-tight mb-3 group-hover:text-gold transition-colors"
                      style={{ letterSpacing: '0.01em' }}
                    >
                      {proj.name}
                    </h3>
                  </Link>

                  <p className="text-dark/50 text-[13px] font-sans font-light leading-[1.8] mb-6 flex-1">
                    {blurbs[proj.slug]}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-6 text-dark/40 text-[10.5px] font-sans tracking-wide">
                    {proj.floors > 0 && <span>{proj.floors} floors</span>}
                    {proj.totalUnits > 0 && <span>{proj.totalUnits.toLocaleString()} residences</span>}
                    <span>{proj.completion}</span>
                    {from && <span className="text-dark/70 font-medium">{from}</span>}
                  </div>

                  <div className="flex gap-2.5">
                    <Link
                      href={`/${proj.slug}`}
                      className="flex-1 text-center bg-dark text-white py-3 text-[10px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-gold-dark transition-colors"
                    >
                      View development
                    </Link>
                    <a
                      href={waLink(proj.name)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`WhatsApp about ${proj.name}`}
                      className="flex items-center justify-center border border-dark/20 text-dark/60 w-12 hover:border-gold hover:text-gold transition-colors"
                    >
                      <MessageCircle size={15} />
                    </a>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
