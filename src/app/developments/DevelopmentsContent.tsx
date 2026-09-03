'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'

export default function DevelopmentsContent() {
  return (
    <>
      {/* Page Header */}
      <section className="relative h-[50vh] min-h-[420px] bg-dark overflow-hidden">
        <Image
          src={encodeURI('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg')}
          alt="The Ivy Group Developments"
          fill
          className="object-cover object-center opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.35em] uppercase mb-4">OUR PORTFOLIO</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-semibold tracking-tight leading-tight">Our Developments</h1>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-6" />
            <p className="text-white/50 text-sm font-sans font-light max-w-lg mx-auto mt-5 leading-relaxed">
              Four landmark residential projects across Nairobi's most coveted neighbourhoods — each designed to the highest standard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj, i) => (
              <motion.div
                key={proj.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <Link href={`/${proj.slug}`} className="group block bg-white overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={proj.heroImage}
                      alt={proj.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`text-[9px] font-sans font-bold tracking-[0.2em] uppercase px-3 py-1.5 ${
                        proj.isLaunchingSoon
                          ? 'bg-gold text-dark'
                          : proj.statusLabel === 'EARLY BIRD'
                          ? 'bg-gold/20 border border-gold text-gold backdrop-blur-sm'
                          : proj.statusLabel === 'LIMITED UNITS'
                          ? 'bg-white/90 text-dark'
                          : 'bg-white/90 text-dark'
                      }`}>
                        {proj.statusLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 border-b border-x border-dark/8 group-hover:border-gold/30 transition-colors">
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin size={10} className="text-gold" />
                      <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.25em] uppercase">{proj.locationLabel}</p>
                    </div>
                    <h2 className="font-serif text-2xl text-dark font-light mb-2">{proj.name}</h2>
                    <p className="text-dark/55 text-sm font-sans font-light leading-snug mb-5">{proj.tagline}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-3">
                        {proj.floors > 0 && (
                          <span className="text-dark/40 text-[10px] font-sans">{proj.floors} Floors</span>
                        )}
                        {proj.totalUnits > 0 && (
                          <span className="text-dark/40 text-[10px] font-sans">{proj.totalUnits.toLocaleString()} Units</span>
                        )}
                        <span className="text-dark/40 text-[10px] font-sans">{proj.completion}</span>
                      </div>
                      <span className="text-[10px] font-sans font-semibold tracking-wider uppercase text-dark/40 group-hover:text-gold transition-colors flex items-center gap-1">
                        VIEW <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">GET IN TOUCH</p>
          <h2 className="font-serif text-4xl text-white font-light mb-5">Not Sure Which Development Is Right For You?</h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mb-7" />
          <p className="text-white/50 text-sm font-sans font-light leading-relaxed mb-8">
            Our sales team is on hand to guide you through each project, provide detailed pricing, and help you find the perfect match for your lifestyle and investment goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold text-dark px-10 py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
          >
            SPEAK TO AN ADVISER <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </>
  )
}
