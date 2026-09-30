/**
 * Captures utm_ params and gclid off the landing URL and persists them so a
 * lead submitted days later still carries the campaign that brought the
 * visitor in. Last-touch: a fresh ad click always overwrites a previous
 * visit's attribution, since for paid campaigns the most recent click is
 * what you're paying for and want credited.
 */

const KEY = 'ivy_attribution'
const MAX_AGE_DAYS = 90

const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'] as const

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>>

/** Call once on every page load (see AttributionCapture.tsx). No-ops if the
 * URL has none of the tracked params, leaving any existing stored value. */
export function captureAttribution() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const found: Attribution = {}
  for (const key of PARAMS) {
    const v = params.get(key)
    if (v) found[key] = v
  }
  if (Object.keys(found).length === 0) return
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...found, captured_at: new Date().toISOString() }))
  } catch {
    // private browsing / storage disabled — attribution is best-effort
  }
}

/** Best-effort read for attaching to a lead payload. Empty if nothing was
 * ever captured, storage is unavailable, or the stored value is stale. */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const { captured_at, ...data } = JSON.parse(raw) as Attribution & { captured_at?: string }
    if (captured_at) {
      const ageMs = Date.now() - new Date(captured_at).getTime()
      if (ageMs > MAX_AGE_DAYS * 24 * 60 * 60 * 1000) return {}
    }
    return data
  } catch {
    return {}
  }
}
