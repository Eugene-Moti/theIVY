'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden bg-cream">
      {/* Background image — large, right-aligned */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute right-0 inset-y-0 w-1/2">
          <Image
            src={encodeURI('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 01-1.jpg')}
            alt="Ivy Group Lobby"
            fill
            className="object-cover object-left"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/60 to-transparent" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">
              GET IN TOUCH
            </p>

            <h2 className="font-serif text-4xl md:text-5xl font-light text-dark leading-[1.1] mb-5">
              Find Your Perfect Home<br />with The Ivy Group
            </h2>

            <div className="w-12 h-[2px] bg-gold mb-7" />

            <p className="text-dark/60 text-sm font-sans font-light leading-relaxed mb-10">
              Our team of dedicated property consultants is ready to help you find
              the right development — whether you're looking for a dream home or a
              long-term investment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+254118266666"
                className="inline-flex items-center justify-center gap-2.5 bg-dark text-white px-8 py-4 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-gold transition-colors duration-300 group"
              >
                <Phone size={13} />
                +254 118 266 666
              </a>
              <a
                href="mailto:marketing.ivy-group@rsunproperty.net"
                className="inline-flex items-center justify-center gap-2.5 border border-dark text-dark px-8 py-4 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-dark hover:text-white transition-all duration-300"
              >
                <Mail size={13} />
                EMAIL US
              </a>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase text-dark/60 hover:text-gold transition-colors duration-300 group"
              >
                Visit our contact page
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
