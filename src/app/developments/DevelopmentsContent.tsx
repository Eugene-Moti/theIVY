'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, MessageCircle, Check } from 'lucide-react'
import { projects, ProjectUnit } from '@/data/projects'
import { PHONE_RAW, PHONE_PRETTY, waLink } from '@/lib/contact'

const ORDER = ['ivy-myst', 'ivy-park', 'blossom-ivy', 'luckinn-ivy']

const blurbs: Record<string, string> = {
  'blossom-ivy': 'Heated indoor pool, spa, yoga studio and a grand lobby across 22 floors — nearing completion in Kileleshwa.',
  'luckinn-ivy': 'Premium 2 & 3-bedroom apartments with a heated pool, co-working spaces and a business lounge in the heart of Westlands.',
  'ivy-park': '1, 2 & 3-bedroom homes with a rooftop garden, lounge and bar — 660 residences across three blocks near Yaya Centre.',
  'ivy-myst': '1, 2 & 3-bedroom residences with private garden terraces and the rooftop Celestial Pool. Now selling in Kileleshwa.',
}

function priceFrom(units: ProjectUnit[]): string | null {
  const nums = units
    .map((u) => Number(String(u.price).replace(/[^0-9]/g, '')))
    .filter((n) => n > 100000)
  if (!nums.length) return null
  return `From KES ${Math.min(...nums).toLocaleString('en-KE')}`
}

const list = ORDER.map((slug) => projects.find((p) => p.slug === slug)!)

const buyDirect = [
  { label: 'No agent fees', desc: 'Buy directly from the developer — no commissions, no hidden costs.' },
  { label: 'Flexible plans', desc: 'Typically a 20% deposit, with the balance spread through construction.' },
  { label: 'Legal support', desc: 'Full conveyancing assistance and clear ownership documentation.' },
  { label: 'After-sales care', desc: 'A dedicated relationship manager through handover and beyond.' },
]

const steps = [
  { n: '01', title: 'Choose your home', desc: 'Browse the portfolio and select the development, unit type and floor that suit you.' },
  { n: '02', title: 'Reserve the unit', desc: 'Pay a reservation deposit to hold it while we prepare the sale agreement.' },
  { n: '03', title: 'Sign & pay the deposit', desc: 'Review and sign, then pay the initial 20% deposit.' },
  { n: '04', title: 'Handover', desc: 'On completion, receive your keys and ownership documents.' },
]

const plans = [
  { name: 'Installment plan', detail: '20% deposit, balance spread across the construction period.', for: 'Investors and salaried buyers planning over time.' },
  { name: 'Cash purchase', detail: 'Balance payable within 30 days — at a discounted price.', for: 'Cash buyers seeking maximum savings.' },
  { name: 'Mortgage', detail: '20% deposit, balance financed by a partner bank on completion.', for: 'First-time and long-term owner-occupiers.' },
]

export default function DevelopmentsContent() {
  return (
    <>
      {/* ── Header ── */}
      <section className="relative h-[52vh] min-h-[420px] bg-dark overflow-hidden">
        <Image
          src={encodeURI('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg')}
          alt="The Ivy Group developments"
          fill
          priority
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-gold-light text-[11px] font-sans font-semibold tracking-[0.35em] uppercase mb-4">Our Portfolio</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-light leading-tight" style={{ letterSpacing: '0.01em' }}>
              Developments
            </h1>
            <p className="text-white/55 text-sm font-sans font-light max-w-lg mx-auto mt-5 leading-relaxed">
              Four landmark residential developments across Kileleshwa, Westlands and Kilimani —
              sold directly by the developer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {list.map((proj, i) => {
              const from = priceFrom(proj.availableUnits)
              return (
                <motion.article
                  key={proj.slug}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
                  className="group bg-white border border-dark/8 hover:border-gold/40 transition-colors flex flex-col"
                >
                  <Link href={`/${proj.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                    <Image
                      src={proj.heroImage}
                      alt={proj.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={84}
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-4 left-4 bg-dark/75 backdrop-blur-sm px-3 py-[6px] text-white text-[8px] font-sans font-semibold tracking-[0.2em]">
                      {proj.statusLabel}
                    </span>
                  </Link>
                  <div className="p-7 lg:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin size={11} className="text-gold flex-shrink-0" />
                      <p className="text-gold text-[9px] font-sans font-semibold tracking-[0.24em] uppercase">{proj.locationLabel}</p>
                    </div>
                    <Link href={`/${proj.slug}`}>
                      <h2 className="font-serif text-2xl text-dark font-light leading-tight mb-3 group-hover:text-gold transition-colors" style={{ letterSpacing: '0.01em' }}>
                        {proj.name}
                      </h2>
                    </Link>
                    <p className="text-dark/50 text-[13px] font-sans font-light leading-[1.8] mb-6 flex-1">{blurbs[proj.slug]}</p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-6 text-dark/40 text-[10.5px] font-sans tracking-wide">
                      {proj.floors > 0 && <span>{proj.floors} floors</span>}
                      {proj.totalUnits > 0 && <span>{proj.totalUnits.toLocaleString()} residences</span>}
                      <span>{proj.completion}</span>
                      {from && <span className="text-dark/70 font-medium">{from}</span>}
                    </div>
                    <div className="flex gap-2.5">
                      <Link
                        href={`/${proj.slug}`}
                        className="flex-1 text-center bg-dark text-white py-3 text-[10px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-gold-dark transition-colors"
                      >
                        View development
                      </Link>
                      <a
                        href={waLink(proj.name)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`WhatsApp about ${proj.name}`}
                        className="flex items-center justify-center border border-dark/20 text-dark/60 w-12 hover:border-gold hover:text-gold transition-colors"
                      >
                        <MessageCircle size={15} />
                      </a>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Buying with the Ivy Group ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">Buying With Us</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-dark leading-[1.1] mb-14">
            Direct from the developer, start to finish
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-dark/10 divide-y sm:divide-y-0 sm:divide-x divide-dark/10 mb-20">
            {buyDirect.map((b) => (
              <div key={b.label} className="py-7 sm:px-7 first:sm:pl-0 last:sm:pr-0">
                <p className="font-serif text-lg text-dark font-light mb-2" style={{ letterSpacing: '0.01em' }}>{b.label}</p>
                <p className="text-dark/55 text-[13px] font-sans font-light leading-[1.75]">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-dark/35 text-[10px] font-sans tracking-[0.24em] uppercase mb-8">The buying process</p>
              <ol className="space-y-7">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-5">
                    <span className="font-serif text-2xl text-gold/50 font-light tabular-nums flex-shrink-0 leading-none pt-1">{s.n}</span>
                    <div>
                      <p className="font-serif text-lg text-dark font-light mb-1.5" style={{ letterSpacing: '0.01em' }}>{s.title}</p>
                      <p className="text-dark/55 text-[13px] font-sans font-light leading-[1.75]">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="text-dark/35 text-[10px] font-sans tracking-[0.24em] uppercase mb-8">Payment options</p>
              <div className="space-y-5">
                {plans.map((p) => (
                  <div key={p.name} className="border border-dark/10 p-6">
                    <p className="font-serif text-lg text-dark font-light mb-1.5" style={{ letterSpacing: '0.01em' }}>{p.name}</p>
                    <p className="text-dark/60 text-[13px] font-sans font-light leading-[1.7] mb-2">{p.detail}</p>
                    <p className="text-dark/35 text-[11px] font-sans flex items-start gap-1.5">
                      <Check size={11} className="text-gold mt-0.5 flex-shrink-0" /> {p.for}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-dark text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="text-gold-light text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">Get in touch</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight mb-5">
            Not sure which development fits?
          </h2>
          <p className="text-white/50 text-sm font-sans font-light leading-relaxed mb-8">
            Our team will walk you through each project, share detailed pricing, and help you match a
            home to your budget and plans.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`tel:${PHONE_RAW}`}
              className="inline-flex items-center justify-center gap-2 bg-gold-dark text-white px-8 py-4 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-gold transition-colors"
            >
              {PHONE_PRETTY}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/35 text-white px-8 py-4 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-white hover:text-dark transition-all"
            >
              Send an enquiry <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
