'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

function StatCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return <span ref={ref}>{isInView ? target : 0}{suffix}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] bg-dark overflow-hidden">
        <Image
          src={encodeURI('/Blossoms Ivy Residence Assets/Exterior/Blossoms_Ivy exterior.png')}
          alt="The Ivy Group"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/20" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.35em] uppercase mb-4">OUR STORY</p>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-semibold tracking-tight leading-[1.02]">About The Ivy Group</h1>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="font-serif text-2xl md:text-3xl text-dark font-light leading-[1.6] mb-0">
              "We build residences that command attention and deliver lasting value — not just structures, but addresses that define a generation of Nairobi living."
            </p>
            <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mt-7">THE IVY GROUP, NAIROBI</p>
          </motion.div>
        </div>
      </section>

      {/* Story + Image */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">WHO WE ARE</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-tight mb-5">Building Nairobi's Finest Addresses</h2>
              <div className="w-12 h-[2px] bg-gold mb-8" />
              <p className="text-dark/60 text-sm font-sans font-light leading-[1.9] mb-5">
                The Ivy Group is a premium residential property developer based in Nairobi, Kenya. Under the umbrella of R-Sun Properties Limited, we specialise in the design, development, and delivery of luxury residential apartments in the city's most prestigious neighbourhoods.
              </p>
              <p className="text-dark/60 text-sm font-sans font-light leading-[1.9] mb-5">
                Our portfolio spans Kileleshwa, Westlands, and Kilimani — Nairobi's so-called golden triangle of prime real estate — with every development benchmarked against international standards of quality, finishes, and community design.
              </p>
              <p className="text-dark/60 text-sm font-sans font-light leading-[1.9]">
                From our head office at Ivy Park Residence on Kirichwa Road, Kilimani — a short walk from Yaya Centre — our team of architects, engineers, and sales professionals collaborate to bring each project from concept to completion — on time, and to specification.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={encodeURI('/IVY PARK RESIDENCE Assests/EXTERIORS/251211_D03-Facade 1_IVY PARK.jpg')}
                  alt="Ivy Park Residence"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gold p-6 shadow-xl">
                <p className="font-serif text-3xl text-dark font-light">10+</p>
                <p className="text-dark/70 text-[10px] font-sans font-semibold tracking-wider uppercase mt-0.5">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10', suffix: '+', label: 'Years in Real Estate' },
              { number: '4', suffix: '', label: 'Landmark Developments' },
              { number: '1000', suffix: '+', label: 'Homes Delivered' },
              { number: '3', suffix: '', label: 'Prime Nairobi Locations' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-serif text-5xl text-white font-light mb-1">{stat.number}{stat.suffix}</p>
                <p className="text-white/35 text-[10px] font-sans tracking-[0.2em] uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">OUR PRINCIPLES</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-dark">What We Stand For</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Quality Uncompromised',
                body: 'Every Ivy Group development is built to an exacting standard — premium finishes, high-quality materials, and meticulous attention to detail in every unit and common space.',
              },
              {
                title: 'Prime Locations, Always',
                body: "We develop exclusively in Nairobi's most desirable and high-value neighbourhoods. Location is the single most important factor in property investment — we choose each site accordingly.",
              },
              {
                title: 'Transparent Dealings',
                body: 'We believe in straightforward pricing, clear contracts, and honest communication. No hidden charges, no surprises. Our clients buy with confidence because we operate with integrity.',
              },
              {
                title: 'On-Time Delivery',
                body: 'Our track record speaks for itself. We have delivered multiple projects on schedule — and we apply the same discipline and project management rigour to every new development.',
              },
              {
                title: 'Investor-First Thinking',
                body: 'We design every project with the investor in mind — optimising layouts, communal amenities, and specifications to maximise rental appeal and long-term capital growth.',
              },
              {
                title: 'After-Sales Partnership',
                body: 'Our relationship with buyers does not end at handover. We provide ongoing support, property management referrals, and act as a long-term partner in protecting your investment.',
              },
            ].map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-white p-7 border border-dark/8"
              >
                <div className="w-8 h-[2px] bg-gold mb-5" />
                <h3 className="font-serif text-xl text-dark font-light mb-4">{val.title}</h3>
                <p className="text-dark/55 text-sm font-sans font-light leading-[1.8]">{val.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developments snapshot */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">OUR PORTFOLIO</p>
            <h2 className="font-serif text-4xl font-light text-dark">Our Landmark Projects</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Blossom Ivy Residence', location: 'Kileleshwa', image: encodeURI('/Blossoms Ivy Residence Assets/Exterior/Blossoms_Ivy exterior.png'), href: '/blossom-ivy' },
              { name: 'Luckinn Ivy Residence', location: 'Westlands', image: encodeURI('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Exterior.png'), href: '/luckinn-ivy' },
              { name: 'Ivy Park Residence', location: 'Kilimani', image: encodeURI('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg'), href: '/ivy-park' },
              { name: 'Ivy Myst', location: 'Kileleshwa', image: encodeURI('/Ivy Myst Assets/Entrance.jpg'), href: '/ivy-myst' },
            ].map((proj, i) => (
              <Link key={proj.href} href={proj.href} className="group block relative aspect-[3/4] overflow-hidden">
                <Image src={proj.image} alt={proj.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <p className="text-gold text-[9px] font-sans font-semibold tracking-widest uppercase mb-1">{proj.location}</p>
                  <p className="font-serif text-white text-base font-light">{proj.name}</p>
                  <p className="text-white/40 text-[10px] font-sans mt-1 flex items-center gap-1">VIEW <ArrowRight size={9} /></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark text-center">
        <div className="max-w-xl mx-auto px-6">
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
