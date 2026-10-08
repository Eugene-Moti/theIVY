'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { articles } from '@/data/insights'
import ArticleCard from '@/components/shared/ArticleCard'

const latest = [...articles]
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .slice(0, 3)

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
            <ArticleCard key={a.slug} article={a} index={i} />
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
