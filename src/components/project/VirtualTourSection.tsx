'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, ExternalLink } from 'lucide-react'
import { type VrTour } from '@/data/projects'

function TourCard({ tour }: { tour: VrTour }) {
  return (
    <motion.a
      href={tour.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden aspect-[4/3] w-full block focus:outline-none"
    >
      {/* Thumbnail */}
      <Image
        src={tour.thumbnail}
        alt={tour.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

      {/* 360° badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/20 px-2.5 py-1">
        <span className="text-gold text-[9px] font-sans font-bold tracking-[0.2em]">360°</span>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:border-gold group-hover:bg-gold/20 group-hover:scale-110">
          <Play size={18} className="text-white fill-white ml-1" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h4 className="text-white font-serif text-lg font-light mb-1 leading-tight">
          {tour.title}
        </h4>
        <p className="text-white/50 text-[11px] font-sans leading-relaxed mb-3">
          {tour.description}
        </p>
        <div className="flex items-center gap-1.5 text-gold text-[10px] font-sans font-semibold tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink size={10} />
          Open Tour
        </div>
      </div>
    </motion.a>
  )
}

export default function VirtualTourSection({ tours }: { tours: VrTour[] }) {
  const categories = Array.from(new Set(tours.map(t => t.category)))

  return (
    <section className="py-24 lg:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">
            IMMERSIVE EXPERIENCE
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight">
              Virtual Tours
            </h2>
            <p className="text-white/40 text-sm font-sans font-light max-w-sm leading-relaxed">
              Step inside Luckinn Ivy Residence from anywhere in the world. Explore every space in full 360°.
            </p>
          </div>
          <div className="w-12 h-[2px] bg-gold mt-5" />
        </motion.div>

        {/* Categories */}
        {categories.map(category => (
          <div key={category} className="mb-12 last:mb-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-white/30 text-[10px] font-sans tracking-[0.25em] uppercase mb-5 flex items-center gap-3"
            >
              <span className="w-5 h-px bg-white/20" />
              {category}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tours
                .filter(t => t.category === category)
                .map(tour => (
                  <TourCard key={tour.url} tour={tour} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
