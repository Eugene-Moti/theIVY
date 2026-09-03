'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, MapPin, Download, ChevronDown,
  Phone, Check, ExternalLink, ChevronLeft, ChevronRight, Pause, Play,
} from 'lucide-react'
import { ProjectData, GallerySlide, getOtherProjects } from '@/data/projects'
import BrochureModal from '@/components/shared/BrochureModal'

const vp = { once: true, margin: '-80px' }

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={vp}
      transition={{ duration: 0.6 }}
      className="text-gold text-[9px] font-sans font-semibold tracking-[0.35em] uppercase mb-3"
    >
      {children}
    </motion.p>
  )
}

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`font-serif font-medium leading-[1.1] ${light ? 'text-white' : 'text-dark'}`}
      style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', letterSpacing: '-0.025em' }}
    >
      {children}
    </motion.h2>
  )
}

function ProjectGalleryCarousel({ slides }: { slides: GallerySlide[] }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = slides.length

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
      <div className="relative overflow-hidden" style={{ height: '72vh' }}>
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={current}
            custom={direction}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={slides[current].src}
              alt={slides[current].label}
              fill
              quality={92}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

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

        <button
          onClick={e => { e.stopPropagation(); setPaused(p => !p) }}
          className="absolute bottom-5 right-5 z-10 w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 transition-all"
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </button>

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
                    {slides[current].category}
                  </span>
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-light mb-3 leading-[1.2]">
                  {slides[current].label}
                </h3>
                <p className="text-white/45 text-sm font-sans font-light leading-[1.85] max-w-2xl">
                  {slides[current].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2 flex-shrink-0">
              {slides.map((_, i) => (
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

export default function ProjectTemplate({ data }: { data: ProjectData }) {
  const [brochureOpen, setBrochureOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const others = getOtherProjects(data.slug)
  const allUnits = [...data.availableUnits, ...data.soldOutUnits]

  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden bg-dark">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src={data.heroImage}
            alt={data.name}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="absolute top-6 right-7 z-20 flex items-center gap-2 border border-white/25 bg-black/35 backdrop-blur-md px-4 py-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-white text-[9px] font-sans font-semibold tracking-[0.22em]">{data.statusLabel}</span>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 px-8 pb-16 lg:px-16 lg:pb-20 z-10"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-gold text-[9px] font-sans font-semibold tracking-[0.38em] uppercase mb-5">
              {data.locationLabel}
            </p>
            <h1
              className="font-serif text-white font-light leading-[1.02] mb-6"
              style={{ fontSize: 'clamp(2.9rem, 7.2vw, 6.2rem)', letterSpacing: '0.005em' }}
            >
              {data.name}
            </h1>
            <p className="text-white/60 font-sans font-light text-sm max-w-md mb-10 leading-[1.8]">
              {data.tagline}
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => document.getElementById('units')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2.5 bg-gold text-dark px-7 py-3.5 text-[10px] font-sans font-semibold tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300 group"
              >
                VIEW UNITS
                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => setBrochureOpen(true)}
                className="inline-flex items-center gap-2.5 border border-white/40 text-white px-7 py-3.5 text-[10px] font-sans font-semibold tracking-[0.22em] uppercase hover:bg-white/10 hover:border-white/70 transition-all duration-300"
              >
                <Download size={11} />
                BROCHURE
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          <span className="text-white/35 text-[8px] font-sans tracking-[0.25em] uppercase">Scroll</span>
          <ChevronDown size={13} className="text-white/35" strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          KEY STATS STRIP
      ══════════════════════════════════════════════ */}
      <section className="bg-dark border-t border-white/8 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-8 lg:px-14 py-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {[
            { label: 'Location', value: data.locationFull },
            { label: 'Type', value: data.type },
            ...(data.floors > 0 ? [{ label: 'Floors', value: `${data.floors} Floors` }] : []),
            ...(data.totalUnits > 0 ? [{ label: 'Total Units', value: `${data.totalUnits} Units` }] : []),
            { label: 'Completion', value: data.completion },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <p className="text-white/30 text-[8px] font-sans tracking-[0.28em] uppercase mb-2">{stat.label}</p>
              <p className="text-white font-sans text-sm font-light leading-snug">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STORY / DESCRIPTION
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-8 lg:px-6">
          <SectionLabel>The Story</SectionLabel>
          <SectionHeading>
            {data.name.split(' ').slice(0, 2).join(' ')}{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>
              {data.name.split(' ').slice(2).join(' ') || 'Residence'}
            </span>
          </SectionHeading>

          {data.descriptionBlocks ? (
            <div className="mt-14 space-y-14">
              {data.descriptionBlocks.map((block, i) => {
                if (block.type === 'text') return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.7 }}
                    className="text-dark/60 font-sans font-light text-[14.5px] leading-[2]"
                  >
                    {block.content}
                  </motion.p>
                )
                if (block.type === 'image') return (
                  <motion.figure
                    key={i}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.85 }}
                    className="-mx-8 lg:-mx-20"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image src={block.src!} alt={block.caption || ''} fill className="object-cover" sizes="90vw" quality={88} />
                    </div>
                    {block.caption && (
                      <figcaption className="mt-3 px-8 lg:px-20 text-dark/35 text-[10px] font-sans tracking-[0.18em] uppercase">
                        {block.caption}
                      </figcaption>
                    )}
                  </motion.figure>
                )
                if (block.type === 'image-pair') return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.85 }}
                    className="-mx-8 lg:-mx-20 grid grid-cols-2 gap-2"
                  >
                    {block.images?.map((img, j) => (
                      <figure key={j}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image src={img.src} alt={img.caption || ''} fill className="object-cover" sizes="45vw" quality={85} />
                        </div>
                        {img.caption && (
                          <figcaption className="mt-2 px-2 text-dark/35 text-[9px] font-sans tracking-[0.15em] uppercase">
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
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.65, delay: i * 0.1 }}
                  className="text-dark/60 font-sans font-light text-[14.5px] leading-[2]"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          AMENITIES — full-width stacked editorial
      ══════════════════════════════════════════════ */}
      <section>
        <div className="bg-dark py-20 lg:py-28 px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-[9px] font-sans font-semibold tracking-[0.38em] uppercase mb-4">
              Amenities & Lifestyle
            </p>
            <h2
              className="font-serif text-white font-light leading-[1.1] max-w-2xl mx-auto"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
            >
              A Life of{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Privilege</span>
            </h2>
          </motion.div>
        </div>

        {data.amenities.map((amenity, i) => {
          const imgLeft = i % 2 === 0
          return (
            <div
              key={amenity.label}
              className={`flex flex-col lg:flex-row lg:h-[90vh] ${imgLeft ? '' : 'lg:flex-row-reverse'}`}
            >
              {/* ── Image panel — curtain wipe reveal ── */}
              <div className="relative overflow-hidden lg:w-[55%] h-[52vh] lg:h-full">
                <div className="absolute inset-0">
                  <Image
                    src={amenity.image}
                    alt={amenity.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    quality={92}
                  />
                </div>
                <motion.div
                  className="absolute inset-0 bg-dark"
                  style={{ originX: imgLeft ? 0 : 1 }}
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 1.35, ease: [0.76, 0, 0.24, 1] }}
                />
              </div>

              {/* ── Text panel — slides in from opposite side ── */}
              <div
                className={`relative overflow-hidden lg:w-[45%] flex items-center ${i % 2 === 0 ? 'bg-white' : 'bg-cream'}`}
              >
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
                    viewport={{ once: true, margin: '-60px' }}
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
                    viewport={{ once: true, margin: '-60px' }}
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
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                  />

                  {/* Description */}
                  <motion.p
                    className="text-dark/55 font-sans font-light text-[13.5px] leading-[2] max-w-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.7 }}
                  >
                    {amenity.description}
                  </motion.p>
                </div>
              </div>
            </div>
          )
        })}

        <div className="bg-dark py-20 lg:py-24 px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <SectionLabel>All Features</SectionLabel>
            <SectionHeading light>Everything Included</SectionHeading>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0"
            >
              {data.amenityList.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="flex items-start gap-3 py-3.5 border-b border-white/6"
                >
                  <Check size={12} className="text-gold shrink-0 mt-[3px]" strokeWidth={2.5} />
                  <span className="text-white/60 font-sans font-light text-[13px] leading-snug">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INTERIOR GALLERY (Ivy Park — interiorImages)
      ══════════════════════════════════════════════ */}
      {data.interiorImages && data.interiorImages.length > 0 && (
        <section className="bg-cream py-24 lg:py-32">
          <div className="max-w-6xl mx-auto px-8 lg:px-14">
            <SectionLabel>Interiors</SectionLabel>
            <SectionHeading>
              Inside Your{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Residence</span>
            </SectionHeading>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {data.interiorImages.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'}`}
                >
                  <Image
                    src={src}
                    alt={`Interior ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    sizes={i === 0 ? '100vw' : '50vw'}
                    quality={85}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          GALLERY CAROUSEL
      ══════════════════════════════════════════════ */}
      {data.gallerySlides && data.gallerySlides.length > 0 && (
        <ProjectGalleryCarousel slides={data.gallerySlides} />
      )}

      {/* ══════════════════════════════════════════════
          FLOOR PLANS & UNIT TYPES
      ══════════════════════════════════════════════ */}
      <section id="units" className="bg-dark py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-8 lg:px-14">
          <SectionLabel>Floor Plans & Pricing</SectionLabel>
          <SectionHeading light>
            Choose Your{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Residence</span>
          </SectionHeading>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8"
          >
            {allUnits.map((unit, i) => (
              <motion.div
                key={unit.type}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className={`relative p-8 flex flex-col ${unit.available ? 'bg-dark' : 'bg-[#0f0f0f]'}`}
              >
                <div
                  className="relative border border-white/10 mb-7 flex items-center justify-center overflow-hidden"
                  style={{ aspectRatio: '1 / 1' }}
                >
                  {(['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r',
                    'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'] as const
                  ).map((cls) => (
                    <div key={cls} className={`absolute w-4 h-4 ${cls} ${unit.available ? 'border-gold/40' : 'border-white/10'}`} />
                  ))}
                  <div className="text-center select-none">
                    <p
                      className="font-serif font-light leading-none mb-1"
                      style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: unit.available ? 'rgba(111,166,130,0.12)' : 'rgba(255,255,255,0.04)' }}
                    >
                      {unit.type.match(/\d/)?.[0] ?? '—'}
                    </p>
                    <p className="text-[9px] font-sans tracking-[0.22em] uppercase" style={{ color: 'rgba(255,255,255,0.08)' }}>
                      {unit.type.toLowerCase().includes('bedroom') ? 'Bedroom' : 'Unit'}
                    </p>
                    <div className="mt-3 mx-auto" style={{ width: 32, height: 1, background: unit.available ? 'rgba(111,166,130,0.3)' : 'rgba(255,255,255,0.08)' }} />
                    <p
                      className="mt-3 font-sans font-light tabular-nums"
                      style={{ fontSize: '0.7rem', color: unit.available ? 'rgba(111,166,130,0.5)' : 'rgba(255,255,255,0.12)', letterSpacing: '0.12em' }}
                    >
                      {unit.size}
                    </p>
                  </div>
                </div>

                {!unit.available && (
                  <div className="mb-3 self-start bg-white/6 border border-white/10 px-2.5 py-1">
                    <span className="text-white/30 text-[7.5px] font-sans tracking-[0.2em] uppercase">Sold Out</span>
                  </div>
                )}

                <h3 className="text-white/80 font-sans text-[13px] font-semibold mb-1 leading-snug">{unit.type}</h3>
                <p className="text-white/35 font-sans text-xs mb-5">{unit.size}</p>
                <p
                  className={`font-serif mt-auto ${unit.available ? 'text-gold' : 'text-white/18'}`}
                  style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 300 }}
                >
                  {unit.price}
                </p>

                {unit.available && (
                  <button
                    onClick={() => setBrochureOpen(true)}
                    className="mt-5 self-start inline-flex items-center gap-1.5 text-[8.5px] font-sans font-semibold text-gold/60 hover:text-gold uppercase tracking-[0.22em] transition-colors group"
                  >
                    Enquire Now
                    <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-white/25 text-[11px] font-sans font-light text-center"
          >
            Detailed floor plan drawings available in the brochure.{' '}
            <button onClick={() => setBrochureOpen(true)} className="text-gold/60 hover:text-gold underline underline-offset-2 transition-colors">
              Download brochure
            </button>{' '}
            to view all layouts.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VIRTUAL TOURS (Luckinn Ivy)
      ══════════════════════════════════════════════ */}
      {data.vrTours && data.vrTours.length > 0 && (
        <section className="bg-white py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-8 lg:px-14">
            <SectionLabel>Virtual Tours</SectionLabel>
            <SectionHeading>
              Explore in{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 300 }}>360°</span>
            </SectionHeading>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.vrTours.map((tour, i) => (
                <motion.a
                  key={tour.title}
                  href={tour.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.65, delay: i * 0.1 }}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <Image src={tour.thumbnail} alt={tour.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" sizes="33vw" quality={80} />
                    <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:border-gold group-hover:scale-110 transition-all duration-300">
                        <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[14px] border-l-white ml-1 group-hover:border-l-gold transition-colors" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-dark/60 backdrop-blur-sm px-2.5 py-1">
                      <span className="text-white text-[8px] font-sans tracking-[0.18em]">{tour.category}</span>
                    </div>
                  </div>
                  <h4 className="font-serif text-dark text-xl font-light mb-1.5 group-hover:text-gold transition-colors">{tour.title}</h4>
                  <p className="text-dark/45 text-[12px] font-sans font-light leading-[1.7]">{tour.description}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[9px] font-sans font-semibold tracking-[0.18em] uppercase text-gold/70 group-hover:text-gold transition-colors">
                    Launch Tour <ExternalLink size={9} />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          WHY INVEST + LOCATION
      ══════════════════════════════════════════════ */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            <div>
              <SectionLabel>Investment Case</SectionLabel>
              <SectionHeading>Why Invest Here</SectionHeading>
              <ul className="mt-10 space-y-6">
                {data.investmentPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -22 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-gold font-sans text-[9px] font-semibold tracking-widest mt-0.5 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-dark/62 font-sans font-light text-[13.5px] leading-[1.85]">{point}</p>
                  </motion.li>
                ))}
              </ul>
              <motion.button
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.6, delay: 0.5 }}
                onClick={() => setBrochureOpen(true)}
                className="mt-12 inline-flex items-center gap-2.5 bg-dark text-white px-7 py-3.5 text-[9px] font-sans font-semibold tracking-[0.22em] uppercase hover:bg-gold hover:text-dark transition-colors duration-300 group"
              >
                <Download size={11} />
                DOWNLOAD BROCHURE
                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>

            <div>
              <SectionLabel>Location</SectionLabel>
              <SectionHeading>Prime Positioning</SectionHeading>
              <ul className="mt-10 space-y-5">
                {data.locationAdvantages.map((adv, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 22 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="flex items-start gap-3.5 pb-5 border-b border-dark/8 last:border-0"
                  >
                    <MapPin size={11} className="text-gold shrink-0 mt-0.5" />
                    <p className="text-dark/62 font-sans font-light text-[13.5px] leading-snug">{adv}</p>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href="tel:+254118266666"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 inline-flex items-center gap-2.5 border border-dark/25 text-dark px-7 py-3.5 text-[9px] font-sans font-semibold tracking-[0.22em] uppercase hover:border-dark hover:bg-dark hover:text-white transition-all duration-300"
              >
                <Phone size={11} />
                CALL US NOW
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MAP
      ══════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-8 lg:px-14 pt-24 lg:pt-32 pb-0">
          <SectionLabel>Find Us</SectionLabel>
          <SectionHeading>
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>{data.locationFull}</span>
          </SectionHeading>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.85 }}
          className="mt-12 w-full"
          style={{ height: '480px' }}
        >
          <iframe
            src={data.mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════ */}
      <section className="bg-dark py-24 lg:py-28">
        <div className="max-w-4xl mx-auto px-8 lg:px-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.85 }}
          >
            <p className="text-gold text-[9px] font-sans font-semibold tracking-[0.38em] uppercase mb-5">
              {data.statusLabel}
            </p>
            <h2
              className="font-serif text-white font-light leading-[1.1] mb-7"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}
            >
              Secure Your Place at{' '}
              <span style={{ fontStyle: 'italic' }}>{data.name}</span>
            </h2>
            <p className="text-white/45 font-sans font-light text-sm max-w-md mx-auto mb-10 leading-[1.85]">
              Download the full brochure for detailed floor plans, pricing, payment schedules, and developer information.
            </p>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <button
                onClick={() => setBrochureOpen(true)}
                className="inline-flex items-center gap-2.5 bg-gold text-dark px-8 py-4 text-[10px] font-sans font-semibold tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300 group"
              >
                <Download size={11} />
                DOWNLOAD BROCHURE
                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a
                href="tel:+254118266666"
                className="inline-flex items-center gap-2.5 border border-white/35 text-white px-8 py-4 text-[10px] font-sans font-semibold tracking-[0.22em] uppercase hover:border-white/70 hover:bg-white/8 transition-all duration-300"
              >
                <Phone size={11} />
                +254 118 266 666
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          RELATED PROJECTS
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-8 lg:px-14">
          <SectionLabel>Explore More</SectionLabel>
          <SectionHeading>
            Other{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Developments</span>
          </SectionHeading>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-7">
            {others.map((proj, i) => (
              <motion.div
                key={proj.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <Link href={`/${proj.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden mb-5">
                    <Image
                      src={proj.heroImage}
                      alt={proj.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="33vw"
                      quality={82}
                    />
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/10 transition-colors duration-300" />
                    <div className="absolute top-3 left-3 bg-dark/65 backdrop-blur-sm px-2.5 py-1">
                      <span className="text-white text-[8px] font-sans font-semibold tracking-[0.18em]">{proj.statusLabel}</span>
                    </div>
                  </div>
                  <p className="text-gold text-[8.5px] font-sans font-semibold tracking-[0.22em] uppercase mb-2">{proj.locationLabel}</p>
                  <h3 className="font-serif text-dark text-xl font-light leading-tight mb-3 group-hover:text-gold transition-colors duration-300">
                    {proj.name}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase text-dark/40 group-hover:text-gold transition-colors duration-300">
                    EXPLORE <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform" />
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
        projectName={data.name}
        brochurePath={data.brochurePath}
      />
    </>
  )
}
