'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react'
import { articles } from '@/data/insights'

const latest = [...articles]
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .slice(0, 3)

// Each card drifts in from a different direction and replays every time
// it crosses into view, instead of a single uniform fade.
const DIRECTIONS = [
  { x: -50, y: 20 },
  { x: 0, y: 50 },
  { x: 50, y: 20 },
]

export default function InsightsTeaser() {
  return (
    <section className="bg-white py-20 lg:py-28 border-t border-dark/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between gap-6 mb-14"
        >
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
          {latest.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, x: DIRECTIONS[i].x, y: DIRECTIONS[i].y }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ margin: '-80px' }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/insights/${a.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-dark">
                  {/* Ken Burns zoom on entrance, extra zoom on hover */}
                  <motion.div
                    initial={{ scale: 1.12 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ margin: '-80px' }}
                    transition={{ duration: 2.4, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={80}
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                    />
                  </motion.div>

                  {/* Rising gradient + CTA, revealed on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 pb-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-white text-[10px] font-sans font-semibold tracking-[0.18em] uppercase">
                      Read article
                    </span>
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gold text-dark">
                      <ArrowUpRight size={13} />
                    </span>
                  </div>

                  <span className="absolute top-4 left-4 bg-dark/70 backdrop-blur-sm text-white text-[8.5px] font-sans font-semibold tracking-[0.2em] uppercase px-3 py-[6px]">
                    {a.category}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-serif text-xl text-gold/50 leading-none mt-0.5 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
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
                  </div>
                </div>

                {/* Accent rule — expands to full width on hover */}
                <div className="h-px bg-dark/10 mt-5 overflow-hidden">
                  <div className="h-full w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href="/insights"
          className="sm:hidden mt-10 inline-flex items-center gap-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-dark/50"
        >
          All articles <ArrowRight size={11} />
        </Link>
      </div>
    </section>
  )
}
