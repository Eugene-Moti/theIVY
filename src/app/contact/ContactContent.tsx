'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react'

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
            <h1 className="font-serif text-5xl md:text-6xl text-white font-light">Contact Us</h1>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-5" />
          </motion.div>
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
                    <p className="text-dark text-sm font-sans">Blossoms Ivy Residence</p>
                    <p className="text-dark/50 text-xs font-sans">Gatundu Road, Kileleshwa, Nairobi</p>
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
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d451.6556133047034!2d36.78503743441678!3d-1.276938025382227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x182f170056423b43%3A0xac4d412392285ae0!2sBLOSSOMS%20IVY%20RESIDENCE%2C%20Nairobi!3m2!1d-1.2771432999999999!2d36.785353199999996!5e1!3m2!1sen!2ske!4v1781850935628!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Ivy Group Head Office — Blossoms Ivy Residence, Kileleshwa"
            />
          </div>
        </div>
      </section>
    </>
  )
}
