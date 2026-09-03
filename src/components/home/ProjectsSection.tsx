'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

const p = (path: string) => encodeURI(path)

const projects = [
  {
    boldPart: 'BLOSSOM IVY',
    lightPart: 'Residence',
    location: 'Kileleshwa, Nairobi',
    status: 'AVAILABLE',
    description:
      'Luxury residences with indoor heated pool, spa, yoga studio and grand lobby across 22 floors in Kileleshwa.',
    image: p(
      '/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/13_KCGV_Blossom Ivy_R1 Pool 2.jpg',
    ),
    href: '/blossom-ivy',
    cta: 'EXPLORE',
  },
  {
    boldPart: 'LUCKINN IVY',
    lightPart: 'Residence',
    location: 'Westlands, Nairobi',
    status: 'LIMITED UNITS',
    description:
      'Premium 2 & 3BR apartments with heated pool, co-working spaces and business lounge in the heart of Westlands.',
    image: p('/Luckinn Ivy Assets/Amenities/Indoor heated Swimming Pool.png'),
    href: '/luckinn-ivy',
    cta: 'EXPLORE',
  },
  {
    boldPart: 'IVY PARK',
    lightPart: 'Residence',
    location: 'Kilimani, Nairobi',
    status: 'EARLY BIRD',
    description:
      'Modern 1, 2 & 3BR apartments with rooftop garden, lounge and bar — 660 units across 3 blocks in Kilimani.',
    image: p('/IVY PARK RESIDENCE Assests/AMENITIES/ROOFTOP/251027_FINAL_Creative(18).jpg'),
    href: '/ivy-park',
    cta: 'EXPLORE',
  },
  {
    boldPart: 'IVY MYST',
    lightPart: 'Now Selling',
    location: 'Kileleshwa, Nairobi',
    status: 'NOW SELLING',
    description:
      '1, 2 & 3BR luxury residences with private garden terraces and the Celestial Rooftop Pool. Sales now open.',
    image: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop Celestial Pool.png'),
    href: '/ivy-myst',
    cta: 'SECURE A UNIT',
  },
]


export default function ProjectsSection() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-[1360px] mx-auto px-8 lg:px-14">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-5 mb-20"
        >
          <span className="text-[10px] font-sans font-semibold tracking-[0.32em] uppercase text-dark/35 whitespace-nowrap">
            Our Portfolio
          </span>
          <div className="flex-1 h-px bg-dark/10" />
          <Link
            href="/developments"
            className="flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-dark/28 hover:text-gold transition-colors duration-300 group whitespace-nowrap"
          >
            View All
            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* 2-column wide card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20">
          {projects.map((project, i) => (
            <motion.article
              key={project.boldPart}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i % 2 === 0 ? 0 : 0.15 }}
              className="group flex flex-col"
            >
              {/* Image — wider aspect ratio so images are prominent */}
              <Link
                href={project.href}
                className="block relative overflow-hidden mb-7"
                style={{ aspectRatio: '3 / 2' }}
              >
                <Image
                  src={project.image}
                  alt={`${project.boldPart} ${project.lightPart}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={88}
                />
                {/* Status badge */}
                <div className="absolute top-4 left-4 bg-dark/72 backdrop-blur-sm px-3 py-[6px]">
                  <span className="text-white text-[8px] font-sans font-semibold tracking-[0.2em]">
                    {project.status}
                  </span>
                </div>
              </Link>

              {/* Text */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1.5 mb-3.5">
                  <MapPin size={10} className="text-gold flex-shrink-0" />
                  <p className="text-[9px] font-sans font-semibold tracking-[0.25em] uppercase text-gold">
                    {project.location}
                  </p>
                </div>

                <Link href={project.href} className="block mb-4">
                  <h3
                    className="font-serif leading-[1.15] text-dark hover:text-gold transition-colors duration-300"
                    style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)' }}
                  >
                    <span className="font-medium uppercase" style={{ letterSpacing: '0.04em' }}>{project.boldPart}</span>{' '}
                    <span className="font-light" style={{ letterSpacing: '0.02em' }}>{project.lightPart}</span>
                  </h3>
                </Link>

                <p className="text-dark/48 text-[13px] font-sans font-light leading-[1.85] mb-7 flex-1">
                  {project.description}
                </p>

                <Link
                  href={project.href}
                  className="self-start inline-flex items-center gap-2.5 bg-dark text-white text-[9px] font-sans font-semibold tracking-[0.22em] uppercase px-6 py-3.5 hover:bg-gold hover:text-dark transition-colors duration-300 group/btn"
                >
                  {project.cta}
                  <ArrowRight
                    size={10}
                    className="group-hover/btn:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
