'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation, X } from 'lucide-react'
import { HEAD_OFFICE } from '@/data/office'

const STORAGE_KEY = 'ivy-moved-notice-dismissed'

export default function MovedNotice() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== '1') setShow(true)
    } catch {
      setShow(true)
    }
  }, [])

  const dismiss = () => {
    setShow(false)
    try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore */ }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.section
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-dark border-b border-gold/20 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3.5 flex items-center gap-4">
            <p className="text-gold text-[9px] font-sans font-semibold tracking-[0.28em] uppercase flex-shrink-0 hidden sm:block">
              We&rsquo;ve Moved
            </p>
            <p className="text-white/70 text-xs sm:text-[13px] font-sans font-light leading-snug flex-1">
              <span className="text-gold font-medium sm:hidden">We&rsquo;ve moved — </span>
              Our head office is now at {HEAD_OFFICE.building}, {HEAD_OFFICE.street} ({HEAD_OFFICE.landmark}).
            </p>
            <a
              href={HEAD_OFFICE.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-[0.16em] uppercase text-dark bg-gold px-4 py-2 hover:bg-white transition-colors"
            >
              <Navigation size={11} /> <span className="hidden sm:inline">Directions</span>
            </a>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="flex-shrink-0 text-white/30 hover:text-white/70 transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
