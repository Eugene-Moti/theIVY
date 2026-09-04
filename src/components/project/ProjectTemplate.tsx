'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, MapPin, Download, Phone, Check,
  ChevronLeft, ChevronRight, X, MessageCircle, ExternalLink,
} from 'lucide-react'
import { ProjectData, ProjectUnit, getOtherProjects } from '@/data/projects'
import BrochureModal from '@/components/shared/BrochureModal'

const PHONE_RAW = '+254118266666'
const PHONE_PRETTY = '+254 118 266 666'

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

const btnPrimary =
  'inline-flex items-center gap-2 bg-dark text-white px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-gold-dark transition-colors duration-300'
const btnGreen =
  'inline-flex items-center gap-2 bg-gold-dark text-white px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-dark transition-colors duration-300'
const btnGhost =
  'inline-flex items-center gap-2 border border-dark/25 text-dark px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-dark hover:text-white transition-all duration-300'
const btnGhostLight =
  'inline-flex items-center gap-2 border border-white/35 text-white px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-white hover:text-dark transition-all duration-300'

function waLink(project: string, unit?: string) {
  const msg = `Hello, I'm interested in ${unit ? `the ${unit} at ` : ''}${project}. Could you share more details?`
  return `https://wa.me/254118266666?text=${encodeURIComponent(msg)}`
}

function priceFrom(units: ProjectUnit[]): string | null {
  const nums = units
    .map((u) => Number(String(u.price).replace(/[^0-9]/g, '')))
    .filter((n) => n > 100000)
  if (!nums.length) return null
  return `From KES ${Math.min(...nums).toLocaleString('en-KE')}`
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-[10px] font-sans font-semibold tracking-[0.32em] uppercase ${light ? 'text-gold-light' : 'text-gold'}`}>
      {children}
    </p>
  )
}

function Heading({
  children,
  light = false,
  className = '',
}: {
  children: React.ReactNode
  light?: boolean
  className?: string
}) {
  return (
    <h2
      className={`font-serif font-light leading-[1.08] ${light ? 'text-white' : 'text-dark'} ${className}`}
      style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', letterSpacing: '0.006em' }}
    >
      {children}
    </h2>
  )
}

export default function ProjectTemplate({ data }: { data: ProjectData }) {
  const [brochureOpen, setBrochureOpen] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const others = getOtherProjects(data.slug)
  const from = priceFrom(data.availableUnits)
  const shortName = data.name.replace(/\s+Residence$/, '')
  const wa = waLink(data.name)
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.locationFull)}`

  const galleryImages = [
    ...(data.gallerySlides?.map((g) => ({ src: g.src, label: g.label })) ?? []),
    ...(data.interiorImages?.map((src, i) => ({ src, label: `Interior ${i + 1}` })) ?? []),
  ]

  const facts = [
    { k: 'Location', v: data.locationFull },
    { k: 'Type', v: data.type },
    ...(data.floors > 0 ? [{ k: 'Floors', v: String(data.floors) }] : []),
    ...(data.totalUnits > 0 ? [{ k: 'Residences', v: data.totalUnits.toLocaleString() }] : []),
    { k: 'Completion', v: data.completion },
    { k: 'Parking', v: data.parking },
  ]

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const step = useCallback(
    (dir: number) =>
      setLightbox((l) => (l === null ? null : (l + dir + galleryImages.length) % galleryImages.length)),
    [galleryImages.length],
  )

  useEffect(() => {
    if (lightbox === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, closeLightbox, step])

  return (
    <>
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative min-h-[86vh] flex items-end bg-dark overflow-hidden">
        <Image
          src={data.heroImage}
          alt={data.name}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/25 to-dark/45" />

        <div className="absolute top-24 right-6 lg:right-10 z-10 flex items-center gap-2 border border-white/25 bg-dark/40 backdrop-blur-md px-4 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-light" />
          <span className="text-white text-[9px] font-sans font-semibold tracking-[0.22em]">{data.statusLabel}</span>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pb-14 lg:pb-20 pt-36">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow light>{data.locationLabel}</Eyebrow>
            <h1
              className="font-serif text-white font-light mt-4 mb-5"
              style={{ fontSize: 'clamp(2.6rem, 6.2vw, 5.2rem)', letterSpacing: '0.012em', lineHeight: 1.02 }}
            >
              {data.name}
            </h1>
            <p className="text-white/70 font-sans font-light text-base max-w-xl mb-9 leading-relaxed">
              {data.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#residences" className={btnGreen}>
                View Residences <ArrowRight size={13} />
              </a>
              <button type="button" onClick={() => setBrochureOpen(true)} className={btnGhostLight}>
                <Download size={13} /> Brochure
              </button>
              {from && <span className="text-white/60 text-sm font-sans ml-1">{from}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── QUICK FACTS ─────────────── */}
      <section className="bg-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-7 gap-x-4">
          {facts.map((f) => (
            <div key={f.k}>
              <p className="text-white/35 text-[9px] font-sans tracking-[0.22em] uppercase mb-1.5">{f.k}</p>
              <p className="text-white text-[13px] font-sans font-light leading-snug">{f.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── OVERVIEW ─────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Eyebrow>Overview</Eyebrow>
          <Heading className="mt-3">{shortName}</Heading>

          {data.descriptionBlocks ? (
            <div className="mt-12 space-y-12">
              {data.descriptionBlocks.map((block, i) => {
                if (block.type === 'text')
                  return (
                    <motion.p
                      key={i}
                      {...fade}
                      className="text-dark/65 font-sans font-light text-[15px] leading-[1.95]"
                    >
                      {block.content}
                    </motion.p>
                  )
                if (block.type === 'image')
                  return (
                    <motion.figure key={i} {...fade} className="lg:-mx-24">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image src={block.src!} alt={block.caption || ''} fill className="object-cover" sizes="90vw" quality={86} />
                      </div>
                      {block.caption && (
                        <figcaption className="mt-3 lg:mx-24 text-dark/40 text-[10px] font-sans tracking-[0.16em] uppercase">
                          {block.caption}
                        </figcaption>
                      )}
                    </motion.figure>
                  )
                if (block.type === 'image-pair')
                  return (
                    <motion.div key={i} {...fade} className="lg:-mx-24 grid grid-cols-2 gap-3">
                      {block.images?.map((img, j) => (
                        <figure key={j}>
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image src={img.src} alt={img.caption || ''} fill className="object-cover" sizes="45vw" quality={84} />
                          </div>
                          {img.caption && (
                            <figcaption className="mt-2 text-dark/40 text-[9px] font-sans tracking-[0.14em] uppercase">
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </motion.div>
                  )
                return null
              })}
            </div>
          ) : (
            <div className="mt-10 space-y-6">
              {data.descriptionParagraphs.map((para, i) => (
                <motion.p key={i} {...fade} className="text-dark/65 font-sans font-light text-[15px] leading-[1.95]">
                  {para}
                </motion.p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─────────────── RESIDENCES & PRICING ─────────────── */}
      <section id="residences" className="bg-cream py-20 lg:py-28 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Eyebrow>Residences &amp; Pricing</Eyebrow>
          <Heading className="mt-3 mb-4">Available Homes</Heading>
          <p className="text-dark/55 text-sm font-sans font-light max-w-lg leading-relaxed mb-12">
            Prices are indicative and subject to availability. Flexible payment plans are available — typically a
            20% deposit with the balance spread through construction.
          </p>

          {data.availableUnits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.availableUnits.map((u) => (
                <div key={u.type} className="bg-white border border-dark/10 p-7 flex flex-col hover:border-gold/40 transition-colors">
                  <p className="text-gold text-[9px] font-sans font-semibold tracking-[0.22em] uppercase mb-4">Available</p>
                  <h3 className="font-serif text-lg text-dark font-normal mb-1.5" style={{ letterSpacing: '0.01em' }}>
                    {u.type}
                  </h3>
                  <p className="text-dark/45 text-xs font-sans mb-6">{u.size}</p>
                  <p className="font-serif text-dark text-[1.4rem] font-light mb-6 mt-auto">{u.price}</p>
                  <a
                    href={waLink(data.name, u.type)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-center bg-dark text-white py-3 text-[10px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-gold-dark transition-colors"
                  >
                    Enquire
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-dark/55 text-sm font-sans">Contact our team for current availability and pricing.</p>
          )}

          {data.soldOutUnits.length > 0 && (
            <div className="mt-9 border-t border-dark/10 pt-6">
              <p className="text-dark/35 text-[10px] font-sans tracking-[0.22em] uppercase mb-3">Sold Out</p>
              <div className="flex flex-wrap gap-x-7 gap-y-1.5">
                {data.soldOutUnits.map((u) => (
                  <span key={u.type} className="text-dark/40 text-[13px] font-sans">
                    {u.type} <span className="text-dark/25">· {u.size}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="mt-10 text-dark/50 text-xs font-sans font-light">
            Detailed floor plans are in the brochure.{' '}
            <button
              type="button"
              onClick={() => setBrochureOpen(true)}
              className="text-gold font-semibold hover:text-gold-dark underline underline-offset-2 transition-colors"
            >
              Download the brochure
            </button>
            .
          </p>
        </div>
      </section>

      {/* ─────────────── AMENITIES ─────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Eyebrow>Amenities</Eyebrow>
          <Heading className="mt-3 mb-12">Life at {shortName}</Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-11">
            {data.amenities.map((a, i) => (
              <motion.div
                key={a.label}
                {...fade}
                transition={{ ...fade.transition, delay: (i % 3) * 0.06 }}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-5">
                  <Image
                    src={a.image}
                    alt={a.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={85}
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="font-serif text-lg text-dark font-normal mb-2" style={{ letterSpacing: '0.01em' }}>
                  {a.label}
                </h3>
                <p className="text-dark/55 text-[13px] font-sans font-light leading-[1.8]">{a.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 border-t border-dark/10 pt-10">
            <p className="text-dark/35 text-[10px] font-sans tracking-[0.24em] uppercase mb-6">Every Residence Includes</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3">
              {data.amenityList.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-[13px] text-dark/65 font-sans font-light leading-snug">
                  <Check size={13} className="text-gold shrink-0 mt-1" strokeWidth={2.5} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── GALLERY ─────────────── */}
      {galleryImages.length > 0 && (
        <section className="bg-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Eyebrow>Gallery</Eyebrow>
            <Heading className="mt-3 mb-12">A Closer Look</Heading>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={`relative overflow-hidden group ${i % 5 === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-[4/3]'}`}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    quality={80}
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-dark/0 group-hover:bg-dark/15 transition-colors duration-300" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────── VIRTUAL TOURS ─────────────── */}
      {data.vrTours && data.vrTours.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <Eyebrow>Virtual Tours</Eyebrow>
            <Heading className="mt-3 mb-12">Walk Through in 360°</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.vrTours.map((tour) => (
                <a key={tour.title} href={tour.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <Image
                      src={tour.thumbnail}
                      alt={tour.title}
                      fill
                      sizes="33vw"
                      quality={80}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-dark/35 group-hover:bg-dark/20 transition-colors flex items-center justify-center">
                      <span className="w-14 h-14 rounded-full border border-white/70 flex items-center justify-center group-hover:border-gold-light transition-colors">
                        <span className="w-0 h-0 border-y-[7px] border-y-transparent border-l-[12px] border-l-white ml-1 group-hover:border-l-gold-light transition-colors" />
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 bg-dark/60 backdrop-blur-sm px-2.5 py-1 text-white text-[8px] font-sans tracking-[0.18em]">
                      {tour.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-dark font-normal mb-1.5 group-hover:text-gold transition-colors" style={{ letterSpacing: '0.01em' }}>
                    {tour.title}
                  </h3>
                  <p className="text-dark/50 text-[12px] font-sans font-light leading-[1.7]">{tour.description}</p>
                  <span className="mt-2.5 inline-flex items-center gap-1.5 text-[9px] font-sans font-semibold tracking-[0.18em] uppercase text-gold group-hover:text-gold-dark transition-colors">
                    Launch tour <ExternalLink size={9} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────── THE CASE ─────────────── */}
      <section className="bg-dark py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Eyebrow light>The Case for {shortName}</Eyebrow>
          <Heading light className="mt-3 mb-10">Why Invest Here</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
            {data.investmentPoints.map((p, i) => (
              <motion.div key={i} {...fade} className="flex gap-3.5 py-5 border-b border-white/10">
                <Check size={14} className="text-gold-light shrink-0 mt-1" strokeWidth={2.5} />
                <p className="text-white/70 text-[13.5px] font-sans font-light leading-relaxed">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── LOCATION ─────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <Eyebrow>Location</Eyebrow>
            <Heading className="mt-3 mb-7">{data.locationFull}</Heading>
            <ul className="space-y-3.5 mb-9">
              {data.locationAdvantages.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[13.5px] text-dark/65 font-sans font-light leading-snug">
                  <MapPin size={13} className="text-gold shrink-0 mt-1" />
                  {a}
                </li>
              ))}
            </ul>
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-gold hover:text-gold-dark transition-colors"
            >
              Get directions <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="h-[380px] lg:h-[440px] border border-dark/10">
            <iframe
              src={data.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map — ${data.name}`}
            />
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="bg-cream py-20 lg:py-24 border-t border-dark/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Eyebrow>{data.statusLabel}</Eyebrow>
          <Heading className="mt-3 mb-4">Arrange a Private Viewing</Heading>
          <p className="text-dark/55 text-sm font-sans font-light max-w-md mx-auto leading-relaxed mb-9">
            Visit the Ivy Park sales suite on Kirichwa Road, Kilimani — or speak with a consultant about {shortName}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${PHONE_RAW}`} className={btnPrimary}>
              <Phone size={13} /> {PHONE_PRETTY}
            </a>
            <a href={wa} target="_blank" rel="noreferrer" className={btnGhost}>
              <MessageCircle size={13} /> WhatsApp
            </a>
            <button type="button" onClick={() => setBrochureOpen(true)} className={btnGhost}>
              <Download size={13} /> Brochure
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────── RELATED ─────────────── */}
      {others.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <Eyebrow>Explore More</Eyebrow>
            <Heading className="mt-3 mb-12">Other Developments</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {others.map((proj) => (
                <Link key={proj.slug} href={`/${proj.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden mb-5">
                    <Image
                      src={proj.heroImage}
                      alt={proj.name}
                      fill
                      sizes="33vw"
                      quality={80}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-3 left-3 bg-dark/60 backdrop-blur-sm px-2.5 py-1 text-white text-[8px] font-sans font-semibold tracking-[0.18em]">
                      {proj.statusLabel}
                    </span>
                  </div>
                  <p className="text-gold text-[8.5px] font-sans font-semibold tracking-[0.22em] uppercase mb-2">
                    {proj.locationLabel}
                  </p>
                  <h3 className="font-serif text-lg text-dark font-normal leading-tight mb-3 group-hover:text-gold transition-colors" style={{ letterSpacing: '0.01em' }}>
                    {proj.name}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase text-dark/40 group-hover:text-gold transition-colors">
                    Explore <ArrowRight size={9} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────── MOBILE STICKY CTA ─────────────── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-dark/95 backdrop-blur border-t border-white/10 px-4 py-2.5 flex items-center gap-3 pr-[92px]">
        <div className="min-w-0 flex-1">
          <p className="text-white/40 text-[8px] font-sans tracking-[0.22em] uppercase">
            {from ? 'Priced from' : data.name}
          </p>
          <p className="text-white text-[13px] font-sans font-medium truncate">
            {from ?? 'Enquire for pricing'}
          </p>
        </div>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0 bg-gold-dark text-white px-4 py-2.5 text-[10px] font-sans font-semibold tracking-[0.16em] uppercase"
        >
          Enquire
        </a>
      </div>

      {/* ─────────────── LIGHTBOX ─────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-dark/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(-1) }}
              aria-label="Previous"
              className="absolute left-3 md:left-8 text-white/50 hover:text-white transition-colors p-2"
            >
              <ChevronLeft size={30} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(1) }}
              aria-label="Next"
              className="absolute right-3 md:right-8 text-white/50 hover:text-white transition-colors p-2"
            >
              <ChevronRight size={30} />
            </button>
            <div className="relative w-full max-w-5xl aspect-[3/2]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].label}
                fill
                className="object-contain"
                sizes="92vw"
                quality={90}
              />
            </div>
            <p className="absolute bottom-5 inset-x-0 text-center text-white/45 text-[10px] font-sans tracking-[0.2em] uppercase">
              {galleryImages[lightbox].label} — {lightbox + 1} / {galleryImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        projectName={data.name}
        brochurePath={data.brochurePath}
      />
    </>
  )
}
