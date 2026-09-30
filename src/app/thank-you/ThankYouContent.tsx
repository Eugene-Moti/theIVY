'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, MessageCircle, Phone } from 'lucide-react'
import { PHONE_RAW, PHONE_PRETTY, waLink } from '@/lib/contact'
import { trackConversion } from '@/lib/analytics'

/**
 * URL-based conversion fallback. Nothing currently redirects here — the
 * lead forms show an inline success state so a brochure download / the
 * rest of a project page isn't interrupted, and fire the "lead" conversion
 * event directly (see LeadForm.tsx). This page exists so a specific flow
 * can point at it later and so Google Ads has a simple page-load
 * conversion action available as a second option.
 */
export default function ThankYouContent() {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    trackConversion('lead', { source: 'thank-you-page' })
  }, [])

  return (
    <section className="min-h-screen bg-dark flex items-center justify-center px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md text-center"
      >
        <CheckCircle size={48} className="text-gold mx-auto mb-7" />
        <p className="text-gold-light text-[10px] font-sans font-semibold tracking-[0.32em] uppercase mb-4">
          Enquiry Received
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-white font-light leading-tight mb-5">
          Thank you for reaching out
        </h1>
        <p className="text-white/55 text-sm font-sans font-light leading-relaxed mb-10">
          One of our property advisors will be in touch by email, phone, or WhatsApp shortly. In the
          meantime, feel free to keep exploring — or reach us directly below.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackConversion('whatsapp', { source: 'thank-you-page' })}
            className="inline-flex items-center justify-center gap-2 bg-gold-dark text-white px-6 py-3.5 text-[11px] font-sans font-semibold tracking-[0.16em] uppercase hover:bg-gold transition-colors"
          >
            <MessageCircle size={13} /> WhatsApp Us
          </a>
          <a
            href={`tel:${PHONE_RAW}`}
            onClick={() => trackConversion('call', { source: 'thank-you-page' })}
            className="inline-flex items-center justify-center gap-2 border border-white/35 text-white px-6 py-3.5 text-[11px] font-sans font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-dark transition-all"
          >
            <Phone size={13} /> {PHONE_PRETTY}
          </a>
        </div>

        <Link
          href="/developments"
          className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase text-white/50 hover:text-gold transition-colors group"
        >
          Continue browsing developments
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  )
}
