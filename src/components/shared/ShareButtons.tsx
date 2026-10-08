'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Facebook, Linkedin, Twitter, MessageCircle, Link2, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  vertical?: boolean
  className?: string
}

/** Builds share links from the current page URL at click-time, so it works
 * correctly on every deploy (preview, production) without hard-coding a host. */
function useShareUrl() {
  return () => (typeof window !== 'undefined' ? window.location.href : 'https://www.ivygroup.ke')
}

export default function ShareButtons({ title, vertical = false, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const getUrl = useShareUrl()

  const links = [
    {
      label: 'Share on WhatsApp',
      icon: MessageCircle,
      href: () => `https://wa.me/?text=${encodeURIComponent(`${title} — ${getUrl()}`)}`,
    },
    {
      label: 'Share on X',
      icon: Twitter,
      href: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getUrl())}`,
    },
    {
      label: 'Share on Facebook',
      icon: Facebook,
      href: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
    },
    {
      label: 'Share on LinkedIn',
      icon: Linkedin,
      href: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`,
    },
  ]

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — fail silently, the icon just won't confirm.
    }
  }

  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} items-center gap-2 ${className}`}>
      {links.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href()}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-dark/12 text-dark/50 hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
        >
          <Icon size={14} />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="relative flex items-center justify-center w-9 h-9 rounded-full border border-dark/12 text-dark/50 hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? 'check' : 'link'}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {copied ? <Check size={14} className="text-gold" /> : <Link2 size={14} />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  )
}
