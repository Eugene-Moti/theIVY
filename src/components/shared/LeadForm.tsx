'use client'

import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ShieldCheck } from 'lucide-react'

/* ── Options ─────────────────────────────────────────────────────────────── */

export const COUNTRY_CODES = [
  { code: '+254', label: 'Kenya +254' },
  { code: '+256', label: 'Uganda +256' },
  { code: '+255', label: 'Tanzania +255' },
  { code: '+250', label: 'Rwanda +250' },
  { code: '+211', label: 'South Sudan +211' },
  { code: '+251', label: 'Ethiopia +251' },
  { code: '+252', label: 'Somalia +252' },
  { code: '+27', label: 'South Africa +27' },
  { code: '+234', label: 'Nigeria +234' },
  { code: '+233', label: 'Ghana +233' },
  { code: '+44', label: 'United Kingdom +44' },
  { code: '+1', label: 'USA / Canada +1' },
  { code: '+971', label: 'UAE +971' },
  { code: '+974', label: 'Qatar +974' },
  { code: '+966', label: 'Saudi Arabia +966' },
  { code: '+91', label: 'India +91' },
  { code: '+86', label: 'China +86' },
  { code: '+61', label: 'Australia +61' },
  { code: '+49', label: 'Germany +49' },
  { code: '+33', label: 'France +33' },
  { code: '+31', label: 'Netherlands +31' },
  { code: '+41', label: 'Switzerland +41' },
  { code: '+46', label: 'Sweden +46' },
  { code: '+47', label: 'Norway +47' },
  { code: '+353', label: 'Ireland +353' },
  { code: '+64', label: 'New Zealand +64' },
  { code: '+81', label: 'Japan +81' },
  { code: '+65', label: 'Singapore +65' },
]

const INTERESTS = [
  'Blossom Ivy Residence',
  'Luckinn Ivy Residence',
  'Ivy Park Residence',
  'Ivy Myst',
  'Rental enquiry',
  'General — not sure yet',
]
const BUDGETS = [
  'Under KES 10M',
  'KES 10M – 15M',
  'KES 15M – 20M',
  'KES 20M – 30M',
  'Above KES 30M',
  'Prefer not to say',
]
const BUYER_TYPES = [
  'Buying for myself / my family',
  'Buying with a partner (jointly)',
  'Buying as an investment',
  'I am a property agent / broker',
  'Enquiring on behalf of someone else',
]
const TIMELINES = [
  'As soon as possible',
  'Within 1–3 months',
  'Within 3–6 months',
  'Within 6–12 months',
  'Just exploring for now',
]

/* ── Component ───────────────────────────────────────────────────────────── */

type Variant = 'full' | 'standard' | 'compact'

interface Props {
  variant?: Variant
  leadType: string
  /** When set, hides the "interested in" field and tags the lead to this project */
  project?: string
  /** Optional extra note sent with the lead (e.g. which page it came from) */
  source?: string
  dark?: boolean
  submitLabel?: string
  className?: string
  onSuccess?: () => void
}

export default function LeadForm({
  variant = 'full',
  leadType,
  project,
  source,
  dark = false,
  submitLabel = 'Submit enquiry',
  className = '',
  onSuccess,
}: Props) {
  const showBudget = variant !== 'compact'
  const showBuyerType = variant !== 'compact'
  const showTimeline = variant !== 'compact'
  const showInterest = variant === 'full' && !project
  const showMessage = variant === 'full'

  const mountedAt = useRef(Date.now())
  const challenge = useMemo(() => {
    const a = 2 + Math.floor(Math.random() * 7)
    const b = 2 + Math.floor(Math.random() * 7)
    return { a, b }
  }, [])

  const [f, setF] = useState({
    name: '',
    email: '',
    countryCode: '+254',
    phone: '',
    interest: project ?? '',
    budget: '',
    buyerType: '',
    timeline: '',
    message: '',
    answer: '',
    website: '', // honeypot
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (Number(f.answer) !== challenge.a + challenge.b) {
      setError('The verification answer is not correct — please try again.')
      return
    }

    setStatus('loading')
    const payload = {
      type: leadType,
      name: f.name.trim(),
      email: f.email.trim(),
      phone: `${f.countryCode} ${f.phone.trim()}`.trim(),
      country_code: f.countryCode,
      interest: showInterest ? f.interest : project ?? f.interest,
      project: project ?? (showInterest ? f.interest : undefined),
      budget: showBudget ? f.budget : undefined,
      buyer_type: showBuyerType ? f.buyerType : undefined,
      timeline: showTimeline ? f.timeline : undefined,
      message: showMessage ? f.message.trim() : undefined,
      source,
      _hp: f.website,
      _elapsed: Date.now() - mountedAt.current,
    }

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('failed')
    } catch {
      setStatus('idle')
      setError('Something went wrong sending your enquiry. Please call us on +254 118 266 666.')
      return
    }
    setStatus('success')
    onSuccess?.()
  }

  /* ── Styling tokens ── */
  const label = `block text-[10px] font-sans font-semibold tracking-[0.15em] uppercase mb-1.5 ${dark ? 'text-white/45' : 'text-dark/45'}`
  const field = `w-full border px-4 py-3 text-sm font-sans transition-colors focus:outline-none ${
    dark
      ? 'bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-gold'
      : 'border-dark/15 text-dark placeholder:text-dark/30 focus:border-gold bg-white'
  }`
  const selectField = `${field} appearance-none`

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex flex-col items-center justify-center text-center px-6 py-14 ${className}`}
      >
        <CheckCircle size={44} className="text-gold mb-5" />
        <h3 className={`font-serif text-2xl font-light mb-3 ${dark ? 'text-white' : 'text-dark'}`}>
          Enquiry received{f.name ? `, ${f.name.split(' ')[0]}` : ''}
        </h3>
        <p className={`text-sm font-sans font-light leading-relaxed max-w-sm ${dark ? 'text-white/55' : 'text-dark/55'}`}>
          Thank you. One of our property advisors will be in touch by email, phone, or WhatsApp shortly.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} className={`space-y-5 ${className}`}>
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={f.website}
        onChange={set('website')}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Full name *</label>
          <input type="text" required value={f.name} onChange={set('name')} placeholder="Your full name" className={field} />
        </div>
        <div>
          <label className={label}>Email address *</label>
          <input type="email" required value={f.email} onChange={set('email')} placeholder="your@email.com" className={field} />
        </div>
      </div>

      <div>
        <label className={label}>Phone number *</label>
        <div className="flex gap-2">
          <select
            value={f.countryCode}
            onChange={set('countryCode')}
            className={`${selectField} w-[40%] sm:w-[38%] flex-shrink-0`}
            aria-label="Country code"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
          <input
            type="tel"
            required
            value={f.phone}
            onChange={set('phone')}
            placeholder="712 345 678"
            className={`${field} flex-1`}
          />
        </div>
      </div>

      {showInterest && (
        <div>
          <label className={label}>What are you interested in? *</label>
          <select required value={f.interest} onChange={set('interest')} className={selectField}>
            <option value="">Select a development</option>
            {INTERESTS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      )}

      {(showBudget || showTimeline) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {showBudget && (
            <div>
              <label className={label}>What is your budget? *</label>
              <select required value={f.budget} onChange={set('budget')} className={selectField}>
                <option value="">Select a range</option>
                {BUDGETS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          )}
          {showTimeline && (
            <div>
              <label className={label}>How soon would you like to buy? *</label>
              <select required value={f.timeline} onChange={set('timeline')} className={selectField}>
                <option value="">Select a timeframe</option>
                {TIMELINES.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          )}
        </div>
      )}

      {showBuyerType && (
        <div>
          <label className={label}>Are you the decision maker? *</label>
          <select required value={f.buyerType} onChange={set('buyerType')} className={selectField}>
            <option value="">Select one</option>
            {BUYER_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      )}

      {showMessage && (
        <div>
          <label className={label}>Message</label>
          <textarea
            rows={4}
            value={f.message}
            onChange={set('message')}
            placeholder="Tell us about your requirements, preferred unit type, or any questions…"
            className={`${field} resize-none`}
          />
        </div>
      )}

      {/* Human check */}
      <div>
        <label className={`${label} flex items-center gap-1.5`}>
          <ShieldCheck size={12} className="text-gold" /> Confirm you&apos;re human *
        </label>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-sans ${dark ? 'text-white/70' : 'text-dark/70'}`}>
            {challenge.a} + {challenge.b} =
          </span>
          <input
            type="text"
            inputMode="numeric"
            required
            value={f.answer}
            onChange={set('answer')}
            placeholder="?"
            className={`${field} w-20`}
          />
        </div>
      </div>

      {error && (
        <p className="text-[12px] font-sans" style={{ color: '#d14343' }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full py-4 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase transition-colors duration-300 disabled:opacity-60 ${
          dark ? 'bg-gold-dark text-white hover:bg-gold' : 'bg-dark text-white hover:bg-gold-dark'
        }`}
      >
        {status === 'loading' ? <span className="animate-pulse">Sending…</span> : submitLabel}
      </button>

      <p className={`text-[10px] font-sans text-center leading-relaxed ${dark ? 'text-white/30' : 'text-dark/35'}`}>
        On submission you&apos;ll receive an email, call, or WhatsApp from our property advisor.
        Your details are kept confidential.
      </p>
    </form>
  )
}
