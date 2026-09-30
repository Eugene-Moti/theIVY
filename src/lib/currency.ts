// Approximate KES-per-USD rate for the indicative USD price shown to
// diaspora buyers. This is NOT a live rate — update it periodically
// (checked ~Sep 2026: ~130 KES/USD). Never presented as exact.
export const USD_PER_KES = 1 / 130

export function kesStringToNumber(s: string): number | null {
  const digits = s.replace(/[^0-9]/g, '')
  if (!digits) return null
  const n = Number(digits)
  return n > 100000 ? n : null // guards against stray small numbers (unit counts, etc.)
}

/** "≈ $139K" / "≈ $52,300" style indicative USD for a KES amount. */
export function approxUsd(kesAmount: number): string {
  const usd = kesAmount * USD_PER_KES
  if (usd >= 1000) {
    const k = usd / 1000
    return `≈ $${k.toFixed(k < 10 ? 1 : 0)}K`
  }
  return `≈ $${Math.round(usd).toLocaleString('en-US')}`
}

/** Best-effort "≈ $X" straight from a KES display string, e.g. "From KES 18,000,000". */
export function approxUsdFromString(kesText: string): string | null {
  const n = kesStringToNumber(kesText)
  return n ? approxUsd(n) : null
}
