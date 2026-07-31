'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

const projects = [
  {
    name: 'Blossom Ivy Residence',
    location: 'Gatundu Road, Kileleshwa',
    status: 'AVAILABLE',
    statusDot: 'bg-gold',
    price: 'From KES 18M',
    completion: 'Dec 2026',
    image: encodeURI('/Blossoms Ivy Residence Assets/Exterior/Blossoms_Ivy exterior.png'),
    href: '/blossom-ivy',
  },
  {
    name: 'Luckinn Ivy Residence',
    location: 'Mogotio Road, Westlands',
    status: 'LIMITED UNITS',
    statusDot: 'bg-gold',
    price: 'Limited — Enquire',
    completion: 'Dec 2026',
    image: encodeURI('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Entrance.png'),
    href: '/luckinn-ivy',
  },
  {
    name: 'Ivy Park Residence',
    location: 'Kirichwa Road, Kilimani',
    status: 'EARLY BIRD',
    statusDot: 'bg-white',
    price: 'From KES 6.82M',
    completion: 'Dec 2028',
    image: encodeURI('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Night new_Ivy Park.jpg'),
    href: '/ivy-park',
  },
  {
    name: 'Ivy Myst',
    location: 'Gatundu Road, Kileleshwa',
    status: 'NOW SELLING',
    statusDot: 'bg-gold',
    price: 'From KES 8.8M',
    completion: 'Aug 2029',
    image: encodeURI('/Ivy Myst Assets/New Renders/Exterior/Gate Front View.png'),
    href: '/ivy-myst',
  },
]

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* Track translates from 0vw → -300vw (4 cards × 100vw, show last card at end) */
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-300vw'])
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setActiveIndex(
      Math.min(Math.round(latest * (projects.length - 1)), projects.length - 1)
    )
  })

  return (
    <section>

      {/* ── DESKTOP: Sticky horizontal reel ───────────────────────── */}
      <div
        ref={containerRef}
        className="hidden md:block"
        style={{ height: '500vh' }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-dark">

          {/* Top progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-gold z-20"
            style={{ width: progressWidth }}
          />

          {/* Section label — top left */}
          <div className="absolute top-7 left-9 z-20 flex items-center gap-4">
            <p className="text-gold text-[9px] font-sans font-semibold tracking-[0.3em] uppercase">
              Our Portfolio
            </p>
            <div className="h-px w-7 bg-gold/30" />
            <p className="text-white/20 text-[9px] font-sans tracking-[0.18em] uppercase">
              {projects.length} Developments · Nairobi
            </p>
          </div>

          {/* View all — top right */}
          <div className="absolute top-6 right-9 z-20">
            <Link
              href="/developments"
              className="inline-flex items-center gap-1.5 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase text-white/25 hover:text-gold transition-colors duration-300 group"
            >
              View All
              <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Slide track */}
          <motion.div
            className="flex h-full"
            style={{ x, width: `${projects.length * 100}vw` }}
          >
            {projects.map((project, i) => (
              <Link
                key={project.name}
                href={project.href}
                className="relative flex-shrink-0 h-full w-screen block group"
              >
                {/* Full-bleed image */}
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  sizes="100vw"
                  quality={90}
                  priority={i === 0}
                />

                {/* Gradient — heavy bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/20 to-black/10" />

                {/* Ghost card number — architectural scale */}
                <div
                  className="absolute right-10 top-1/2 -translate-y-1/2 font-serif font-light leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(100px, 16vw, 200px)', color: 'rgba(255,255,255,0.035)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Status badge */}
                <div className="absolute top-[64px] left-9 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/15 px-3 py-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${project.statusDot}`} />
                  <span className="text-white text-[9px] font-sans font-semibold tracking-[0.18em]">
                    {project.status}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-9 lg:p-14">
                  <div className="flex items-center gap-1.5 mb-4">
                    <MapPin size={11} className="text-gold flex-shrink-0" />
                    <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.25em] uppercase">
                      {project.location}
                    </p>
                  </div>

                  <h3
                    className="font-serif text-white font-light leading-[1.04]"
                    style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}
                  >
                    {project.name}
                  </h3>

                  {/* Hover reveal — price + CTA */}
                  <div className="mt-7 pt-6 border-t border-white/10 flex items-center justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div>
                      <p className="text-white/40 text-[9px] font-sans tracking-widest uppercase mb-1.5">
                        Starting Price
                      </p>
                      <p className="text-white text-base font-sans font-semibold">
                        {project.price}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2.5 bg-gold text-dark px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase">
                      VIEW PROJECT
                      <ArrowRight size={11} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Slide dots — bottom centre */}
          <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {projects.map((_, i) => (
              <div
                key={i}
                className={`h-[2px] rounded-full transition-all duration-500 ${
                  i === activeIndex ? 'w-8 bg-gold' : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Slide counter — bottom right */}
          <div className="absolute bottom-[38px] right-9 flex items-center gap-2 z-20 text-white/25">
            <span className="font-sans text-[11px] tracking-widest">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <div className="w-px h-4 bg-white/12" />
            <span className="font-sans text-[11px] tracking-widest">
              0{projects.length}
            </span>
          </div>

          {/* Scroll hint — fades on first scroll */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20"
            style={{ opacity: scrollHintOpacity }}
          >
            <span className="text-white/28 text-[9px] font-sans tracking-[0.25em] uppercase">
              Scroll to explore
            </span>
            <div className="flex gap-1">
              {[0, 100, 200].map((delay) => (
                <div
                  key={delay}
                  className="w-1 h-1 rounded-full bg-white/20 animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── MOBILE: horizontal snap scroll ────────────────────────── */}
      <div className="md:hidden bg-dark pb-10">
        <div className="px-5 pt-12 pb-6">
          <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-3">
            Our Portfolio
          </p>
          <h2 className="font-serif text-3xl font-light text-white leading-tight">
            Signature Developments<br />Across Nairobi
          </h2>
        </div>

        <div
          className="flex overflow-x-auto pb-2 gap-3 px-5"
          style={{
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
          } as React.CSSProperties}
        >
          {projects.map((project) => (
            <Link
              key={project.name}
              href={project.href}
              className="relative flex-shrink-0 block overflow-hidden"
              style={{
                width: '80vw',
                height: '54vw',
                scrollSnapAlign: 'start',
              } as React.CSSProperties}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                sizes="80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/15 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 border border-white/20 px-2 py-1">
                <span className={`w-1 h-1 rounded-full ${project.statusDot}`} />
                <span className="text-white text-[7px] font-sans font-semibold tracking-[0.15em]">
                  {project.status}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-gold text-[8px] font-sans tracking-[0.2em] uppercase mb-1">
                  {project.location}
                </p>
                <h3 className="font-serif text-white text-xl font-light leading-tight">
                  {project.name}
                </h3>
                <p className="text-white/55 text-xs font-sans mt-1">{project.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  )
}
