'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bell, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function RentContent() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

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
      {/* Full-screen hero */}
      <section className="relative min-h-screen bg-dark flex items-center overflow-hidden">
        <Image
          src={encodeURI('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Pool_002 Day.png')}
          alt="Rental Coming Soon"
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

            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.4em] uppercase mb-5">RENTALS</p>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-[1.04] mb-4">Coming Soon</h1>
            <div className="w-12 h-[2px] bg-gold mx-auto mb-7" />

            <p className="text-white/55 text-base font-sans font-light max-w-xl mx-auto leading-relaxed mb-4">
              The Ivy Group is currently focused on owner-occupied and investment purchases. We are actively developing a premium rental programme and will launch it shortly.
            </p>
            <p className="text-white/40 text-sm font-sans font-light max-w-md mx-auto leading-relaxed mb-12">
              Register your email below and we will notify you the moment rental units become available across our portfolio.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-gold/30 bg-gold/10 px-8 py-6 max-w-sm mx-auto"
              >
                <p className="text-gold text-sm font-sans font-medium mb-1">You're on the list.</p>
                <p className="text-white/50 text-xs font-sans font-light">We'll be in touch the moment rentals are available.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/8 border border-white/20 text-black placeholder:text-black/30 px-5 py-3.5 text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  className="bg-gold text-dark px-7 py-3.5 text-[10px] font-sans font-bold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors whitespace-nowrap flex items-center gap-1.5"
                >
                  NOTIFY ME <ArrowRight size={11} />
                </button>
              </form>
            )}
          </motion.div>

          <div className="mt-20 pt-12 border-t border-white/10">
            <p className="text-white/35 text-xs font-sans font-light mb-6 uppercase tracking-widest">Meanwhile, explore our properties for sale</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/buy" className="border border-white/30 text-white/70 px-8 py-3 text-[10px] font-sans font-semibold tracking-wider uppercase hover:border-gold hover:text-gold transition-colors">
                VIEW PROPERTIES FOR SALE
              </Link>
              <Link href="/contact" className="border border-white/30 text-white/70 px-8 py-3 text-[10px] font-sans font-semibold tracking-wider uppercase hover:border-gold hover:text-gold transition-colors">
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
