'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Check, ArrowRight, Download, Sparkles, Phone } from 'lucide-react'
import { type ProjectData, projects } from '@/data/projects'
import BrochureModal from '@/components/shared/BrochureModal'
import VirtualTourSection from '@/components/project/VirtualTourSection'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

export default function ProjectTemplate({ data }: { data: ProjectData }) {
  const [brochureOpen, setBrochureOpen] = useState(false)

  const related = projects.filter(p => p.slug !== data.slug).slice(0, 3)

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-screen w-full overflow-hidden bg-dark">
        <Image
          src={data.heroImage}
          alt={data.name}
          fill
          className="object-cover object-center ken-burns"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-dark/20" />

        {/* Special offer banner */}
        {data.specialOffer && (
          <div className="absolute top-24 left-0 right-0 flex justify-center z-10">
            <div className="flex items-center gap-2 bg-gold/20 border border-gold text-gold px-5 py-2 backdrop-blur-sm">
              <Sparkles size={11} />
              <span className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase">{data.specialOffer}</span>
            </div>
          </div>
        )}

        <div className="relative h-full flex flex-col justify-end pb-16 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={11} className="text-gold" />
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.28em] uppercase">{data.locationLabel}</p>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-[1.04] mb-3">{data.name}</h1>
            <p className="text-white/65 text-sm font-sans font-light max-w-lg leading-relaxed mb-8">{data.tagline}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#units" className="bg-gold text-dark px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors">
                VIEW UNITS & PRICING
              </a>
              <button
                type="button"
                onClick={() => setBrochureOpen(true)}
                className="flex items-center gap-2 border border-white/60 text-white px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
              >
                <Download size={12} /> DOWNLOAD BROCHURE
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW STRIP ── */}
      <div className="bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-white/10 border-t border-b border-white/10">
            {[
              { label: 'Location', value: data.locationFull.split(',')[0] },
              { label: 'Type', value: data.type },
              ...(data.floors > 0 ? [{ label: 'Floors', value: `${data.floors} Floors` }] : []),
              ...(data.totalUnits > 0 ? [{ label: 'Total Units', value: `${data.totalUnits.toLocaleString()} Apartments` }] : []),
              { label: 'Completion', value: data.completion },
            ].map(item => (
              <div key={item.label} className="py-5 px-6 text-center">
                <p className="text-white/30 text-[9px] font-sans tracking-[0.2em] uppercase mb-1">{item.label}</p>
                <p className="text-white text-xs font-sans font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESCRIPTION ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {data.descriptionBlocks ? (
            /* Editorial article layout */
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">THE DEVELOPMENT</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-[1.1] mb-5">{data.name}</h2>
              <div className="w-12 h-[2px] bg-gold mb-10" />

              <div className="space-y-9 max-w-4xl">
                {data.descriptionBlocks.map((block, i) => {
                  if (block.type === 'text') {
                    return (
                      <p key={i} className="text-dark/60 text-sm font-sans font-light leading-[1.95] max-w-2xl">
                        {block.content}
                      </p>
                    )
                  }
                  if (block.type === 'image') {
                    return (
                      <div key={i}>
                        <div className="relative w-full aspect-[16/8] overflow-hidden">
                          <Image
                            src={block.src!}
                            alt={block.caption || data.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 80vw"
                            quality={88}
                          />
                        </div>
                        {block.caption && (
                          <p className="mt-2.5 text-[10px] font-sans text-dark/35 tracking-[0.15em] uppercase">{block.caption}</p>
                        )}
                      </div>
                    )
                  }
                  if (block.type === 'image-pair') {
                    return (
                      <div key={i}>
                        <div className="grid grid-cols-2 gap-3">
                          {block.images?.map((img, j) => (
                            <div key={j}>
                              <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                  src={img.src}
                                  alt={img.caption || data.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 50vw, 40vw"
                                  quality={88}
                                />
                              </div>
                              {img.caption && (
                                <p className="mt-2 text-[10px] font-sans text-dark/35 tracking-[0.15em] uppercase">{img.caption}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>

              {data.blocks && (
                <div className="flex flex-wrap gap-3 mt-10">
                  {[data.blocks, data.floors > 0 ? `${data.floors} Floors` : '', data.parking]
                    .filter(Boolean)
                    .map(tag => (
                      <span key={tag} className="border border-dark/15 text-dark/60 text-[10px] font-sans tracking-wider px-3 py-1.5">{tag}</span>
                    ))}
                </div>
              )}
            </motion.div>
          ) : (
            /* Original two-column layout (fallback) */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">THE DEVELOPMENT</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-[1.1] mb-5">{data.name}</h2>
                <div className="w-12 h-[2px] bg-gold mb-7" />
                {data.descriptionParagraphs.map((para, i) => (
                  <p key={i} className="text-dark/60 text-sm font-sans font-light leading-[1.9] mb-4">{para}</p>
                ))}
                {data.blocks && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {[data.blocks, `${data.floors > 0 ? data.floors + ' Floors' : ''}`, data.parking]
                      .filter(Boolean)
                      .map(tag => (
                        <span key={tag} className="border border-dark/15 text-dark/60 text-[10px] font-sans tracking-wider px-3 py-1.5">{tag}</span>
                      ))}
                  </div>
                )}
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-2 gap-3">
                {data.exteriorImages.slice(0, 4).map((img, i) => (
                  <div key={i} className={`relative overflow-hidden ${i === 0 ? 'col-span-2 aspect-[16/7]' : 'aspect-square'}`}>
                    <Image src={img} alt={`${data.name} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 25vw" />
                  </div>
                ))}
              </motion.div>
            </div>
          )}

        </div>
      </section>

      {/* ── UNITS & PRICING ── */}
      <section id="units" className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">UNITS & PRICING</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-tight">Available Residences</h2>
            <div className="w-12 h-[2px] bg-gold mt-5" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {data.availableUnits.map((unit, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } } }}
                className="bg-white p-7 border border-dark/8 hover:border-gold/40 transition-colors group"
              >
                <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.2em] uppercase mb-3">AVAILABLE</p>
                <h3 className="font-serif text-xl text-dark font-light mb-2">{unit.type}</h3>
                <p className="text-dark/50 text-xs font-sans mb-5">{unit.size}</p>
                <div className="border-t border-dark/8 pt-4 flex items-end justify-between">
                  <div>
                    <p className="text-dark/40 text-[9px] font-sans tracking-widest uppercase mb-1">From</p>
                    <p className="font-serif text-lg text-dark">{unit.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBrochureOpen(true)}
                    className="text-[10px] font-sans font-semibold tracking-wider uppercase text-gold hover:underline flex items-center gap-1"
                  >
                    ENQUIRE <ArrowRight size={10} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {data.soldOutUnits.length > 0 && (
            <div>
              <p className="text-dark/40 text-[10px] font-sans tracking-[0.2em] uppercase mb-4">Sold Out Units</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.soldOutUnits.map((unit, i) => (
                  <div key={i} className="bg-white/50 p-6 border border-dark/8 opacity-60">
                    <p className="text-dark/40 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase mb-2">SOLD OUT</p>
                    <h3 className="font-serif text-lg text-dark font-light mb-1">{unit.type}</h3>
                    <p className="text-dark/40 text-xs font-sans">{unit.size}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">LIFESTYLE</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-tight">World-Class Amenities</h2>
            </div>
            <div className="w-12 h-[2px] bg-gold mt-5" />
          </motion.div>

          {/* Image gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {data.amenities.map((amenity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative overflow-hidden aspect-[4/3]"
              >
                <Image src={amenity.image} alt={amenity.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
                <p className="absolute bottom-4 left-4 text-white text-xs font-sans font-semibold tracking-wider">{amenity.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Amenity list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.amenityList.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check size={13} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                <span className="text-dark/65 text-sm font-sans font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIRTUAL TOURS ── */}
      {data.vrTours && data.vrTours.length > 0 && (
        <VirtualTourSection tours={data.vrTours} />
      )}

      {/* ── WHY INVEST ── */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">WHY INVEST</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight mb-5">
                {data.isLaunchingSoon ? 'Why Secure Early?' : `Why Invest in ${data.name.split(' ')[0]} ${data.name.split(' ')[1]}?`}
              </h2>
              <div className="w-12 h-[2px] bg-gold mb-8" />
              <ul className="space-y-4">
                {data.investmentPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check size={13} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white/65 text-sm font-sans font-light leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col gap-5">
              <div className="border border-white/10 p-7">
                <p className="text-white/30 text-[10px] font-sans tracking-[0.2em] uppercase mb-3">LOCATION ADVANTAGES</p>
                <ul className="space-y-2.5">
                  {data.locationAdvantages.map((adv) => (
                    <li key={adv} className="flex items-center gap-3 text-white/60 text-sm font-sans font-light">
                      <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />{adv}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setBrochureOpen(true)}
                className="flex items-center justify-center gap-2 border border-gold text-gold py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold hover:text-dark transition-all duration-300"
              >
                <Download size={13} />
                DOWNLOAD FULL BROCHURE
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LOCATION MAP ── */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">LOCATION</p>
            <h2 className="font-serif text-4xl font-light text-dark">{data.locationFull}</h2>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </motion.div>
          <div className="w-full h-[420px] overflow-hidden">
            <iframe
              src={data.mapSrc}
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${data.name} location map`}
            />
          </div>
        </div>
      </section>

      {/* ── PAYMENT PLANS ── */}
      {!data.isLaunchingSoon && (
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">FLEXIBLE OPTIONS</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-dark">Payment Plans</h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-5" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  plan: 'Instalment Plan',
                  icon: '⬤',
                  steps: ['20% Deposit within 7 Days', 'Balance spread throughout construction period'],
                  highlight: false,
                },
                {
                  plan: 'Cash Purchase',
                  icon: '◆',
                  steps: ['Balance within 30 Days of signing', 'Attractive cash discount available'],
                  highlight: true,
                },
                {
                  plan: 'Mortgage Purchase',
                  icon: '▲',
                  steps: ['20% Deposit to secure unit', 'Balance financed by partner bank upon completion'],
                  highlight: false,
                },
              ].map((p, i) => (
                <motion.div
                  key={p.plan}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`p-8 border ${p.highlight ? 'bg-dark border-dark' : 'bg-white border-dark/10'}`}
                >
                  <p className={`text-xs font-sans mb-6 ${p.highlight ? 'text-gold' : 'text-dark/30'}`}>{p.icon}</p>
                  <h3 className={`font-serif text-2xl font-light mb-6 ${p.highlight ? 'text-white' : 'text-dark'}`}>{p.plan}</h3>
                  <ul className="space-y-3">
                    {p.steps.map(step => (
                      <li key={step} className={`flex items-start gap-2.5 text-sm font-sans font-light ${p.highlight ? 'text-white/65' : 'text-dark/60'}`}>
                        <Check size={12} className="text-gold mt-0.5 flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BROCHURE / REGISTER INTEREST ── */}
      <section className="py-20 lg:py-28 bg-cream border-t border-dark/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {data.isLaunchingSoon ? (
              <>
                <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">REGISTER YOUR INTEREST</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-dark mb-4">Be First. Get Priority Access.</h2>
                <div className="w-12 h-[2px] bg-gold mx-auto mb-7" />
                <p className="text-dark/55 text-sm font-sans font-light max-w-md mx-auto leading-relaxed mb-8">
                  Register today for priority unit selection, exclusive pre-launch pricing, and the 0% transaction fee offer.
                </p>
              </>
            ) : (
              <>
                <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">LEARN MORE</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-dark mb-4">Download the Full Brochure</h2>
                <div className="w-12 h-[2px] bg-gold mx-auto mb-7" />
                <p className="text-dark/55 text-sm font-sans font-light max-w-md mx-auto leading-relaxed mb-8">
                  Get the complete project overview including floor plans, specifications, and pricing in our detailed brochure.
                </p>
              </>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setBrochureOpen(true)}
                className="inline-flex items-center gap-2.5 bg-dark text-white px-10 py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300"
              >
                <Download size={13} />
                {data.isLaunchingSoon ? 'REGISTER & DOWNLOAD BROCHURE' : 'DOWNLOAD BROCHURE'}
              </button>
              <a
                href="tel:+254118266666"
                className="inline-flex items-center gap-2.5 border border-dark text-dark px-10 py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-dark hover:text-white transition-all duration-300"
              >
                <Phone size={13} />
                CALL US NOW
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RELATED PROJECTS ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">EXPLORE MORE</p>
            <h2 className="font-serif text-4xl font-light text-dark">Other Developments</h2>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((proj, i) => (
              <motion.div
                key={proj.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={`/${proj.slug}`} className="group block relative overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={proj.heroImage} alt={proj.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/20 to-transparent" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-gold text-[9px] font-sans font-semibold tracking-widest uppercase mb-1">{proj.locationLabel}</p>
                      <h3 className="font-serif text-white text-xl font-light">{proj.name}</h3>
                      <p className="text-white/50 text-[10px] font-sans mt-1 flex items-center gap-1">
                        VIEW PROJECT <ArrowRight size={10} />
                      </p>
                    </div>
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
