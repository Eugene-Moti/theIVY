'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Quote, Building2, Home, Users,
  ShieldCheck, MapPin, Handshake, Clock, TrendingUp, HeartHandshake,
} from 'lucide-react'

const p = (path: string) => encodeURI(path)

/* ── Animated count-up — was silently broken before (rendered 0 or the
   target with no actual animation); now genuinely tweens on scroll-in. ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, target])

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

// Years are each project's completion (or target completion) date,
// per the development schedule — keeps the timeline in true
// chronological order from founding through to Ivy Myst in 2029.
const JOURNEY = [
  { start: '2017', end: '2017', name: 'The Ivy Group', status: 'Founded', kind: 'founding' as const },
  { start: '2019', end: '2022', name: 'Diamond Homes', status: 'Completed', logo: p('/previous_projects/Diamond Homes/diamond-homes-logo-gold.png') },
  { start: '2022', end: '2024', name: 'Nandwa Ivy Residence', status: 'Completed', logo: p('/previous_projects/Nandwa-ivy/Nandwa-ivy-full-logo-gold.png') },
  { start: '2023', end: '2025', name: 'Diamond Ivy Residence', status: 'Completed', logo: p('/previous_projects/Diamond-ivy/diamond-ivy-gold.png') },
  { start: '2024', end: '2026', name: 'Blossoms Ivy Residence', status: 'Ongoing', logo: p('/Blossoms Ivy Residence Assets/BLOSSOM-LOGO-GOLD.png'), href: '/blossom-ivy' },
  { start: '2025', end: '2026', name: 'Luckinn Ivy Residence', status: 'Ongoing', logo: p('/Luckinn Ivy Assets/luckinn_logo.png'), href: '/luckinn-ivy' },
  { start: '2026', end: '2028', name: 'Ivy Park Residence', status: 'Ongoing', logo: p('/IVY PARK RESIDENCE Assests/Ivypark_logo.png'), href: '/ivy-park' },
  { start: '2026', end: '2029', name: 'Ivy Myst Residence', status: 'Ongoing', logo: p('/Ivy Myst Assets/Ivy Myst Logo.png'), invert: true, href: '/ivy-myst' },
]

const VALUES = [
  { icon: ShieldCheck, title: 'Quality Uncompromised', body: 'Every Ivy Group development is built to an exacting standard — premium finishes, high-quality materials, and meticulous attention to detail in every unit and common space.' },
  { icon: MapPin, title: 'Prime Locations, Always', body: "We develop exclusively in Nairobi's most desirable and high-value neighbourhoods. Location is the single most important factor in property investment — we choose each site accordingly." },
  { icon: Handshake, title: 'Transparent Dealings', body: 'We believe in straightforward pricing, clear contracts, and honest communication. No hidden charges, no surprises. Our clients buy with confidence because we operate with integrity.' },
  { icon: Clock, title: 'On-Time Delivery', body: 'Our track record speaks for itself. We have delivered multiple projects on schedule — and we apply the same discipline and project management rigour to every new development.' },
  { icon: TrendingUp, title: 'Investor-First Thinking', body: 'We design every project with the investor in mind — optimising layouts, communal amenities, and specifications to maximise rental appeal and long-term capital growth.' },
  { icon: HeartHandshake, title: 'After-Sales Partnership', body: 'Our relationship with buyers does not end at handover. We provide ongoing support, property management referrals, and act as a long-term partner in protecting your investment.' },
]

const PORTFOLIO = [
  { name: 'Blossoms Ivy Residence', location: 'Kileleshwa', status: 'Nearing Completion', image: p('/Blossoms Ivy Residence Assets/Exterior/Blossoms_Ivy exterior.png'), href: '/blossom-ivy' },
  { name: 'Luckinn Ivy Residence', location: 'Westlands', status: 'Limited Units', image: p('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Entrance.png'), href: '/luckinn-ivy' },
  { name: 'Ivy Park Residence', location: 'Kilimani', status: 'Under Construction', image: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg'), href: '/ivy-park' },
  { name: 'Ivy Myst Residence', location: 'Kileleshwa', status: 'Now Selling', image: p('/Ivy Myst Assets/New Renders/Exterior/260910_FINAL-Entrance02_IVY MYST.jpg'), href: '/ivy-myst' },
]

const JOURNEY_DWELL = 2800

export default function AboutContent() {
  const [journeyActive, setJourneyActive] = useState(0)
  const [journeyPaused, setJourneyPaused] = useState(false)

  // Self-rescheduling timeout, keyed off journeyActive — same pattern as
  // the homepage portfolio carousel, so a hover/click resets the countdown.
  useEffect(() => {
    if (journeyPaused) return
    const t = setTimeout(() => setJourneyActive((a) => (a + 1) % JOURNEY.length), JOURNEY_DWELL)
    return () => clearTimeout(t)
  }, [journeyActive, journeyPaused])

  const journeySpotlight = JOURNEY[journeyActive]

  return (
    <>
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative h-[66vh] min-h-[500px] bg-dark overflow-hidden">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Image
            src={p('/Ivy Myst Assets/New Renders/Exterior/Rooftop Deck Exterior night view.png')}
            alt="The Ivy Group"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/55 to-dark/35" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.35em] uppercase mb-4">OUR STORY</p>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-semibold tracking-tight leading-[1.02]">About The Ivy Group</h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[2px] bg-gold mx-auto mt-6"
            />
          </motion.div>
        </div>
      </section>

      {/* ─────────────── MISSION ─────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Quote size={28} className="text-gold/40 mx-auto mb-6" />
            <p className="font-serif text-2xl md:text-3xl text-dark font-light leading-[1.6] mb-0">
              We build residences that command attention and deliver lasting value — not just structures,
              but addresses that define a generation of Nairobi living.
            </p>
            <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mt-7">THE IVY GROUP, NAIROBI</p>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── OUR STORY ─────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16">
            {/* Sticky label column */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">WHO WE ARE</p>
              <h2 className="font-serif text-4xl font-light text-dark leading-tight mb-6">Building Nairobi&apos;s Finest Addresses</h2>
              <p className="text-dark/50 text-[13.5px] font-sans font-light italic leading-relaxed border-l-2 border-gold pl-4 mb-8">
                Part of R-Sun Properties — delivering premium Nairobi residences since 2017.
              </p>
              <Link
                href="/developments"
                className="inline-flex items-center gap-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-dark hover:text-gold transition-colors"
              >
                View Our Developments <ArrowRight size={11} />
              </Link>
            </div>

            {/* Flowing narrative */}
            <div className="space-y-10">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="max-w-2xl text-dark/65 font-sans font-light text-[15px] leading-[1.95]"
              >
                The Ivy Group is a premium residential property developer based in Nairobi, Kenya. Under the umbrella of
                R-Sun Properties Limited, we specialise in the design, development, and delivery of luxury residential
                apartments in the city&apos;s most prestigious neighbourhoods.
              </motion.p>

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-dark">
                  <motion.div
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 2.4, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={p('/IVY PARK RESIDENCE Assests/EXTERIORS/Night_EXTERIOS_01.jpg')}
                      alt="Ivy Park Residence — our head office"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      quality={86}
                    />
                  </motion.div>
                </div>
                <figcaption className="mt-3 text-dark/40 text-[10px] font-sans tracking-[0.16em] uppercase">
                  Ivy Park Residence, Kilimani — home to our head office
                </figcaption>
              </motion.figure>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="max-w-2xl text-dark/65 font-sans font-light text-[15px] leading-[1.95]"
              >
                Our portfolio spans Kileleshwa, Westlands, and Kilimani — Nairobi&apos;s so-called golden triangle of prime
                real estate — with every development benchmarked against international standards of quality, finishes,
                and community design.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="grid grid-cols-2 gap-4 lg:gap-6 items-start"
              >
                <figure>
                  <div className="relative overflow-hidden bg-dark" style={{ aspectRatio: '4 / 3' }}>
                    <motion.div initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 2.4, ease: 'easeOut' }} className="absolute inset-0">
                      <Image src={p('/Ivy Myst Assets/New Renders/Exterior/260910_FINAL-RooftopAll1_IVY MYST.jpg')} alt="Ivy Myst rooftop realm" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 35vw" quality={84} />
                    </motion.div>
                  </div>
                  <figcaption className="mt-3 text-dark/40 text-[9px] font-sans tracking-[0.14em] uppercase">The rooftop, after dark</figcaption>
                </figure>
                <figure className="mt-10 lg:mt-16">
                  <div className="relative overflow-hidden bg-dark" style={{ aspectRatio: '4 / 3' }}>
                    <motion.div initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 2.4, delay: 0.1, ease: 'easeOut' }} className="absolute inset-0">
                      <Image src={p('/Ivy Myst Assets/New Renders/Myst amenities/260901_FINAL_Water Lounge 23rd Floor_View 3_IVY MYST.jpg')} alt="Water Lounge, 23rd floor" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 35vw" quality={84} />
                    </motion.div>
                  </div>
                  <figcaption className="mt-3 text-dark/40 text-[9px] font-sans tracking-[0.14em] uppercase">Water Lounge, 23rd floor</figcaption>
                </figure>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="max-w-2xl text-dark/65 font-sans font-light text-[15px] leading-[1.95]"
              >
                From our head office at Ivy Park Residence on Kirichwa Road, Kilimani — a short walk from Yaya Centre —
                our team of architects, engineers, and sales professionals collaborate to bring each project from
                concept to completion, on time and to specification.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── OUR JOURNEY ─────────────── */}
      <section
        className="py-24 lg:py-28 bg-dark overflow-hidden"
        onMouseEnter={() => setJourneyPaused(true)}
        onMouseLeave={() => setJourneyPaused(false)}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">SINCE 2017</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white">Our Journey</h2>
            <div className="w-12 h-[2px] bg-gold mt-5 mx-auto" />
          </motion.div>

          {/* Spotlight carousel — every logo visible at once (no scrolling
              needed to find one), one auto-highlighted at a time, same
              interaction as the homepage portfolio section. */}
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-12">
            {JOURNEY.map((item, i) => {
              const isActive = journeyActive === i
              const inner = (
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0.32, scale: isActive ? 1.14 : 0.88 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-center justify-center"
                >
                  {isActive && (
                    <motion.span
                      layoutId="journey-glow"
                      className="absolute -inset-6 rounded-full bg-gold/10 blur-2xl"
                      transition={{ duration: 0.6 }}
                    />
                  )}
                  {item.kind === 'founding' ? (
                    <Building2 size={28} className="relative text-gold" strokeWidth={1.5} />
                  ) : (
                    <Image
                      src={item.logo!}
                      alt={item.name}
                      width={200}
                      height={80}
                      className={`relative h-9 sm:h-10 w-auto object-contain ${item.invert ? 'brightness-0 invert' : ''}`}
                    />
                  )}
                </motion.div>
              )
              const cardClass = 'group relative flex items-center justify-center h-16 sm:h-20 transition-colors duration-500'

              return item.href ? (
                <Link key={item.name} href={item.href} onMouseEnter={() => setJourneyActive(i)} className={`${cardClass} cursor-pointer`}>
                  {inner}
                </Link>
              ) : (
                <div key={item.name} onMouseEnter={() => setJourneyActive(i)} className={cardClass}>
                  {inner}
                </div>
              )
            })}
          </div>

          {/* Animated caption for whichever milestone is spotlighted */}
          <div className="mt-10 h-16 flex flex-col items-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={journeySpotlight.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-serif text-white text-lg font-light">{journeySpotlight.name}</p>
                <p className="text-gold text-[9.5px] font-sans font-semibold tracking-[0.2em] uppercase mt-1.5">
                  {journeySpotlight.status}
                </p>
                <p className="text-white/35 text-[10px] font-sans tabular-nums mt-1">
                  {journeySpotlight.start === journeySpotlight.end
                    ? journeySpotlight.start
                    : `${journeySpotlight.start} – ${journeySpotlight.end}`}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots — click to jump straight to a milestone */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {JOURNEY.map((item, i) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show ${item.name}`}
                onClick={() => setJourneyActive(i)}
                className={`h-1.5 rounded-full transition-all duration-400 ${
                  journeyActive === i ? 'w-6 bg-gold' : 'w-1.5 bg-white/20 hover:bg-white/35'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── STATS ─────────────── */}
      <section className="py-20 bg-white border-b border-dark/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Clock, number: 10, suffix: '+', label: 'Years in Real Estate' },
              { icon: Building2, number: 7, suffix: '', label: 'Developments Since 2017' },
              { icon: Home, number: 1000, suffix: '+', label: 'Homes Delivered' },
              { icon: MapPin, number: 3, suffix: '', label: 'Prime Nairobi Locations' },
            ].map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6 }}>
                <stat.icon size={20} className="text-gold mx-auto mb-3" strokeWidth={1.5} />
                <p className="font-serif text-4xl lg:text-5xl text-dark font-light mb-1 tabular-nums">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </p>
                <p className="text-dark/40 text-[10px] font-sans tracking-[0.2em] uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── VALUES ─────────────── */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">OUR PRINCIPLES</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-dark">What We Stand For</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-white p-7 border border-dark/8 hover:border-gold/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-[border-color,box-shadow] duration-300"
              >
                <val.icon size={22} className="text-gold mb-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-dark font-light mb-4">{val.title}</h3>
                <p className="text-dark/55 text-sm font-sans font-light leading-[1.8]">{val.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── PORTFOLIO SNAPSHOT ─────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">OUR PORTFOLIO</p>
            <h2 className="font-serif text-4xl font-light text-dark">Our Landmark Projects</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO.map((proj, i) => (
              <motion.div
                key={proj.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={proj.href} className="group block relative aspect-[3/4] overflow-hidden bg-dark">
                  <motion.div initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 2.4, ease: 'easeOut' }} className="absolute inset-0">
                    <Image src={proj.image} alt={proj.name} fill className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" sizes="25vw" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/88 via-dark/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
                    <div>
                      <p className="text-gold text-[9px] font-sans font-semibold tracking-widest uppercase mb-1">{proj.location}</p>
                      <p className="font-serif text-white text-base font-light mb-1">{proj.name}</p>
                      <p className="text-white/45 text-[9px] font-sans tracking-[0.14em] uppercase">{proj.status}</p>
                    </div>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold text-dark flex-shrink-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="relative py-24 bg-dark overflow-hidden text-center">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 6, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Image
            src={p('/Ivy Myst Assets/New Renders/Exterior/Rooftop view to the city.png')}
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/85 to-dark/70" />
        <div className="relative max-w-xl mx-auto px-6">
          <Users size={24} className="text-gold mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="font-serif text-4xl text-white font-light mb-5">Invest With Confidence</h2>
          <p className="text-white/50 text-sm font-sans font-light leading-relaxed mb-8">
            Join hundreds of satisfied homeowners and investors who have trusted The Ivy Group to deliver their ideal Nairobi residence.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-dark px-10 py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors">
            GET IN TOUCH <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </>
  )
}
