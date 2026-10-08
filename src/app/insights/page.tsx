'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { articles } from '@/data/insights'
import ArticleCard from '@/components/shared/ArticleCard'

const featured = articles.find((a) => a.featured)!
const rest = articles.filter((a) => !a.featured)
const CATEGORIES = ['All', ...Array.from(new Set(rest.map((a) => a.category)))]

export default function InsightsPage() {
  const [active, setActive] = useState('All')

  const filtered = useMemo(
    () => (active === 'All' ? rest : rest.filter((a) => a.category === active)),
    [active],
  )

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[52vh] min-h-[420px] bg-dark overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 7, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Image
            src={encodeURI('/Ivy Myst Assets/New Renders/Exterior/Rooftop Surrounding Views.png')}
            alt="Insights"
            fill
            className="object-cover opacity-35"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.35em] uppercase mb-4">EDITORIAL</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-semibold tracking-tight">Insights</h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-[2px] bg-gold mx-auto mt-5"
            />
            <p className="text-white/50 text-sm font-sans font-light max-w-lg mx-auto mt-4 leading-relaxed">
              Market intelligence, neighbourhood guides, and investment perspectives from The Ivy Group.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-0 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-20">
          <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-8">FEATURED ARTICLE</p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/insights/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-dark/8 group-hover:border-gold/30 transition-colors overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-dark">
                  <motion.div
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ margin: '-80px' }}
                    transition={{ duration: 2.6, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="bg-cream p-10 lg:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-gold text-dark text-[9px] font-sans font-bold tracking-[0.2em] uppercase px-3 py-1.5">
                      {featured.category}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-dark font-light leading-snug mb-5 group-hover:text-gold/80 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-dark/55 text-sm font-sans font-light leading-relaxed mb-7">{featured.excerpt}</p>
                  <div className="flex items-center gap-5 text-dark/40 text-[10px] font-sans mb-8">
                    <span className="flex items-center gap-1.5"><Clock size={11} />{featured.readTime}</span>
                    <span>{featured.date}</span>
                  </div>
                  <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-dark flex items-center gap-2 group-hover:gap-3 transition-all">
                    READ ARTICLE <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase">MORE ARTICLES</p>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={`relative px-4 py-2 text-[9.5px] font-sans font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${
                    active === cat ? 'text-dark' : 'text-dark/40 hover:text-dark/70'
                  }`}
                >
                  {active === cat && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 bg-cream border border-gold/40"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            <AnimatePresence mode="popLayout">
              {filtered.map((article, i) => (
                <motion.div key={article.slug} layout exit={{ opacity: 0, scale: 0.95 }}>
                  <ArticleCard article={article} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Newsletter strip */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="py-16 bg-dark"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-3">STAY INFORMED</p>
          <h2 className="font-serif text-3xl text-white font-light mb-4">Nairobi Real Estate Insights, Direct to Your Inbox</h2>
          <div className="w-10 h-[2px] bg-gold mx-auto mb-7" />
          <p className="text-white/45 text-sm font-sans font-light leading-relaxed mb-8">
            Subscribe to receive market reports, new development launches, and investment guides from The Ivy Group team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold text-dark px-10 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
          >
            GET IN TOUCH <ArrowRight size={12} />
          </Link>
        </div>
      </motion.section>
    </>
  )
}
