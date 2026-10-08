'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ShareButtons from '@/components/shared/ShareButtons'

/** Compact title + share bar that slides in under the navbar once the
 * reader has scrolled past the hero, so sharing is always within reach. */
export default function StickyShareBar({ title }: { title: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed top-[60px] lg:top-[68px] left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-dark/8"
        >
          <div className="max-w-3xl mx-auto px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
            <p className="font-serif text-dark text-sm font-light truncate">{title}</p>
            <ShareButtons title={title} className="flex-shrink-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
