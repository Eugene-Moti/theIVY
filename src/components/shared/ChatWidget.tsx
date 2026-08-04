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

// ── Knowledge base ─────────────────────────────────────────────────────────
// Each entry: { keys: string[], reply: string }
// First match wins — put more specific entries first.
const KB: { keys: string[]; reply: string }[] = [
  {
    keys: ['ivy park', 'kilimani', 'kirichwa', 'ivy park residence'],
    reply:
      'Ivy Park Residence is on Kirichwa Road, Kilimani — 3 towers, 22 floors, 660 apartments. Prices start at KSh 6.82M (1BR), KSh 10.78M (2BR), and KSh 15.62M (3BR+DSQ). Completion is December 2028 with structural works already on the 4th floor. Amenities include a heated pool, rooftop garden, gym, yoga studio, co-working spaces, and 24-hour security.',
  },
  {
    keys: ['ivy myst', 'kileleshwa', 'gatundu', 'ivy myst residence'],
    reply:
      'Ivy Myst Residence is on Gatundu Road, Kileleshwa — 22 floors, 448 apartments. Prices start at KSh 8.8M (1BR), KSh 14.2M (2BR), and KSh 19.8M (3BR+DSQ). Completion: August 2029. The building features a rooftop pool, restaurant, bar, fireplace, sauna, massage room, yoga studio, and a heated indoor pool on the first floor.',
  },
  {
    keys: ['blossom', 'blossom ivy'],
    reply:
      'Blossom Ivy Residence is on Gatundu Road, Kileleshwa — 2 towers, 22 floors, 220 apartments. Only 3BR+DSQ units (180–236 sqm) remain from KSh 18.5M. 1BR, 2BR, and 4BR units are sold out. Completion is December 2026. Amenities include a heated indoor pool, gym, yoga studio, dual backup generators, and smart door locks.',
  },
  {
    keys: ['luckinn', 'luckinn ivy', 'westlands'],
    reply:
      'Luckinn Ivy Residence is in Westlands — 1 tower, 20 floors, 120 apartments. Only 3BR+DSQ units (170–172 sqm) are still available; contact our team for pricing. 1BR and 2BR units are sold out. Completion: December 2026. Amenities include a heated indoor pool, gym, yoga room, co-working space, and 24-hour security.',
  },
  {
    keys: ['price', 'prices', 'cost', 'how much', 'pricing', 'ksh', 'million'],
    reply:
      'Here is a summary of our current starting prices:\n\n• Ivy Park (Kilimani) — 1BR from KSh 6.82M · 2BR from KSh 10.78M · 3BR+DSQ from KSh 15.62M\n• Ivy Myst (Kileleshwa) — 1BR from KSh 8.8M · 2BR from KSh 14.2M · 3BR+DSQ from KSh 19.8M\n• Blossom Ivy (Kileleshwa) — 3BR+DSQ from KSh 18.5M (only remaining)\n• Luckinn Ivy (Westlands) — 3BR+DSQ available, contact us for pricing\n\nAll prices are subject to availability. Would you like details on a specific project?',
  },
  {
    keys: ['payment', 'installment', 'instalment', 'deposit', 'plan', 'pay'],
    reply:
      'We offer three flexible payment options:\n\n1. Installment Plan — 20% deposit, balance spread over the construction period. Great for investors and salaried professionals.\n\n2. Cash Purchase — full balance within 30 days, with a discounted price. Best for maximum savings.\n\n3. Mortgage — 20% deposit, remaining balance financed by a bank at project completion. Ideal for first-time homeowners.\n\nWould you like to discuss which plan suits you best?',
  },
  {
    keys: ['mortgage', 'bank', 'loan', 'finance', 'financing'],
    reply:
      'Yes, mortgage financing is available through our approved banking partners. You pay a 20% deposit upfront, and the remaining balance is financed by a bank upon project completion. Our sales team can introduce you to our partner banks. Would you like us to reach out to you?',
  },
  {
    keys: ['buy', 'buying', 'purchase', 'how does', 'process', 'steps', 'how do i'],
    reply:
      'The buying process is straightforward:\n\n1. Select your preferred apartment\n2. Confirm availability with our team\n3. Reserve the unit\n4. Pay the required deposit\n5. Sign the Sale Agreement\n6. Continue payments per your chosen plan\n7. Receive regular construction updates\n8. Complete final payment\n9. Handover and possession\n10. Registration and ownership documents issued\n\nOur team guides you every step of the way. Shall I connect you with a consultant?',
  },
  {
    keys: ['site visit', 'visit', 'view', 'see', 'show', 'tour', 'book', 'appointment', 'schedule'],
    reply:
      'We would love to arrange a site visit for you! Visits are available by appointment throughout the week. To book, please call or WhatsApp us on +254 118 266 666 and our team will confirm your preferred date and time. If you are based abroad, we also offer virtual presentations via video call.',
  },
  {
    keys: ['diaspora', 'abroad', 'outside kenya', 'uk', 'usa', 'canada', 'australia', 'overseas', 'remote'],
    reply:
      'Absolutely — we actively assist diaspora clients. The process is fully remote: virtual property presentations, video call walkthroughs, electronic documentation, and secure international payment options. Many of our buyers complete their purchase entirely from abroad. Contact us on +254 118 266 666 or WhatsApp and we will guide you through every step.',
  },
  {
    keys: ['amenit', 'gym', 'pool', 'swimming', 'rooftop', 'parking', 'security', 'playground', 'children', 'cowork', 'co-work', 'yoga', 'sauna', 'massage', 'garden', 'lounge', 'restaurant', 'bar'],
    reply:
      'All Ivy Group developments feature premium lifestyle amenities. Highlights include:\n\n• Heated swimming pools (indoor on lower floors, rooftop at Ivy Myst)\n• Fully equipped gyms and yoga studios\n• Co-working spaces and coffee bars\n• Children\'s play areas\n• 24-hour security, CCTV, smart access control\n• Backup generators and borehole water supply\n• Ivy Myst also has a rooftop restaurant, bar, sauna, and massage room\n\nWould you like amenity details for a specific development?',
  },
  {
    keys: ['available', 'availability', 'units', 'left', 'remaining', 'stock', 'sold out'],
    reply:
      'Here is the current availability snapshot:\n\n• Ivy Park (Dec 2028) — 1BR, 2BR & 3BR+DSQ all available\n• Ivy Myst (Aug 2029) — 1BR, 2BR & 3BR+DSQ all available\n• Blossom Ivy (Dec 2026) — only 3BR+DSQ units remaining\n• Luckinn Ivy (Dec 2026) — only 3BR+DSQ units remaining\n\nAvailability changes regularly. For the latest unit selection, please contact our sales team on +254 118 266 666.',
  },
  {
    keys: ['completion', 'ready', 'when', 'handover', 'finish', 'complete', 'date'],
    reply:
      'Estimated completion dates:\n\n• Luckinn Ivy (Westlands) — December 2026\n• Blossom Ivy (Kileleshwa) — December 2026\n• Ivy Park (Kilimani) — December 2028 (structural works currently on 4th floor)\n• Ivy Myst (Kileleshwa) — August 2029\n\nAll timelines are subject to construction progress. Our team provides buyers with regular construction updates.',
  },
  {
    keys: ['service charge', 'maintenance', 'monthly', 'fee', 'charges'],
    reply:
      'Yes, service charges apply in all our developments. These cover maintenance of common areas, security, cleaning, lifts, landscaping, and shared amenities. The exact rates are communicated to buyers before handover. Our sales team can give you an estimate for your chosen development.',
  },
  {
    keys: ['airbnb', 'short term', 'short-term', 'rent out', 'rental', 'invest', 'investment', 'returns', 'yield'],
    reply:
      'All Ivy Group apartments are excellent for both owner-occupation and rental investment. Short-term rentals like Airbnb may be available subject to each development\'s management policies. Our Kileleshwa and Kilimani locations see strong demand from expatriates and professionals, typically yielding solid rental returns. Speak with our sales team for investment projections.',
  },
  {
    keys: ['pet', 'dog', 'cat', 'animal'],
    reply:
      'Pet policies are governed by each development\'s management rules. Please consult our sales team for specific guidance on your chosen development — they will give you the most accurate and up-to-date information.',
  },
  {
    keys: ['contact', 'phone', 'call', 'whatsapp', 'email', 'reach', 'number', 'speak', 'talk'],
    reply:
      'You can reach The Ivy Group on:\n\n📞 Phone / WhatsApp: +254 118 266 666\n🌐 Website: www.ivygroup.ke\n\nOur consultants assist with unit availability, pricing, payment plans, site visits, mortgage guidance, diaspora purchases, and general investment advice. We are here to help!',
  },
  {
    keys: ['about', 'ivy group', 'who are you', 'developer', 'company', 'background', 'experience', 'track record'],
    reply:
      'The Ivy Group Kenya is a premium real estate developer delivering modern luxury residential developments in Nairobi\'s most sought-after neighbourhoods. We are known for exceptional architecture, premium finishes, strategic locations, and flexible payment plans. Our portfolio includes Ivy Park, Ivy Myst, Blossom Ivy, and Luckinn Ivy — all in prime Nairobi areas. We guide clients throughout their entire journey, from first enquiry to title ownership.',
  },
  {
    keys: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greet'],
    reply:
      'Hello! Welcome to The Ivy Group. I\'m Ivy, your personal property consultant. How can I assist you today? Feel free to ask about our developments, prices, payment plans, or to book a site visit.',
  },
  {
    keys: ['thank', 'thanks', 'appreciate', 'helpful'],
    reply:
      'You\'re most welcome! It\'s a pleasure assisting you. If you have any more questions or would like to speak with one of our consultants, don\'t hesitate to reach out on +254 118 266 666. Have a wonderful day!',
  },
]

const FALLBACK =
  "Thank you for your enquiry. For the most accurate and up-to-date information, I'd recommend speaking directly with our sales team — they're available on +254 118 266 666 (call or WhatsApp) and will be happy to assist you."

function getReply(text: string): string {
  const q = text.toLowerCase()
  for (const entry of KB) {
    if (entry.keys.some(k => q.includes(k))) return entry.reply
  }
  return FALLBACK
}
// ──────────────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [open, setOpen]           = useState(false)
  const [messages, setMessages]   = useState<Message[]>([{ role: 'model', text: GREETING }])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
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
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setLoading(true)
    // Simulate a short typing delay for natural feel
    await new Promise(r => setTimeout(r, 700 + Math.random() * 400))
    const reply = getReply(msg)
    setMessages(prev => [...prev, { role: 'model', text: reply }])
    setLoading(false)
  }, [input, loading])

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
            className="fixed bottom-32 right-7 z-50 flex flex-col"
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
                    className="max-w-[78%] px-4 py-3 text-[12.5px] leading-[1.72] whitespace-pre-line"
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

              {/* Quick replies */}
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
                The Ivy Group · Property Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button — circular, above WhatsApp ── */}
      <div className="fixed bottom-28 right-7 z-50">
        <AnimatePresence>
          {!open && (
            <motion.div
              key="rings"
              className="absolute inset-0 rounded-full pointer-events-none"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(201,168,76,0.25)' }}
                animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.9 }}
              />
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(201,168,76,0.15)' }}
                animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.55, repeatDelay: 0.9 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.93 }}
          className="relative w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #141414 0%, #0a0a0a 100%)',
            border: '1px solid rgba(201,168,76,0.4)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.55), 0 0 20px rgba(201,168,76,0.08)',
          }}
          aria-label="Chat with Ivy"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open
              ? <motion.div key="close" initial={{ opacity: 0, rotate: -80 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={17} style={{ color: 'rgba(255,255,255,0.45)' }} />
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
