'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bell, ArrowRight, MapPin, Maximize2, BedDouble, CheckCircle, Clock } from 'lucide-react'
import { useState } from 'react'
import type { RentalListing } from './page'

export default function RentContent({ listings }: { listings: RentalListing[] }) {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const hasListings = listings.length > 0

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'rental-waitlist' }),
      })
    } catch { /* continue */ }
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen bg-dark flex items-center overflow-hidden">
        <Image
          src={encodeURI('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Pool_002 Day.png')}
          alt="Luxury Rentals"
          fill
          className="object-cover object-center opacity-25 scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark" />

        <div className="relative w-full max-w-3xl mx-auto px-6 lg:px-10 text-center py-32">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <div className="flex justify-center mb-8">
              <div className="border border-gold/30 p-5">
                <Bell size={24} className="text-gold" strokeWidth={1.5} />
              </div>
            </div>

            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.4em] uppercase mb-5">Rentals</p>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-semibold tracking-tight leading-[1.02] mb-4">
              {hasListings ? 'Premium Rentals' : 'Coming Soon'}
            </h1>
            <div className="w-12 h-[2px] bg-gold mx-auto mb-7" />

            {hasListings ? (
              <p className="text-white/55 text-base font-sans font-light max-w-xl mx-auto leading-relaxed mb-8">
                A curated selection of premium rental apartments across The Ivy Group&apos;s Nairobi portfolio.
                Thoughtfully designed, impeccably finished.
              </p>
            ) : (
              <>
                <p className="text-white/55 text-base font-sans font-light max-w-xl mx-auto leading-relaxed mb-4">
                  The Ivy Group is currently focused on owner-occupied and investment purchases.
                  We are actively developing a premium rental programme and will launch it shortly.
                </p>
                <p className="text-white/40 text-sm font-sans font-light max-w-md mx-auto leading-relaxed mb-12">
                  Register your email below and we will notify you the moment rental units become available.
                </p>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border border-gold/30 bg-gold/10 px-8 py-6 max-w-sm mx-auto"
                  >
                    <p className="text-gold text-sm font-sans font-medium mb-1">You&apos;re on the list.</p>
                    <p className="text-white/50 text-xs font-sans font-light">We&apos;ll be in touch the moment rentals are available.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 bg-white/8 border border-white/20 text-white placeholder:text-white/30 px-5 py-3.5 text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-gold text-dark px-7 py-3.5 text-[10px] font-sans font-bold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors whitespace-nowrap flex items-center gap-1.5"
                    >
                      NOTIFY ME <ArrowRight size={11} />
                    </button>
                  </form>
                )}
              </>
            )}

            {hasListings && (
              <a href="#listings" className="inline-flex items-center gap-2 border border-gold/40 text-gold px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors">
                View Listings <ArrowRight size={11} />
              </a>
            )}
          </motion.div>

          {!hasListings && (
            <div className="mt-20 pt-12 border-t border-white/10">
              <p className="text-white/35 text-xs font-sans font-light mb-6 uppercase tracking-widest">
                Meanwhile, explore our properties for sale
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/buy" className="border border-white/30 text-white/70 px-8 py-3 text-[10px] font-sans font-semibold tracking-wider uppercase hover:border-gold hover:text-gold transition-colors">
                  VIEW PROPERTIES FOR SALE
                </Link>
                <Link href="/contact" className="border border-white/30 text-white/70 px-8 py-3 text-[10px] font-sans font-semibold tracking-wider uppercase hover:border-gold hover:text-gold transition-colors">
                  CONTACT US
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Listings grid */}
      {hasListings && (
        <section id="listings" className="bg-cream py-24 px-6 lg:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14 text-center">
              <p className="text-[10px] tracking-[0.35em] uppercase text-dark/40 mb-3">Available Units</p>
              <h2 className="font-serif text-4xl font-light text-dark">Our Rental Portfolio</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {listings.map((l, i) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white border border-dark/8 group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    {l.featured_image ? (
                      <Image
                        src={l.featured_image}
                        alt={`${l.property} — ${l.unit_type}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-dark/10 flex items-center justify-center">
                        <BedDouble size={28} className="text-dark/20" />
                      </div>
                    )}
                    {/* Status badge */}
                    <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase font-semibold ${
                      l.status === 'available'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-dark/80 text-gold'
                    }`}>
                      {l.status === 'available'
                        ? <><CheckCircle size={10} /> Available</>
                        : <><Clock size={10} /> Coming Soon</>
                      }
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-[9px] tracking-[0.28em] uppercase text-dark/40 mb-1 flex items-center gap-1">
                          <MapPin size={9} /> {l.property}
                        </p>
                        <h3 className="font-serif text-xl font-light text-dark">{l.unit_type}</h3>
                      </div>
                      {l.price_per_month && (
                        <div className="text-right flex-shrink-0 ml-3">
                          <p className="text-[9px] text-dark/35 uppercase tracking-wider">From</p>
                          <p className="text-base font-semibold text-dark">
                            KES {l.price_per_month.toLocaleString()}
                          </p>
                          <p className="text-[9px] text-dark/40">/ month</p>
                        </div>
                      )}
                    </div>

                    {/* Specs row */}
                    <div className="flex items-center gap-4 py-3 border-y border-dark/6 mb-4 text-[10px] text-dark/45 tracking-wide">
                      {l.floor && <span>Floor {l.floor}</span>}
                      {l.size_sqm && (
                        <span className="flex items-center gap-1"><Maximize2 size={10} /> {l.size_sqm} m²</span>
                      )}
                      {l.available_from && (
                        <span className="ml-auto">From {new Date(l.available_from).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
                      )}
                    </div>

                    {l.description && (
                      <p className="text-[12px] text-dark/55 font-light leading-relaxed mb-4 line-clamp-3 flex-1">
                        {l.description}
                      </p>
                    )}

                    {/* Amenities */}
                    {l.amenities?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {l.amenities.slice(0, 4).map(a => (
                          <span key={a} className="text-[9px] tracking-wider uppercase bg-dark/5 text-dark/50 px-2.5 py-1">{a}</span>
                        ))}
                        {l.amenities.length > 4 && (
                          <span className="text-[9px] text-dark/35 px-2 py-1">+{l.amenities.length - 4} more</span>
                        )}
                      </div>
                    )}

                    <Link
                      href="/contact"
                      className="mt-auto flex items-center justify-center gap-2 border border-dark/20 text-dark/70 py-3 text-[10px] tracking-[0.18em] uppercase hover:border-gold hover:text-gold transition-colors"
                    >
                      Enquire <ArrowRight size={11} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
