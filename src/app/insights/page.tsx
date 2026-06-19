'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { articles } from '@/data/insights'

const featured = articles.find(a => a.featured)!
const rest = articles.filter(a => !a.featured)

export default function InsightsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[48vh] min-h-[400px] bg-dark overflow-hidden">
        <Image
          src={encodeURI('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg')}
          alt="Insights"
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.35em] uppercase mb-4">EDITORIAL</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-light">Insights</h1>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-5" />
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
          <Link href={`/insights/${featured.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-dark/8 group-hover:border-gold/30 transition-colors overflow-hidden">
              {/* Image */}
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
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
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-10">MORE ARTICLES</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={`/insights/${article.slug}`} className="group block bg-white border border-dark/8 hover:border-gold/30 transition-colors overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 mb-3">
                      <Tag size={9} className="text-gold" />
                      <span className="text-gold text-[9px] font-sans font-semibold tracking-[0.2em] uppercase">{article.category}</span>
                    </div>
                    <h3 className="font-serif text-lg text-dark font-light leading-snug mb-3 group-hover:text-gold/80 transition-colors">{article.title}</h3>
                    <p className="text-dark/50 text-xs font-sans font-light leading-relaxed mb-5 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between border-t border-dark/6 pt-4">
                      <div className="flex items-center gap-3 text-dark/35 text-[10px] font-sans">
                        <span className="flex items-center gap-1"><Clock size={10} />{article.readTime}</span>
                        <span>{article.date}</span>
                      </div>
                      <span className="text-[9px] font-sans font-semibold tracking-wider uppercase text-dark/35 group-hover:text-gold transition-colors flex items-center gap-1">
                        READ <ArrowRight size={9} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter strip */}
      <section className="py-16 bg-dark">
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
      </section>
    </>
  )
}
