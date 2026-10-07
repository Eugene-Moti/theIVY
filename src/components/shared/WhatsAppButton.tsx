'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackConversion } from '@/lib/analytics'

const HREF =
  'https://wa.me/254118266666?text=%5BWebsite%20Enquiry%5D%20Hello%2C%20I%20came%20across%20The%20Ivy%20Group%20website%20and%20I%27m%20interested%20in%20learning%20more%20about%20your%20developments.%20Please%20share%20more%20information.'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  const [bubble, setBubble] = useState(false)

  useEffect(() => {
    const show = setTimeout(() => setBubble(true), 3800)
    const hide = setTimeout(() => setBubble(false), 8400)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  return (
    <motion.div
      className="fixed bottom-7 right-7 z-50 flex flex-col items-end gap-3"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Chat bubble — appears a few seconds after entry */}
      <AnimatePresence>
        {bubble && !hovered && (
          <motion.button
            onClick={() => setBubble(false)}
            initial={{ opacity: 0, y: 10, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-dark text-left px-5 py-4 shadow-2xl"
            style={{ borderRadius: 2, maxWidth: 224 }}
            aria-label="Dismiss"
          >
            <p className="text-[8px] font-sans tracking-[0.28em] uppercase text-gold mb-1.5 leading-none">
              The Ivy Group
            </p>
            <p className="text-[12px] font-light text-white/85 leading-snug">
              Have a question?<br />We&apos;re here to help.
            </p>
            {/* Arrow tail */}
            <span
              className="absolute -bottom-[5px] right-[26px] w-[10px] h-[10px] bg-dark"
              style={{ transform: 'rotate(45deg)' }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Button */}
      <div className="relative">
        {/* Pulse rings — only while idle */}
        <AnimatePresence>
          {!hovered && (
            <motion.div
              key="rings"
              className="absolute inset-0 rounded-full pointer-events-none"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-[#25D366]/30"
                animate={{ scale: [1, 1.9], opacity: [0.65, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.9 }}
              />
              <motion.span
                className="absolute inset-0 rounded-full bg-[#25D366]/18"
                animate={{ scale: [1, 2.4], opacity: [0.45, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.55, repeatDelay: 0.9 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          onClick={() => trackConversion('whatsapp', { source: 'floating-button' })}
          onHoverStart={() => { setHovered(true); setBubble(false) }}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center bg-dark shadow-2xl overflow-hidden"
          style={{ height: 56, width: 220, borderRadius: 2 }}
        >
          {/* Gold inset border — revealed on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.45)' }}
          />

          {/* WhatsApp icon — always visible, left side */}
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: 56, height: 56 }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                fill="#25D366"
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
              />
              <path
                fill="#25D366"
                d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.855L.057 23.527a.75.75 0 00.916.916l5.672-1.476A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.617-.517-5.107-1.414l-.366-.215-3.791.985.985-3.791-.215-.366A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
              />
            </svg>
          </div>

          {/* Revealed text */}
          <div className="pr-5 whitespace-nowrap">
            <p className="text-[8px] font-sans tracking-[0.25em] uppercase text-white/40 leading-none mb-[3px]">
              Chat with us
            </p>
            <p className="text-[11px] font-sans font-semibold tracking-[0.15em] uppercase text-white leading-none">
              WhatsApp
            </p>
          </div>
        </motion.a>
      </div>
    </motion.div>
  )
}
