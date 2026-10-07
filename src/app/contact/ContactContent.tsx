'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Navigation, MessageCircle } from 'lucide-react'
import { HEAD_OFFICE, FORMER_OFFICE } from '@/data/office'
import LeadForm from '@/components/shared/LeadForm'
import { PHONE_RAW, waLink } from '@/lib/contact'
import { trackConversion } from '@/lib/analytics'

export default function ContactContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[46vh] min-h-[380px] bg-dark overflow-hidden">
        <Image
          src={encodeURI('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 01-1.jpg')}
          alt="Contact The Ivy Group"
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.35em] uppercase mb-4">REACH US</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-semibold tracking-tight">Contact Us</h1>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-5" />
          </motion.div>
        </div>
      </section>

      {/* We've moved notice */}
      <section className="bg-gold/10 border-y border-gold/25">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.28em] uppercase flex-shrink-0">
            We&rsquo;ve Moved
          </p>
          <p className="text-dark/70 text-sm font-sans font-light leading-relaxed">
            Our head office is now the {HEAD_OFFICE.name} at {HEAD_OFFICE.building}, {HEAD_OFFICE.street} ({HEAD_OFFICE.landmark}).
            Blossoms Ivy Residence in Kileleshwa remains open for viewings by appointment.
          </p>
          <a
            href={HEAD_OFFICE.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase text-dark border border-dark px-5 py-3 hover:bg-dark hover:text-white transition-colors"
          >
            <Navigation size={12} /> Directions
          </a>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">GET IN TOUCH</p>
              <h2 className="font-serif text-4xl text-dark font-light leading-tight mb-5">We'd Love to Hear From You</h2>
              <div className="w-10 h-[2px] bg-gold mb-8" />
              <p className="text-dark/55 text-sm font-sans font-light leading-relaxed mb-10">
                Whether you're a first-time buyer, seasoned investor, or simply exploring your options, our sales team is here to guide you through every step of the journey.
              </p>

              <div className="space-y-6">
                <a
                  href={`tel:${PHONE_RAW}`}
                  onClick={() => trackConversion('call', { source: 'contact-page' })}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <Phone size={14} className="text-gold group-hover:text-dark transition-colors" />
                  </div>
                  <div>
                    <p className="text-dark/35 text-[9px] font-sans tracking-[0.2em] uppercase mb-0.5">Phone</p>
                    <p className="text-dark text-sm font-sans">+254 118 266 666</p>
                  </div>
                </a>

                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackConversion('whatsapp', { source: 'contact-page' })}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <MessageCircle size={14} className="text-gold group-hover:text-dark transition-colors" />
                  </div>
                  <div>
                    <p className="text-dark/35 text-[9px] font-sans tracking-[0.2em] uppercase mb-0.5">WhatsApp</p>
                    <p className="text-dark text-sm font-sans">+254 118 266 666</p>
                  </div>
                </a>

                <a href="mailto:marketing.ivy-group@rsunproperty.net" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <Mail size={14} className="text-gold group-hover:text-dark transition-colors" />
                  </div>
                  <div>
                    <p className="text-dark/35 text-[9px] font-sans tracking-[0.2em] uppercase mb-0.5">Email</p>
                    <p className="text-dark text-sm font-sans">marketing.ivy-group@rsunproperty.net</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-dark/35 text-[9px] font-sans tracking-[0.2em] uppercase mb-0.5">Head Office</p>
                    <p className="text-dark text-sm font-sans">{HEAD_OFFICE.building} — {HEAD_OFFICE.name}</p>
                    <p className="text-dark/50 text-xs font-sans">{HEAD_OFFICE.street} ({HEAD_OFFICE.landmark}), {HEAD_OFFICE.city}</p>
                    <a
                      href={HEAD_OFFICE.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-gold text-[11px] font-sans font-semibold tracking-wider uppercase mt-2 hover:gap-2.5 transition-all"
                    >
                      <Navigation size={11} /> Get Directions
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-dark/15 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-dark/40" />
                  </div>
                  <div>
                    <p className="text-dark/35 text-[9px] font-sans tracking-[0.2em] uppercase mb-0.5">By Appointment</p>
                    <p className="text-dark text-sm font-sans">{FORMER_OFFICE.name}</p>
                    <p className="text-dark/50 text-xs font-sans">{FORMER_OFFICE.street}, {FORMER_OFFICE.city} — {FORMER_OFFICE.note}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-dark/8">
                <p className="text-dark/35 text-[9px] font-sans tracking-[0.25em] uppercase mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { label: 'Instagram', href: 'https://www.instagram.com/theivygroupke' },
                    { label: 'Facebook', href: 'https://www.facebook.com/share/1JfveKL618/' },
                    { label: 'TikTok', href: 'https://www.tiktok.com/@the.ivy.group.ke' },
                    { label: 'YouTube', href: 'https://youtube.com/@theivygroupke' },
                  ].map(social => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-dark/15 text-dark/50 text-[9px] font-sans font-semibold tracking-wider uppercase px-3 py-2 hover:border-gold hover:text-gold transition-colors"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              <LeadForm variant="full" leadType="contact-form" source="Contact page" submitLabel="Send enquiry" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
          <p className="text-dark/35 text-[10px] font-sans tracking-[0.25em] uppercase mb-5">FIND US</p>
          <div className="w-full h-[400px] overflow-hidden border border-dark/8">
            <iframe
              src={HEAD_OFFICE.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`The Ivy Group Head Office — ${HEAD_OFFICE.building}, Kirichwa Road, Kilimani`}
            />
          </div>
        </div>
      </section>
    </>
  )
}
