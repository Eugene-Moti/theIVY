'use client'

/**
 * Google Ads conversion tracking.
 *
 * Wire-up is intentionally decoupled from the Ads account IDs: nothing here
 * fires anything until NEXT_PUBLIC_GOOGLE_ADS_ID and the matching
 * NEXT_PUBLIC_GADS_LABEL_* env vars are set (Vercel → Settings →
 * Environment Variables), taken from Google Ads → Goals → Conversions →
 * (each action) → "See conversion action details" → tag setup → per-event
 * snippet. Until then every call safely no-ops (with a console note in dev)
 * so this can ship ahead of having the real IDs.
 *
 * The base gtag.js loader + `gtag('config', ...)` calls live in
 * src/app/layout.tsx, not here — this module only fires *events* on top of
 * that loader.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

const LABELS = {
  lead: process.env.NEXT_PUBLIC_GADS_LABEL_LEAD,
  whatsapp: process.env.NEXT_PUBLIC_GADS_LABEL_WHATSAPP,
  call: process.env.NEXT_PUBLIC_GADS_LABEL_CALL,
} as const

type ConversionKind = keyof typeof LABELS

const GA4_EVENT_NAME: Record<ConversionKind, string> = {
  lead: 'generate_lead',
  whatsapp: 'whatsapp_click',
  call: 'phone_click',
}

/**
 * Fire a conversion. Always sends a plain GA4 event (useful for reporting
 * even before Ads is wired up); additionally fires the Google Ads
 * conversion event once the account IDs are configured.
 */
export function trackConversion(kind: ConversionKind, extra?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', GA4_EVENT_NAME[kind], extra)

  const label = LABELS[kind]
  if (ADS_ID && label) {
    window.gtag('event', 'conversion', { send_to: `${ADS_ID}/${label}`, ...extra })
  } else if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.info(
      `[analytics] "${kind}" fired as a GA4 event only — set NEXT_PUBLIC_GOOGLE_ADS_ID and ` +
        `NEXT_PUBLIC_GADS_LABEL_${kind.toUpperCase()} to also fire the Google Ads conversion.`,
    )
  }
}
