'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const p = (path: string) => encodeURI(path)

const cards = [
  {
    label: 'Now Selling',
    title: 'Ivy Myst, Kileleshwa',
    text: 'Curved architecture, garden terraces and a rooftop Celestial Pool. Groundbreaking complete — early-stage pricing.',
    image: p('/Ivy Myst Assets/Courtyard 01_Night.jpg'),
    href: '/ivy-myst',
    cta: 'Explore Ivy Myst',
  },
  {
    label: 'The Portfolio',
    title: 'Four landmark developments',
    text: 'Across Kileleshwa, Westlands and Kilimani — from ready-soon apartments to early-bird investment opportunities.',
    image: p('/Ivy Myst Assets/New Renders/Exterior/Gate Front View.png'),
    href: '/developments',
    cta: 'View all developments',
  },
  {
    label: 'Journal',
    title: 'Market notes & guides',
    text: 'Neighbourhood guides, investment perspectives and construction updates from the Ivy Group team.',
    image: p('/Ivy Myst Assets/New Renders/Myst amenities/reception area.png'),
    href: '/insights',
    cta: 'Start reading',
  },
]

export default function FeatureRow() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col"
            >
              <Link href={c.href} className="relative aspect-[4/3] overflow-hidden mb-6 block bg-[#F5F2EE]">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={82}
                  className="object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              </Link>
              <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.28em] uppercase mb-2.5">
                {c.label}
              </p>
              <h3
                className="font-serif text-xl text-dark font-light mb-3"
                style={{ letterSpacing: '0.01em' }}
              >
                {c.title}
              </h3>
              <p className="text-dark/55 text-[13px] font-sans font-light leading-[1.8] mb-5 flex-1">
                {c.text}
              </p>
              <Link
                href={c.href}
                className="inline-flex items-center gap-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-dark hover:text-gold transition-colors group/link"
              >
                {c.cta}
                <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
