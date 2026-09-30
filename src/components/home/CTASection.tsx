'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin, ArrowRight } from 'lucide-react'
import { PHONE_RAW, PHONE_PRETTY, EMAIL, waLink } from '@/lib/contact'
import { trackConversion } from '@/lib/analytics'

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-dark">
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute right-0 inset-y-0 w-1/2">
          <Image
            src={encodeURI('/IVY PARK RESIDENCE Assests/COURTYARD/05_Courtyard 5K.png')}
            alt="Ivy Group courtyard"
            fill
            className="object-cover object-left"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/75 to-dark/20" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <p className="text-gold-light text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">
            Speak to a consultant
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.08] mb-6">
            Book a viewing at our Kilimani suite
          </h2>
          <p className="text-white/55 text-sm font-sans font-light leading-relaxed mb-9">
            Our team is at the Ivy Park sales suite on Kirichwa Road, near Yaya Centre, Monday to
            Saturday. Call, message, or ask us to send you a brochure.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href={`tel:${PHONE_RAW}`}
              onClick={() => trackConversion('call', { source: 'home-cta' })}
              className="inline-flex items-center justify-center gap-2.5 bg-gold-dark text-white px-7 py-4 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-gold transition-colors duration-300"
            >
              <Phone size={13} /> {PHONE_PRETTY}
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackConversion('whatsapp', { source: 'home-cta' })}
              className="inline-flex items-center justify-center gap-2.5 border border-white/35 text-white px-7 py-4 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-white hover:text-dark transition-all duration-300"
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2.5 border border-white/35 text-white px-7 py-4 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-white hover:text-dark transition-all duration-300"
            >
              <Mail size={13} /> Email
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase text-white/60 hover:text-gold transition-colors group"
            >
              Contact page
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="inline-flex items-center gap-1.5 text-white/35 text-[11px] font-sans">
              <MapPin size={11} className="text-gold-light" />
              Ivy Park Residence, Kirichwa Road, Kilimani
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
