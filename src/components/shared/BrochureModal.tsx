'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import LeadForm from '@/components/shared/LeadForm'

interface Props {
  isOpen: boolean
  onClose: () => void
  projectName: string
  brochurePath: string
}

export default function BrochureModal({ isOpen, onClose, projectName, brochurePath }: Props) {
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  const startDownload = () => {
    setTimeout(() => {
      const a = document.createElement('a')
      a.href = brochurePath
      a.download = `${projectName} Brochure.pdf`
      a.target = '_blank'
      a.rel = 'noreferrer'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }, 600)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-dark/70 backdrop-blur-sm flex items-start sm:items-center justify-center overflow-y-auto py-8 px-4"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg relative shadow-2xl my-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 text-dark/40 hover:text-dark transition-colors"
            >
              <X size={18} />
            </button>

            <div className="bg-dark px-8 py-6">
              <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.25em] uppercase mb-1.5">
                Request the brochure
              </p>
              <h2 className="font-serif text-2xl text-white font-light" style={{ letterSpacing: '0.01em' }}>
                {projectName}
              </h2>
            </div>

            <div className="px-8 py-7">
              <p className="text-dark/55 text-[13px] font-sans font-light leading-relaxed mb-6">
                Share a few details and we&apos;ll send the full brochure — floor plans, pricing and
                payment schedules — and have an advisor follow up.
              </p>
              <LeadForm
                variant="standard"
                leadType="brochure-download"
                project={projectName}
                source={`Brochure modal — ${projectName}`}
                submitLabel="Send & download brochure"
                onSuccess={startDownload}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
