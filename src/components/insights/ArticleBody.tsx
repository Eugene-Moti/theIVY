'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Article } from '@/data/insights'

export default function ArticleBody({ excerpt, content }: { excerpt: string; content: Article['content'] }) {
  return (
    <>
      {/* Excerpt / lead */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="font-serif text-xl text-dark/75 font-light leading-relaxed mb-8 border-l-2 border-gold pl-5"
      >
        {excerpt}
      </motion.p>

      <div className="w-12 h-[2px] bg-dark/10 mb-10" />

      {/* Content blocks */}
      <div className="space-y-7">
        {content.map((block, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            {block.heading && (
              <h2 className="font-serif text-2xl text-dark font-light mb-4 mt-8 flex items-baseline gap-3">
                <span className="w-5 h-px bg-gold flex-shrink-0 mb-1" />
                {block.heading}
              </h2>
            )}
            <p
              className={`text-dark/65 text-[15px] font-sans font-light leading-[1.9] ${
                i === 0
                  ? 'first-letter:font-serif first-letter:text-6xl first-letter:text-gold first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8]'
                  : ''
              }`}
            >
              {block.body}
            </p>

            {block.image && (
              <motion.figure
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-7 mb-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-dark group">
                  <motion.div
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 2.2, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={block.image}
                      alt={block.imageAlt ?? block.heading ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 768px"
                      quality={82}
                    />
                  </motion.div>
                </div>
                {block.imageCaption && (
                  <figcaption className="text-dark/40 text-[11.5px] font-serif italic mt-3">
                    {block.imageCaption}
                  </figcaption>
                )}
              </motion.figure>
            )}
          </motion.div>
        ))}
      </div>
    </>
  )
}
