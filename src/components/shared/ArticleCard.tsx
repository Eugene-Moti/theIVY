'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Article } from '@/data/insights'

const DIRECTIONS = [
  { x: -50, y: 20 },
  { x: 0, y: 50 },
  { x: 50, y: 20 },
]

export default function ArticleCard({ article, index }: { article: Article; index: number }) {
  const dir = DIRECTIONS[index % DIRECTIONS.length]

  return (
    <motion.div
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ margin: '-80px' }}
      transition={{ duration: 0.75, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/insights/${article.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-dark">
          <motion.div
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ margin: '-80px' }}
            transition={{ duration: 2.4, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={80}
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
            />
          </motion.div>

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
            {article.category}
          </span>
        </div>

        <div className="flex items-start gap-3">
          <span className="font-serif text-xl text-gold/50 leading-none mt-0.5 flex-shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3
              className="font-serif text-lg text-dark font-light leading-snug mb-3 group-hover:text-gold transition-colors"
              style={{ letterSpacing: '0.01em' }}
            >
              {article.title}
            </h3>
            <div className="flex items-center gap-3 text-dark/40 text-[10px] font-sans">
              <span className="flex items-center gap-1">
                <Clock size={10} /> {article.readTime}
              </span>
              <span>{article.date}</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-dark/10 mt-5 overflow-hidden">
          <div className="h-full w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full" />
        </div>
      </Link>
    </motion.div>
  )
}
