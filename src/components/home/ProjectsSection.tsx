'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

const projects = [
  {
    name: 'Blossom Ivy Residence',
    location: 'Gatundu Road, Kileleshwa',
    type: 'Luxury Apartments · 22 Floors · 220 Units',
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
    type: 'Luxury Apartments · 20 Floors · 120 Units',
    status: 'LIMITED UNITS',
    statusDot: 'bg-gold',
    price: 'Limited Units',
    completion: 'Dec 2026',
    image: encodeURI('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Exterior.png'),
    href: '/luckinn-ivy',
  },
  {
    name: 'Ivy Park Residence',
    location: 'Kirichwa Road, Kilimani',
    type: 'Modern Apartments · 22 Floors · 660 Units',
    status: 'EARLY BIRD',
    statusDot: 'bg-white',
    price: 'From KES 6.82M',
    completion: 'Dec 2028',
    image: encodeURI('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Day_Ivy Park.jpg'),
    href: '/ivy-park',
  },
  {
    name: 'Ivy Myst',
    location: 'Gatundu Road, Kileleshwa',
    type: 'Luxury Residences · 1, 2 & 3 Bedrooms · Garden Terraces',
    status: 'NOW SELLING',
    statusDot: 'bg-gold',
    price: 'From KES 8.8M',
    completion: 'Aug 2029',
    image: encodeURI('/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.png'),
    href: '/ivy-myst',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function ProjectsSection() {
  return (
    <section className="py-24 lg:py-36 bg-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 lg:mb-16"
        >
          <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">
            OUR PORTFOLIO
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-[1.1] max-w-lg">
              Signature Developments<br />Across Nairobi
            </h2>

            <Link
              href="/developments"
              className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase text-white/50 hover:text-gold transition-colors duration-300 group self-start lg:self-auto"
            >
              VIEW ALL DEVELOPMENTS
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Thin gold rule */}
          <div className="mt-8 h-px w-16 bg-gold" />
        </motion.div>

        {/* 2×2 project grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.name} variants={cardVariants}>
              <Link href={project.href} className="group relative block overflow-hidden">

                {/* Image container */}
                <div className="relative aspect-[3/2] overflow-hidden bg-dark/10">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Permanent gradient — bottom-heavy for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Status badge — top-right */}
                  <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/20 px-3 py-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${project.statusDot}`} />
                    <span className="text-white text-[9px] font-sans font-semibold tracking-[0.18em]">
                      {project.status}
                    </span>
                  </div>

                  {/* Card content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">

                    {/* Location */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <MapPin size={10} className="text-gold flex-shrink-0" />
                      <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.22em] uppercase">
                        {project.location}
                      </p>
                    </div>

                    {/* Name */}
                    <h3 className="font-serif text-white text-2xl lg:text-3xl font-light mb-1 leading-tight">
                      {project.name}
                    </h3>

                    {/* Type */}
                    <p className="text-white/55 text-[11px] font-sans tracking-wide">
                      {project.type}
                    </p>

                    {/* Reveal strip — slides up on hover */}
                    <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between
                      translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-300 ease-out">
                      <div>
                        <p className="text-white/50 text-[9px] font-sans tracking-widest uppercase mb-0.5">
                          Starting Price
                        </p>
                        <p className="text-white text-sm font-sans font-semibold">{project.price}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gold text-[10px] font-sans font-semibold tracking-[0.18em] uppercase">
                        VIEW PROJECT
                        <ArrowRight size={11} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
