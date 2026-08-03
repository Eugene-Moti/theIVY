'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2, ChevronDown } from 'lucide-react'

type Message = { role: 'user' | 'model'; text: string }

const GREETING = "Welcome to The Ivy Group. I'm Ivy, your personal property consultant. How may I assist you today?"

const QUICK_REPLIES = [
  'Tell me about Ivy Myst',
  'What are current prices?',
  'How does buying work?',
  'Book a site visit',
]

export default function ChatWidget() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'model', text: GREETING }])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350)
  }, [open])

  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')
    setShowQuick(false)
    const updated: Message[] = [...messages, { role: 'user', text: msg }]
    setMessages(updated)
    setLoading(true)
    try {
      const res  = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'model', text: data.text ?? 'Sorry, something went wrong.' }])
    } catch {
      setMessages(m => [...m, { role: 'model', text: "I'm having trouble connecting. Please call us on +254 118 266 666." }])
    }
    setLoading(false)
  }, [input, loading, messages])

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 left-4 z-50 flex flex-col"
            style={{
              width: 356,
              height: 548,
              maxHeight: 'calc(100dvh - 120px)',
              background: 'linear-gradient(170deg, #0c0c0c 0%, #070707 100%)',
              border: '1px solid rgba(201,168,76,0.2)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.025) inset',
            }}
          >
            {/* Gold top rule */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C 40%, #d4b565 60%, transparent)', flexShrink: 0 }} />

            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-center gap-3">
                {/* Monogram avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-9 h-9 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(145deg, rgba(201,168,76,0.12), rgba(201,168,76,0.05))',
                      border: '1px solid rgba(201,168,76,0.3)',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-cormorant)', color: '#C9A84C', fontSize: '1.15rem', fontWeight: 300, lineHeight: 1 }}>I</span>
                  </div>
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                    style={{ background: '#34d399', border: '2px solid #070707' }}
                  />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-cormorant)', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1.1 }}>
                    Ivy
                  </p>
                  <p style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(201,168,76,0.6)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 2 }}>
                    Property Consultant · Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center transition-colors"
                style={{ color: 'rgba(255,255,255,0.2)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4" style={{ scrollbarWidth: 'none' }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex items-end gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'model' && (
                    <div
                      className="w-6 h-6 flex-shrink-0 flex items-center justify-center mb-0.5"
                      style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)', flexShrink: 0 }}
                    >
                      <span style={{ fontFamily: 'var(--font-cormorant)', color: '#C9A84C', fontSize: '0.78rem' }}>I</span>
                    </div>
                  )}
                  <div
                    className="max-w-[78%] px-4 py-3 text-[12.5px] leading-[1.72]"
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: 300,
                      ...(m.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #C9A84C 0%, #d4b565 100%)',
                            color: '#0D0D0D',
                          }
                        : {
                            background: 'rgba(255,255,255,0.045)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            color: 'rgba(255,255,255,0.72)',
                          }
                      ),
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Typing dots */}
              {loading && (
                <div className="flex items-end gap-2.5">
                  <div
                    className="w-6 h-6 flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}
                  >
                    <span style={{ fontFamily: 'var(--font-cormorant)', color: '#C9A84C', fontSize: '0.78rem' }}>I</span>
                  </div>
                  <div
                    className="px-4 py-3.5 flex items-center gap-1.5"
                    style={{ background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {[0, 160, 320].map(d => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: 'rgba(201,168,76,0.5)', animationDelay: `${d}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick replies — shown only on first message */}
              {showQuick && !loading && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="pt-1 space-y-2.5"
                >
                  <p style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(255,255,255,0.18)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                    Quick questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_REPLIES.map((q, i) => (
                      <motion.button
                        key={q}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        onClick={() => send(q)}
                        className="px-3 py-1.5 text-[10.5px] transition-all"
                        style={{
                          fontFamily: 'var(--font-montserrat)',
                          fontWeight: 400,
                          color: 'rgba(201,168,76,0.7)',
                          border: '1px solid rgba(201,168,76,0.22)',
                          letterSpacing: '0.04em',
                          background: 'rgba(201,168,76,0.03)',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(201,168,76,0.09)'
                          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'
                          e.currentTarget.style.color = 'rgba(201,168,76,0.95)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(201,168,76,0.03)'
                          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.22)'
                          e.currentTarget.style.color = 'rgba(201,168,76,0.7)'
                        }}
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div className="flex-shrink-0 px-4 pb-4 pt-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div
                className="flex items-center gap-2"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '7px 7px 7px 14px' }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                  placeholder="Ask about our properties…"
                  className="flex-1 bg-transparent focus:outline-none"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 300,
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.75)',
                  }}
                />
                <motion.button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0 disabled:opacity-30 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #d4b565 100%)' }}
                >
                  {loading
                    ? <Loader2 size={12} className="animate-spin text-[#0D0D0D]" />
                    : <Send size={12} className="text-[#0D0D0D]" style={{ transform: 'translateX(1px)' }} />
                  }
                </motion.button>
              </div>
              <p
                className="text-center mt-2"
                style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(255,255,255,0.1)', fontSize: '0.53rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                The Ivy Group · AI Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button ── */}
      <div className="fixed bottom-6 left-4 z-50">
        {/* Pulse rings when closed */}
        {!open && (
          <>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ border: '1px solid rgba(201,168,76,0.28)' }}
              animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ border: '1px solid rgba(201,168,76,0.15)' }}
              animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            />
          </>
        )}

        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(145deg, #111 0%, #080808 100%)',
            border: '1px solid rgba(201,168,76,0.38)',
            boxShadow: '0 10px 36px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03) inset',
          }}
          aria-label="Chat with Ivy"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open
              ? <motion.div key="close" initial={{ opacity: 0, rotate: -80 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />
                </motion.div>
              : <motion.div key="ivy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col items-center gap-0.5">
                  <span style={{ fontFamily: 'var(--font-cormorant)', color: '#C9A84C', fontSize: '1.45rem', fontWeight: 300, lineHeight: 1 }}>I</span>
                  <span style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(201,168,76,0.5)', fontSize: '0.42rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>CHAT</span>
                </motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
