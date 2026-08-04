'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2, ChevronDown, Download, PhoneCall, Sun, Moon } from 'lucide-react'

type MessageAction = { type: 'download'; url: string; label: string }
type Message = { role: 'user' | 'model'; text: string; action?: MessageAction }
type LeadFlow = { type: 'callback' | 'brochure'; step: 'name' | 'phone'; name?: string }

const GREETING = "Welcome to The Ivy Group. I'm Ivy, your personal property consultant. How may I assist you today?"

const QUICK_REPLIES = [
  'Tell me about Ivy Myst',
  'What are current prices?',
  'How does buying work?',
  'Book a site visit',
]

const BROCHURES: Record<string, { url: string; label: string }> = {
  'Ivy Park':    { url: '/IVY PARK RESIDENCE Assests/IvyPark BROCHURE.pdf',         label: 'Ivy Park Residence Brochure' },
  'Ivy Myst':   { url: '/Ivy Myst Assets/IvyMystBrochure.pdf',                      label: 'Ivy Myst Residence Brochure' },
  'Blossom Ivy':{ url: '/Blossoms Ivy Residence Assets/BlossomsIvy Brochure.pdf',   label: 'Blossom Ivy Residence Brochure' },
  'Luckinn Ivy':{ url: '/Luckinn Ivy Assets/Luckinn Brochure.pdf',                  label: 'Luckinn Ivy Residence Brochure' },
}

const CHIP_TRIGGERS = [
  'ivy park', 'ivy myst', 'blossom', 'luckinn', 'kilimani', 'kileleshwa', 'westlands',
  'price', 'how much', 'cost', 'ksh', 'available', 'buy', 'purchase', 'payment',
  'amenit', 'pool', 'gym', 'rooftop', 'completion', 'mortgage', 'invest',
]

// ── Theme tokens ─────────────────────────────────────────────────────────────
const THEMES = {
  light: {
    panel:           'linear-gradient(170deg, #FAFAF8 0%, #F5F2EE 100%)',
    panelBorder:     'rgba(201,168,76,0.28)',
    panelShadow:     '0 24px 72px rgba(0,0,0,0.13), 0 0 0 1px rgba(201,168,76,0.06)',
    topRule:         'linear-gradient(90deg, transparent, #C9A84C 35%, #d4b565 65%, transparent)',
    headerBg:        '#FFFFFF',
    headerBorder:    'rgba(0,0,0,0.07)',
    avatarBg:        'rgba(201,168,76,0.07)',
    avatarBorder:    'rgba(201,168,76,0.25)',
    onlineDot:       '#22c55e',
    onlineDotBorder: '#FFFFFF',
    nameColor:       '#1a1a1a',
    subtitleColor:   'rgba(201,168,76,0.75)',
    closeColor:      'rgba(0,0,0,0.25)',
    closeHover:      'rgba(0,0,0,0.65)',
    toggleColor:     'rgba(0,0,0,0.3)',
    toggleHover:     'rgba(0,0,0,0.65)',
    botBg:           '#FFFFFF',
    botBorder:       'rgba(0,0,0,0.08)',
    botText:         '#2a2a2a',
    botShadow:       '0 1px 4px rgba(0,0,0,0.05)',
    typingBg:        '#FFFFFF',
    typingBorder:    'rgba(0,0,0,0.08)',
    typingDot:       '#C9A84C',
    inputFooterBg:   '#FFFFFF',
    inputFooterBorder:'rgba(0,0,0,0.07)',
    inputAreaBg:     '#F5F2EE',
    inputAreaBorder: 'rgba(0,0,0,0.1)',
    inputText:       '#1a1a1a',
    inputPlaceholder:'placeholder:text-black/30',
    quickLabel:      'rgba(0,0,0,0.25)',
    footerText:      'rgba(0,0,0,0.2)',
  },
  dark: {
    panel:           'linear-gradient(170deg, #0c0c0c 0%, #070707 100%)',
    panelBorder:     'rgba(201,168,76,0.2)',
    panelShadow:     '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.025) inset',
    topRule:         'linear-gradient(90deg, transparent, #C9A84C 40%, #d4b565 60%, transparent)',
    headerBg:        'transparent',
    headerBorder:    'rgba(255,255,255,0.05)',
    avatarBg:        'rgba(201,168,76,0.07)',
    avatarBorder:    'rgba(201,168,76,0.2)',
    onlineDot:       '#34d399',
    onlineDotBorder: '#070707',
    nameColor:       'rgba(255,255,255,0.9)',
    subtitleColor:   'rgba(201,168,76,0.6)',
    closeColor:      'rgba(255,255,255,0.2)',
    closeHover:      'rgba(255,255,255,0.65)',
    toggleColor:     'rgba(255,255,255,0.25)',
    toggleHover:     'rgba(255,255,255,0.7)',
    botBg:           'rgba(255,255,255,0.045)',
    botBorder:       'rgba(255,255,255,0.07)',
    botText:         'rgba(255,255,255,0.72)',
    botShadow:       'none',
    typingBg:        'rgba(255,255,255,0.045)',
    typingBorder:    'rgba(255,255,255,0.07)',
    typingDot:       'rgba(201,168,76,0.7)',
    inputFooterBg:   'transparent',
    inputFooterBorder:'rgba(255,255,255,0.05)',
    inputAreaBg:     'rgba(255,255,255,0.04)',
    inputAreaBorder: 'rgba(255,255,255,0.08)',
    inputText:       'rgba(255,255,255,0.75)',
    inputPlaceholder:'placeholder:text-white/30',
    quickLabel:      'rgba(255,255,255,0.18)',
    footerText:      'rgba(255,255,255,0.1)',
  },
} as const

// ── Logo mark SVG ─────────────────────────────────────────────────────────────
function IvyMark({ size = 22, color = '#C9A84C' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 44 54" fill="none" width={size} height={size}>
      <line x1="22" y1="11" x2="22" y2="51" stroke={color} strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M22 13 C23 7 26 4 28 3"   stroke={color} strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M22 17 C27 11 33 10 36 11" stroke={color} strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M22 21 C30 18 37 21 40 26" stroke={color} strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M22 26 C31 28 38 35 38 42" stroke={color} strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M22 31 C30 38 33 46 31 52" stroke={color} strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M22 13 C21 7 18 4 16 3"   stroke={color} strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M22 17 C17 11 11 10 8 11"  stroke={color} strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M22 21 C14 18 7 21 4 26"   stroke={color} strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M22 26 C13 28 6 35 6 42"   stroke={color} strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M22 31 C14 38 11 46 13 52" stroke={color} strokeWidth="3.2" strokeLinecap="round"/>
    </svg>
  )
}

// ── Knowledge base ────────────────────────────────────────────────────────────
function detectProperty(text: string): string | null {
  const q = text.toLowerCase()
  if (q.includes('ivy park') || q.includes('kilimani') || q.includes('kirichwa')) return 'Ivy Park'
  if (q.includes('ivy myst') || q.includes('kileleshwa') || q.includes('gatundu')) return 'Ivy Myst'
  if (q.includes('blossom')) return 'Blossom Ivy'
  if (q.includes('luckinn') || (q.includes('westlands') && !q.includes('near'))) return 'Luckinn Ivy'
  return null
}

const KB: { keys: string[]; reply: string }[] = [
  { keys: ['ivy park', 'kilimani', 'kirichwa'], reply: 'Ivy Park Residence is on Kirichwa Road, Kilimani — 3 towers, 22 floors, 660 apartments. Prices start at KSh 6.82M (1BR), KSh 10.78M (2BR), and KSh 15.62M (3BR+DSQ). Completion is December 2028, with structural works already on the 4th floor. Amenities include a heated pool, rooftop garden, gym, yoga studio, co-working spaces, and 24-hour security.' },
  { keys: ['ivy myst', 'kileleshwa', 'gatundu'], reply: 'Ivy Myst Residence is on Gatundu Road, Kileleshwa — 22 floors, 448 apartments. Prices start at KSh 8.8M (1BR), KSh 14.2M (2BR), and KSh 19.8M (3BR+DSQ). Completion: August 2029. Features a rooftop pool, restaurant, bar, fireplace, sauna, massage room, yoga studio, and heated indoor pool.' },
  { keys: ['blossom', 'blossom ivy'], reply: 'Blossom Ivy Residence is on Gatundu Road, Kileleshwa — 2 towers, 22 floors, 220 apartments. Only 3BR+DSQ units (180–236 sqm) remain from KSh 18.5M. 1BR, 2BR, and 4BR units are sold out. Completion: December 2026.' },
  { keys: ['luckinn', 'luckinn ivy', 'westlands'], reply: 'Luckinn Ivy Residence is in Westlands — 1 tower, 20 floors, 120 apartments. Only 3BR+DSQ units (170–172 sqm) are still available; contact our team for pricing. 1BR and 2BR units are sold out. Completion: December 2026.' },
  { keys: ['price', 'prices', 'cost', 'how much', 'pricing', 'ksh', 'million'], reply: 'Here is a summary of our current starting prices:\n\n• Ivy Park (Kilimani) — 1BR from KSh 6.82M · 2BR from KSh 10.78M · 3BR+DSQ from KSh 15.62M\n• Ivy Myst (Kileleshwa) — 1BR from KSh 8.8M · 2BR from KSh 14.2M · 3BR+DSQ from KSh 19.8M\n• Blossom Ivy (Kileleshwa) — 3BR+DSQ from KSh 18.5M (only remaining)\n• Luckinn Ivy (Westlands) — 3BR+DSQ available, contact us for pricing\n\nWould you like details on a specific project?' },
  { keys: ['payment', 'installment', 'instalment', 'deposit', 'plan', 'pay'], reply: 'We offer three flexible payment options:\n\n1. Installment Plan — 20% deposit, balance spread over the construction period.\n\n2. Cash Purchase — full balance within 30 days, with a discounted price.\n\n3. Mortgage — 20% deposit, remaining balance financed by a bank at project completion.' },
  { keys: ['mortgage', 'bank', 'loan', 'finance', 'financing'], reply: 'Yes, mortgage financing is available through our approved banking partners. You pay a 20% deposit upfront, and the remaining balance is financed by a bank upon project completion. Shall I arrange for someone to call you?' },
  { keys: ['buy', 'buying', 'purchase', 'how does', 'process', 'steps', 'how do i'], reply: 'The buying process:\n\n1. Select your preferred apartment\n2. Confirm availability with our team\n3. Reserve the unit\n4. Pay the required deposit\n5. Sign the Sale Agreement\n6. Continue payments per your chosen plan\n7. Receive regular construction updates\n8. Complete final payment\n9. Handover and possession\n10. Registration and ownership documents' },
  { keys: ['site visit', 'visit', 'view', 'see', 'show', 'tour', 'book', 'appointment', 'schedule'], reply: 'We would love to arrange a site visit for you! Visits are available by appointment throughout the week. Share your details and our team will confirm your preferred date and time. We also offer virtual presentations via video call for diaspora clients.' },
  { keys: ['diaspora', 'abroad', 'outside kenya', 'uk', 'usa', 'canada', 'australia', 'overseas', 'remote'], reply: 'Absolutely — we actively assist diaspora clients. The process is fully remote: virtual presentations, video walkthroughs, electronic documentation, and secure international payment options. Many buyers complete the purchase entirely from abroad.' },
  { keys: ['amenit', 'gym', 'pool', 'swimming', 'rooftop', 'parking', 'security', 'children', 'cowork', 'yoga', 'sauna', 'massage', 'garden', 'lounge', 'restaurant', 'bar'], reply: 'All Ivy Group developments feature premium lifestyle amenities:\n\n• Heated swimming pools (rooftop + indoor)\n• Fully equipped gyms and yoga studios\n• Co-working spaces and coffee bars\n• Children\'s play areas\n• 24-hour security, CCTV, smart access control\n• Backup generators and borehole water supply\n• Ivy Myst also has a rooftop restaurant, bar, sauna, and massage room' },
  { keys: ['available', 'availability', 'units', 'left', 'remaining', 'stock', 'sold out'], reply: 'Current availability:\n\n• Ivy Park (Dec 2028) — 1BR, 2BR & 3BR+DSQ all available\n• Ivy Myst (Aug 2029) — 1BR, 2BR & 3BR+DSQ all available\n• Blossom Ivy (Dec 2026) — only 3BR+DSQ remaining\n• Luckinn Ivy (Dec 2026) — only 3BR+DSQ remaining\n\nAvailability changes regularly — contact our team for the latest.' },
  { keys: ['completion', 'ready', 'when', 'handover', 'finish', 'complete', 'date'], reply: 'Estimated completion dates:\n\n• Luckinn Ivy (Westlands) — December 2026\n• Blossom Ivy (Kileleshwa) — December 2026\n• Ivy Park (Kilimani) — December 2028\n• Ivy Myst (Kileleshwa) — August 2029' },
  { keys: ['service charge', 'maintenance', 'monthly', 'fee', 'charges'], reply: 'Yes, service charges apply in all our developments, covering maintenance of common areas, security, cleaning, lifts, landscaping, and shared amenities. Rates are communicated before handover.' },
  { keys: ['airbnb', 'short term', 'rent out', 'rental', 'invest', 'investment', 'returns', 'yield'], reply: 'All Ivy Group apartments are excellent for rental investment. Our Kileleshwa and Kilimani locations see strong demand from expatriates and professionals. Shall I connect you with a consultant for investment projections?' },
  { keys: ['pet', 'dog', 'cat', 'animal'], reply: 'Pet policies are governed by each development\'s management rules. Please consult our sales team for specific guidance on your chosen development.' },
  { keys: ['contact', 'phone', 'call', 'whatsapp', 'email', 'reach', 'number', 'speak', 'talk'], reply: 'You can reach The Ivy Group on:\n\n📞 Phone / WhatsApp: +254 118 266 666\n🌐 Website: www.ivygroup.ke\n\nOur consultants assist with unit availability, pricing, payment plans, site visits, and mortgage guidance.' },
  { keys: ['about', 'ivy group', 'who are you', 'developer', 'company', 'background'], reply: 'The Ivy Group Kenya is a premium real estate developer delivering modern luxury residential developments in Nairobi\'s most sought-after neighbourhoods — Ivy Park (Kilimani), Ivy Myst (Kileleshwa), Blossom Ivy (Kileleshwa), and Luckinn Ivy (Westlands). We guide clients throughout their entire journey, from first enquiry to title ownership.' },
  { keys: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'], reply: 'Hello! Welcome to The Ivy Group. I\'m Ivy, your personal property consultant. How can I assist you today? Feel free to ask about our developments, prices, payment plans, or to book a site visit.' },
  { keys: ['thank', 'thanks', 'appreciate', 'helpful'], reply: 'You\'re most welcome! It\'s a pleasure assisting you. Feel free to reach out any time on +254 118 266 666 or WhatsApp. Have a wonderful day!' },
]

const FALLBACK = "Thank you for your enquiry. For the most accurate information, I'd recommend speaking directly with our sales team — available on +254 118 266 666 (call or WhatsApp)."

function getReply(text: string): string {
  const q = text.toLowerCase()
  for (const entry of KB) {
    if (entry.keys.some(k => q.includes(k))) return entry.reply
  }
  return FALLBACK
}
// ─────────────────────────────────────────────────────────────────────────────

async function submitLead(payload: {
  name: string; phone: string; type: 'callback' | 'brochure'; property: string | null
}) {
  try {
    await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: `chat-${payload.type}`,
        name: payload.name,
        phone: payload.phone,
        property_interest: payload.property ?? 'General Enquiry',
      }),
    })
  } catch { /* fire-and-forget */ }
}

export default function ChatWidget() {
  const [open, setOpen]             = useState(false)
  const [dark, setDark]             = useState(false)   // light by default
  const [messages, setMessages]     = useState<Message[]>([{ role: 'model', text: GREETING }])
  const [input, setInput]           = useState('')
  const [loading, setLoading]       = useState(false)
  const [showQuick, setShowQuick]   = useState(true)
  const [showActionChips, setShowActionChips] = useState(false)
  const [leadFlow, setLeadFlow]     = useState<LeadFlow | null>(null)
  const [currentProperty, setCurrentProperty] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem('ivy-chat-theme')
    if (saved === 'dark') setDark(true)
  }, [])

  const toggleTheme = () => setDark(d => {
    const next = !d
    localStorage.setItem('ivy-chat-theme', next ? 'dark' : 'light')
    return next
  })

  const t = dark ? THEMES.dark : THEMES.light

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350)
  }, [open])

  const startLeadFlow = useCallback(async (type: 'callback' | 'brochure') => {
    setShowActionChips(false)
    setShowQuick(false)
    setLeadFlow({ type, step: 'name' })
    setLoading(true)
    await new Promise(r => setTimeout(r, 650))
    setMessages(prev => [...prev, {
      role: 'model',
      text: type === 'callback'
        ? "I'd love to have our sales team reach out to you. May I have your full name?"
        : "I'll get that brochure ready for you! May I have your full name first?",
    }])
    setLoading(false)
  }, [])

  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')
    setShowQuick(false)
    setShowActionChips(false)
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setLoading(true)
    await new Promise(r => setTimeout(r, 700 + Math.random() * 350))

    if (leadFlow) {
      if (leadFlow.step === 'name') {
        setLeadFlow({ ...leadFlow, step: 'phone', name: msg })
        setMessages(prev => [...prev, { role: 'model', text: `Thank you, ${msg}! And the best phone number to reach you on?` }])
      } else if (leadFlow.step === 'phone') {
        await submitLead({ name: leadFlow.name!, phone: msg, type: leadFlow.type, property: currentProperty })
        if (leadFlow.type === 'callback') {
          setMessages(prev => [...prev, { role: 'model', text: `Perfect, ${leadFlow.name}! Our team will call you on ${msg} during business hours. Is there anything else I can help with?` }])
        } else {
          const brochure = currentProperty ? BROCHURES[currentProperty] : null
          setMessages(prev => [...prev, brochure
            ? { role: 'model', text: `Thank you, ${leadFlow.name}! Your brochure is ready. Our team will also follow up on ${msg}.`, action: { type: 'download', url: brochure.url, label: brochure.label } }
            : { role: 'model', text: `Thank you, ${leadFlow.name}! Our team will send you the brochures and call you on ${msg} shortly.` }
          ])
        }
        setLeadFlow(null)
      }
      setLoading(false)
      return
    }

    if (/call( me)? back|callback|contact me|follow.?up|be called/i.test(msg)) {
      setLeadFlow({ type: 'callback', step: 'name' })
      setMessages(prev => [...prev, { role: 'model', text: "I'd love to have our team reach out to you! May I have your full name?" }])
      setLoading(false)
      return
    }
    if (/\bbrochure\b|download/i.test(msg)) {
      setLeadFlow({ type: 'brochure', step: 'name' })
      setMessages(prev => [...prev, { role: 'model', text: "I'll get that brochure ready for you! May I have your full name first?" }])
      setLoading(false)
      return
    }

    const reply = getReply(msg)
    const prop = detectProperty(msg)
    if (prop) setCurrentProperty(prop)
    setShowActionChips(CHIP_TRIGGERS.some(k => msg.toLowerCase().includes(k)))
    setMessages(prev => [...prev, { role: 'model', text: reply }])
    setLoading(false)
  }, [input, loading, leadFlow, currentProperty])

  const chipStyle: React.CSSProperties = {
    fontFamily: 'var(--font-montserrat)',
    fontWeight: 400,
    fontSize: '10px',
    letterSpacing: '0.05em',
    border: '1px solid rgba(201,168,76,0.28)',
    background: 'rgba(201,168,76,0.05)',
    color: 'rgba(201,168,76,0.8)',
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
  }
  const onChipEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background   = 'rgba(201,168,76,0.12)'
    e.currentTarget.style.borderColor  = 'rgba(201,168,76,0.55)'
    e.currentTarget.style.color        = '#C9A84C'
  }
  const onChipLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background   = 'rgba(201,168,76,0.05)'
    e.currentTarget.style.borderColor  = 'rgba(201,168,76,0.28)'
    e.currentTarget.style.color        = 'rgba(201,168,76,0.8)'
  }

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
              background: t.panel,
              border: `1px solid ${t.panelBorder}`,
              boxShadow: t.panelShadow,
              transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {/* Gold top rule */}
            <div style={{ height: 2, background: t.topRule, flexShrink: 0 }} />

            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3 flex-shrink-0"
              style={{ background: t.headerBg, borderBottom: `1px solid ${t.headerBorder}`, transition: 'background 0.3s ease' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ background: t.avatarBg, border: `1px solid ${t.avatarBorder}` }}
                  >
                    <IvyMark size={22} color="#C9A84C" />
                  </div>
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                    style={{ background: t.onlineDot, border: `2px solid ${t.onlineDotBorder}` }}
                  />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-cormorant)', color: t.nameColor, fontSize: '1.1rem', fontWeight: 500, letterSpacing: '0.04em', lineHeight: 1.1, transition: 'color 0.3s ease' }}>
                    Ivy
                  </p>
                  <p style={{ fontFamily: 'var(--font-montserrat)', color: t.subtitleColor, fontSize: '0.57rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 2 }}>
                    Property Consultant · Online
                  </p>
                </div>
              </div>

              {/* Right controls: theme toggle + close */}
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleTheme}
                  className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
                  title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                  style={{ color: t.toggleColor }}
                  onMouseEnter={e => (e.currentTarget.style.color = t.toggleHover)}
                  onMouseLeave={e => (e.currentTarget.style.color = t.toggleColor)}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {dark
                      ? <motion.span key="sun"  initial={{ opacity: 0, rotate: -40 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 40 }} transition={{ duration: 0.2 }}>
                          <Sun size={14} />
                        </motion.span>
                      : <motion.span key="moon" initial={{ opacity: 0, rotate: 40 }}  animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -40 }} transition={{ duration: 0.2 }}>
                          <Moon size={14} />
                        </motion.span>
                    }
                  </AnimatePresence>
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 flex items-center justify-center transition-colors"
                  style={{ color: t.closeColor }}
                  onMouseEnter={e => (e.currentTarget.style.color = t.closeHover)}
                  onMouseLeave={e => (e.currentTarget.style.color = t.closeColor)}
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4" style={{ scrollbarWidth: 'none' }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex items-end gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'model' && (
                    <div
                      className="w-7 h-7 flex-shrink-0 flex items-center justify-center mb-0.5"
                      style={{ background: t.avatarBg, border: `1px solid ${t.avatarBorder}`, flexShrink: 0 }}
                    >
                      <IvyMark size={15} color="#C9A84C" />
                    </div>
                  )}
                  <div className="max-w-[78%] flex flex-col gap-2">
                    <div
                      className="px-4 py-3 text-[12.5px] leading-[1.72] whitespace-pre-line"
                      style={{
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 300,
                        transition: 'background 0.3s ease, color 0.3s ease',
                        ...(m.role === 'user'
                          ? { background: 'linear-gradient(135deg, #C9A84C 0%, #d4b565 100%)', color: '#0D0D0D' }
                          : { background: t.botBg, border: `1px solid ${t.botBorder}`, color: t.botText, boxShadow: t.botShadow }
                        ),
                      }}
                    >
                      {m.text}
                    </div>
                    {m.action?.type === 'download' && (
                      <a
                        href={m.action.url}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 text-[11px] transition-opacity hover:opacity-85"
                        style={{
                          fontFamily: 'var(--font-montserrat)',
                          fontWeight: 500,
                          letterSpacing: '0.06em',
                          background: 'linear-gradient(135deg, #C9A84C 0%, #d4b565 100%)',
                          color: '#0D0D0D',
                        }}
                      >
                        <Download size={11} /> {m.action.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing dots */}
              {loading && (
                <div className="flex items-end gap-2.5">
                  <div
                    className="w-7 h-7 flex-shrink-0 flex items-center justify-center"
                    style={{ background: t.avatarBg, border: `1px solid ${t.avatarBorder}` }}
                  >
                    <IvyMark size={15} color="#C9A84C" />
                  </div>
                  <div
                    className="px-4 py-3.5 flex items-center gap-1.5"
                    style={{ background: t.typingBg, border: `1px solid ${t.typingBorder}`, boxShadow: t.botShadow }}
                  >
                    {[0, 160, 320].map(d => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: t.typingDot, animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Action chips */}
              {showActionChips && !loading && !leadFlow && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
                  className="flex gap-2 pl-9"
                >
                  <button style={chipStyle} onClick={() => startLeadFlow('callback')} onMouseEnter={onChipEnter} onMouseLeave={onChipLeave}>
                    <PhoneCall size={10} /> Request callback
                  </button>
                  <button style={chipStyle} onClick={() => startLeadFlow('brochure')} onMouseEnter={onChipEnter} onMouseLeave={onChipLeave}>
                    <Download size={10} /> Download brochure
                  </button>
                </motion.div>
              )}

              {/* Initial quick replies */}
              {showQuick && !loading && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }}
                  className="pt-1 space-y-2.5"
                >
                  <p style={{ fontFamily: 'var(--font-montserrat)', color: t.quickLabel, fontSize: '0.57rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                    Quick questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_REPLIES.map((q, i) => (
                      <motion.button
                        key={q}
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
                        onClick={() => { if (q === 'Book a site visit') { startLeadFlow('callback'); setShowQuick(false) } else send(q) }}
                        className="px-3 py-1.5 text-[10.5px] transition-all"
                        style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400, color: 'rgba(201,168,76,0.8)', border: '1px solid rgba(201,168,76,0.28)', letterSpacing: '0.04em', background: 'rgba(201,168,76,0.04)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.color = '#C9A84C' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.04)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.28)'; e.currentTarget.style.color = 'rgba(201,168,76,0.8)' }}
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
            <div
              className="flex-shrink-0 px-4 pb-4 pt-3"
              style={{ background: t.inputFooterBg, borderTop: `1px solid ${t.inputFooterBorder}`, transition: 'background 0.3s ease' }}
            >
              <div
                className="flex items-center gap-2"
                style={{ background: t.inputAreaBg, border: `1px solid ${t.inputAreaBorder}`, padding: '7px 7px 7px 14px', transition: 'background 0.3s ease' }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                  placeholder={
                    leadFlow?.step === 'name'  ? 'Enter your full name…' :
                    leadFlow?.step === 'phone' ? 'Enter your phone number…' :
                    'Ask about our properties…'
                  }
                  className={`flex-1 bg-transparent focus:outline-none ${t.inputPlaceholder}`}
                  style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300, fontSize: '12px', color: t.inputText, transition: 'color 0.3s ease' }}
                />
                <motion.button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.93 }}
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0 disabled:opacity-30 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #d4b565 100%)' }}
                >
                  {loading
                    ? <Loader2 size={12} className="animate-spin text-[#0D0D0D]" />
                    : <Send size={12} className="text-[#0D0D0D]" style={{ transform: 'translateX(1px)' }} />
                  }
                </motion.button>
              </div>
              <p className="text-center mt-2" style={{ fontFamily: 'var(--font-montserrat)', color: t.footerText, fontSize: '0.53rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                The Ivy Group · Property Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button ── */}
      <div className="fixed bottom-28 right-7 z-50">
        <AnimatePresence>
          {!open && (
            <motion.div key="rings" className="absolute inset-0 rounded-full pointer-events-none" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              <motion.span className="absolute inset-0 rounded-full" style={{ background: 'rgba(201,168,76,0.25)' }}
                animate={{ scale: [1, 1.9], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.9 }} />
              <motion.span className="absolute inset-0 rounded-full" style={{ background: 'rgba(201,168,76,0.15)' }}
                animate={{ scale: [1, 2.4], opacity: [0.4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.55, repeatDelay: 0.9 }} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.93 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
          style={{ background: 'linear-gradient(145deg, #141414 0%, #0a0a0a 100%)', border: '1px solid rgba(201,168,76,0.4)', boxShadow: '0 8px 32px rgba(0,0,0,0.55), 0 0 20px rgba(201,168,76,0.08)' }}
          aria-label="Chat with Ivy"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open
              ? <motion.div key="close" initial={{ opacity: 0, rotate: -80 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={17} style={{ color: 'rgba(255,255,255,0.55)' }} />
                </motion.div>
              : <motion.div key="logo" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <IvyMark size={28} color="#C9A84C" />
                </motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
