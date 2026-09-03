'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, CheckCircle, Navigation } from 'lucide-react'
import { HEAD_OFFICE, FORMER_OFFICE } from '@/data/office'

type FormState = { name: string; email: string; phone: string; interest: string; message: string }
const INTERESTS = ['Blossom Ivy Residence', 'Luckinn Ivy Residence', 'Ivy Park Residence', 'Ivy Myst', 'General Enquiry']

export default function ContactContent() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', interest: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'contact-form' }),
      })
    } catch { /* continue */ }
    setStatus('success')
  }

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
            Blossom Ivy Residence in Kileleshwa remains open for viewings by appointment.
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
                <a href="tel:+254118266666" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <Phone size={14} className="text-gold group-hover:text-dark transition-colors" />
                  </div>
                  <div>
                    <p className="text-dark/35 text-[9px] font-sans tracking-[0.2em] uppercase mb-0.5">Phone & WhatsApp</p>
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
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-10">
                  <CheckCircle size={48} className="text-gold mb-5" />
                  <h3 className="font-serif text-3xl text-dark font-light mb-3">Message Received</h3>
                  <p className="text-dark/55 text-sm font-sans font-light leading-relaxed max-w-sm">
                    Thank you for getting in touch. A member of our team will contact you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-[11px] font-sans font-semibold tracking-widest uppercase text-dark/40 hover:text-gold transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-sans font-semibold tracking-[0.15em] uppercase text-dark/45 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Your full name"
                        className="w-full border border-dark/15 px-4 py-3.5 text-sm font-sans text-dark placeholder:text-dark/30 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans font-semibold tracking-[0.15em] uppercase text-dark/45 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="+254 7XX XXX XXX"
                        className="w-full border border-dark/15 px-4 py-3.5 text-sm font-sans text-dark placeholder:text-dark/30 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-semibold tracking-[0.15em] uppercase text-dark/45 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      placeholder="your@email.com"
                      className="w-full border border-dark/15 px-4 py-3.5 text-sm font-sans text-dark placeholder:text-dark/30 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-semibold tracking-[0.15em] uppercase text-dark/45 mb-1.5">I'm Interested In</label>
                    <select
                      value={form.interest}
                      onChange={set('interest')}
                      className="w-full border border-dark/15 px-4 py-3.5 text-sm font-sans text-dark focus:outline-none focus:border-gold transition-colors appearance-none bg-white"
                    >
                      <option value="">Select a development (optional)</option>
                      {INTERESTS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-semibold tracking-[0.15em] uppercase text-dark/45 mb-1.5">Message</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Tell us about your requirements, preferred unit type, budget, or any questions you have…"
                      className="w-full border border-dark/15 px-4 py-3.5 text-sm font-sans text-dark placeholder:text-dark/30 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-dark text-white py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-60"
                  >
                    {status === 'loading' ? <span className="animate-pulse">SENDING…</span> : 'SEND ENQUIRY'}
                  </button>

                  <p className="text-dark/30 text-[10px] font-sans text-center">
                    We typically respond within 24 hours. Your details are kept strictly confidential.
                  </p>
                </form>
              )}
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
