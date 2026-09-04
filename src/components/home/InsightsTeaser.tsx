'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { articles } from '@/data/insights'

const latest = [...articles]
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .slice(0, 3)

export default function InsightsTeaser() {
  return (
    <section className="bg-white py-20 lg:py-28 border-t border-dark/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">
              The Journal
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-dark leading-[1.1]"
            >
              Market notes &amp; neighbourhood guides
            </h2>
          </div>
          <Link
            href="/insights"
            className="hidden sm:inline-flex items-center gap-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-dark/50 hover:text-gold transition-colors flex-shrink-0"
          >
            All articles <ArrowRight size={11} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {latest.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link href={`/insights/${a.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden mb-5">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={78}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="text-gold text-[9px] font-sans font-semibold tracking-[0.22em] uppercase mb-2.5">
                  {a.category}
                </p>
                <h3
                  className="font-serif text-lg text-dark font-light leading-snug mb-3 group-hover:text-gold transition-colors"
                  style={{ letterSpacing: '0.01em' }}
                >
                  {a.title}
                </h3>
                <div className="flex items-center gap-3 text-dark/40 text-[10px] font-sans">
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {a.readTime}
                  </span>
                  <span>{a.date}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
