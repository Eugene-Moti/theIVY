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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const cardVariants = {
  hidden: { opacity: 0, x: -52 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.82, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function ProjectsSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Eyebrow — HassConsult style: label · rule · link */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-5 mb-16"
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

        {/* Card grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-64px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {projects.map((project) => (
            <motion.article
              key={project.boldPart}
              variants={cardVariants}
              className="group flex flex-col"
            >
              {/* Image */}
              <Link
                href={project.href}
                className="block relative overflow-hidden mb-5"
                style={{ aspectRatio: '4 / 3' }}
              >
                <Image
                  src={project.image}
                  alt={`${project.boldPart} ${project.lightPart}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={88}
                />
                {/* Status badge */}
                <div className="absolute top-3 left-3 bg-dark/72 backdrop-blur-sm px-2.5 py-[5px]">
                  <span className="text-white text-[8px] font-sans font-semibold tracking-[0.18em]">
                    {project.status}
                  </span>
                </div>
              </Link>

              {/* Text content */}
              <div className="flex flex-col flex-1">
                {/* Location */}
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin size={10} className="text-gold flex-shrink-0" />
                  <p className="text-[9px] font-sans font-semibold tracking-[0.22em] uppercase text-gold">
                    {project.location}
                  </p>
                </div>

                {/* Mixed-case title — HassConsult style */}
                <Link href={project.href} className="block mb-3">
                  <h3
                    className="font-serif leading-[1.18] text-dark hover:text-gold transition-colors duration-300"
                    style={{ fontSize: 'clamp(1.12rem, 1.55vw, 1.42rem)' }}
                  >
                    <span className="font-normal uppercase tracking-tight">
                      {project.boldPart}
                    </span>{' '}
                    <span style={{ fontStyle: 'italic', fontWeight: 300 }}>
                      {project.lightPart}
                    </span>
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-dark/48 text-[12.5px] font-sans font-light leading-[1.8] mb-6 flex-1">
                  {project.description}
                </p>

                {/* CTA — dark pill button */}
                <Link
                  href={project.href}
                  className="self-start inline-flex items-center gap-2 bg-dark text-white text-[9px] font-sans font-semibold tracking-[0.22em] uppercase px-5 py-3 hover:bg-gold hover:text-dark transition-colors duration-300 group/btn"
                >
                  {project.cta}
                  <ArrowRight
                    size={9}
                    className="group-hover/btn:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
