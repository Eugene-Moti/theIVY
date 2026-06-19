'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, CheckCircle } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  projectName: string
  brochurePath: string
}

export default function BrochureModal({ isOpen, onClose, projectName, brochurePath }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  /* Reset when reopened */
  useEffect(() => {
    if (isOpen) setStatus('idle')
  }, [isOpen])

  /* Trap scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'brochure-download', project: projectName }),
      })
    } catch {
      /* silently continue — download should still work */
    }
    setStatus('success')
    /* Trigger download after a short delay */
    setTimeout(() => {
      const a = document.createElement('a')
      a.href = brochurePath
      a.download = `${projectName} Brochure.pdf`
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }, 800)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-dark/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            aria-modal="true"
            role="dialog"
          >
            <div className="bg-white w-full max-w-md relative shadow-2xl">

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-dark/40 hover:text-dark transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Header stripe */}
              <div className="bg-dark px-8 py-6">
                <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.25em] uppercase mb-1">
                  Download Brochure
                </p>
                <h2 className="font-serif text-2xl text-white font-light">{projectName}</h2>
              </div>

              <div className="px-8 py-7">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <CheckCircle size={40} className="text-gold mx-auto mb-4" />
                    <p className="font-serif text-xl text-dark mb-2">Thank You!</p>
                    <p className="text-dark/60 text-sm font-sans leading-relaxed">
                      Your brochure is downloading. Our team will be in touch shortly.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-6 text-[11px] font-sans font-semibold tracking-widest uppercase text-dark/50 hover:text-gold transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-dark/55 text-xs font-sans leading-relaxed mb-6">
                      Please share your details and we will send you the full brochure plus keep you
                      updated on the latest availability.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-sans font-semibold tracking-[0.15em] uppercase text-dark/50 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Your full name"
                          className="w-full border border-dark/15 px-4 py-3 text-sm font-sans text-dark placeholder:text-dark/30 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-sans font-semibold tracking-[0.15em] uppercase text-dark/50 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="w-full border border-dark/15 px-4 py-3 text-sm font-sans text-dark placeholder:text-dark/30 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-sans font-semibold tracking-[0.15em] uppercase text-dark/50 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="+254 7XX XXX XXX"
                          className="w-full border border-dark/15 px-4 py-3 text-sm font-sans text-dark placeholder:text-dark/30 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center gap-2 bg-dark text-white py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-60 mt-2"
                      >
                        {status === 'loading' ? (
                          <span className="animate-pulse">Preparing Download…</span>
                        ) : (
                          <>
                            <Download size={13} />
                            DOWNLOAD BROCHURE
                          </>
                        )}
                      </button>

                      <p className="text-dark/30 text-[10px] font-sans text-center leading-relaxed">
                        Your details are kept confidential and used solely to provide you with project information.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
