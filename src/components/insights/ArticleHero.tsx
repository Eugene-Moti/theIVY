'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Tag, Clock } from 'lucide-react'
import ShareButtons from '@/components/shared/ShareButtons'

interface ArticleHeroProps {
  image: string
  title: string
  category: string
  readTime: string
  date: string
}

export default function ArticleHero({ image, title, category, readTime, date }: ArticleHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.9], [0.45, 0.1])

  return (
    <section ref={ref} className="relative h-[64vh] min-h-[480px] bg-dark overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" style={{ opacity: 0.45 }} />
      </motion.div>
      <motion.div style={{ opacity }} className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/20" />

      <div className="relative h-full flex flex-col justify-end pb-14 max-w-4xl mx-auto px-6 lg:px-10 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-1.5 mb-4"
        >
          <Tag size={10} className="text-gold" />
          <span className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase">{category}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-tight leading-[1.04] mb-5"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-5"
        >
          <div className="flex items-center gap-5 text-white/45 text-[11px] font-sans">
            <span className="flex items-center gap-1.5"><Clock size={11} />{readTime}</span>
            <span>{date}</span>
          </div>
          <div className="w-px h-4 bg-white/20 hidden sm:block" />
          <ShareButtons title={title} />
        </motion.div>
      </div>
    </section>
  )
}
