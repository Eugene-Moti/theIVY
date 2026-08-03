'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'

type Message = { role: 'user' | 'model'; text: string }

const GREETING = "Hello! I'm Ivy, your personal guide to The Ivy Group's properties in Nairobi. Ask me anything about our residences, pricing, or buying process."

export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'model', text: GREETING }])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const updated: Message[] = [...messages, { role: 'user', text }]
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
      setMessages(m => [...m, { role: 'model', text: "I'm having trouble connecting right now. Please try again or call us on +254 118 266 666." }])
    }
    setLoading(false)
  }, [input, loading, messages])

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 left-4 z-50 w-[336px] flex flex-col bg-[#0D0D0D] border border-white/10 shadow-2xl"
            style={{ height: 500, maxHeight: 'calc(100dvh - 112px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0 bg-[#0D0D0D]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#C9A84C]/10 border border-[#C9A84C]/25 flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-[#C9A84C] text-sm font-light">I</span>
                </div>
                <div>
                  <p className="text-white text-[12px] font-medium leading-tight">Ivy</p>
                  <p className="text-white/30 text-[9px] tracking-[0.18em] uppercase leading-tight">The Ivy Group · AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/25 hover:text-white/70 transition-colors p-1"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 text-[12px] font-sans font-light leading-[1.65] ${
                      m.role === 'user'
                        ? 'bg-[#C9A84C] text-[#0D0D0D]'
                        : 'bg-white/6 text-white/75 border border-white/8'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/6 border border-white/8 px-4 py-3 flex items-center gap-1.5">
                    {[0, 150, 300].map(delay => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-white/8 flex-shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                placeholder="Ask about our properties…"
                className="flex-1 bg-white/5 border border-white/10 text-white text-[12px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40 placeholder:text-white/20 transition-colors"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="w-9 h-9 bg-[#C9A84C] flex items-center justify-center text-[#0D0D0D] hover:bg-[#d4b565] transition-colors disabled:opacity-35 flex-shrink-0"
              >
                {loading
                  ? <Loader2 size={13} className="animate-spin" />
                  : <Send size={13} />
                }
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 left-4 z-50 w-14 h-14 bg-[#0D0D0D] border border-white/12 flex items-center justify-center shadow-xl hover:border-[#C9A84C]/40 transition-colors"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open
            ? <motion.div key="x"    initial={{ opacity: 0, rotate: -80 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 80  }} transition={{ duration: 0.18 }}>
                <X size={17} className="text-white/50" />
              </motion.div>
            : <motion.div key="chat" initial={{ opacity: 0, rotate:  80 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -80 }} transition={{ duration: 0.18 }}>
                <MessageCircle size={18} className="text-[#C9A84C]" />
              </motion.div>
          }
        </AnimatePresence>
      </motion.button>
    </>
  )
}
