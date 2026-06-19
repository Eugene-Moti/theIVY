'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Check } from 'lucide-react'
import { projects } from '@/data/projects'

const buyableProjects = projects.filter(p => !p.isLaunchingSoon)

export default function BuyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[440px] bg-dark overflow-hidden">
        <Image
          src={encodeURI('/Blossoms Ivy Residence Assets/Exterior/Blossoms_Ivy exterior.png')}
          alt="Properties for Sale"
          fill
          className="object-cover object-center opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.35em] uppercase mb-4">PROPERTIES FOR SALE</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-light leading-tight">Buy a Home</h1>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-5" />
            <p className="text-white/50 text-sm font-sans font-light max-w-lg mx-auto mt-5 leading-relaxed">
              Discover available residences across The Ivy Group's premium portfolio. All properties are sold directly by the developer — no agent commissions, no hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Buy Direct */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border border-white/10">
            {[
              { label: 'No Agent Fees', desc: 'Buy direct from the developer' },
              { label: 'Flexible Plans', desc: '20% deposit, balance through construction' },
              { label: 'Legal Support', desc: 'Full conveyancing assistance' },
              { label: 'After-Sales Care', desc: 'Dedicated relationship manager' },
            ].map(item => (
              <div key={item.label} className="py-6 px-6 text-center">
                <p className="text-white text-sm font-sans font-medium mb-1">{item.label}</p>
                <p className="text-white/35 text-[11px] font-sans font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Properties */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">AVAILABLE NOW</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-dark">Properties for Sale</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
          </motion.div>

          <div className="space-y-6">
            {buyableProjects.map((proj, i) => (
              <motion.div
                key={proj.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white group overflow-hidden border border-dark/8 hover:border-gold/30 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* Image */}
                  <div className="lg:col-span-2 relative overflow-hidden aspect-[16/9] lg:aspect-auto">
                    <Image
                      src={proj.heroImage}
                      alt={proj.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-gold/10 border border-gold/30 text-gold text-[9px] font-sans font-bold tracking-widest px-2.5 py-1 uppercase">{proj.statusLabel}</span>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={10} className="text-dark/40" />
                          <span className="text-dark/40 text-[10px] font-sans">{proj.locationFull}</span>
                        </div>
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl text-dark font-light mb-3">{proj.name}</h2>
                      <p className="text-dark/55 text-sm font-sans font-light leading-relaxed mb-5">{proj.tagline}</p>

                      {/* Available units quick list */}
                      <div className="space-y-2 mb-6">
                        {proj.availableUnits.map(unit => (
                          <div key={unit.type} className="flex items-center justify-between border-b border-dark/6 pb-2">
                            <div className="flex items-center gap-2">
                              <Check size={11} className="text-gold flex-shrink-0" />
                              <span className="text-dark/70 text-xs font-sans">{unit.type}</span>
                              <span className="text-dark/35 text-[10px] font-sans">{unit.size}</span>
                            </div>
                            <span className="text-dark text-xs font-sans font-medium">{unit.price}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-dark/40 text-[10px] font-sans flex gap-4">
                        {proj.floors > 0 && <span>{proj.floors} Floors</span>}
                        {proj.totalUnits > 0 && <span>{proj.totalUnits.toLocaleString()} Total Units</span>}
                        <span>Completion: {proj.completion}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-7">
                      <Link
                        href={`/${proj.slug}`}
                        className="inline-flex items-center gap-2 bg-dark text-white px-6 py-3 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
                      >
                        VIEW FULL DETAILS <ArrowRight size={10} />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center border border-dark/20 text-dark/70 px-6 py-3 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors"
                      >
                        ENQUIRE
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Process */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">HOW IT WORKS</p>
            <h2 className="font-serif text-4xl font-light text-dark">The Buying Process</h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-5" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Choose Your Unit', desc: 'Browse our portfolio and select the development, unit type, and floor that best suits your lifestyle and budget.' },
              { step: '02', title: 'Secure & Reserve', desc: 'Pay a reservation deposit to hold your unit while we prepare the Sale and Purchase Agreement.' },
              { step: '03', title: 'Sign & Pay Deposit', desc: 'Review and sign the agreement, then pay the initial 20% deposit within 7 days of signing.' },
              { step: '04', title: 'Handover', desc: 'Upon project completion, receive your keys and take possession of your new home.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <p className="font-serif text-5xl text-dark/8 font-light mb-4">{item.step}</p>
                <h3 className="font-serif text-lg text-dark font-light mb-3">{item.title}</h3>
                <p className="text-dark/55 text-sm font-sans font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream border-t border-dark/8 text-center">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="font-serif text-3xl text-dark font-light mb-4">Ready to take the next step?</h2>
          <p className="text-dark/55 text-sm font-sans font-light leading-relaxed mb-7">
            Call us, email us, or fill in our contact form and a member of our sales team will be in touch within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+254118266666" className="bg-dark text-white px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold transition-colors">
              CALL +254 118 266 666
            </a>
            <Link href="/contact" className="border border-dark text-dark px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-dark hover:text-white transition-all">
              SEND AN ENQUIRY
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
