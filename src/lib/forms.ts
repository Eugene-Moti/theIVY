import { getCountries, getCountryCallingCode } from 'libphonenumber-js/min'

/* ── Country list (all 245 territories libphonenumber knows) ─────────────── */

export type Country = { iso: string; name: string; code: string }

let regionNames: Intl.DisplayNames | null = null
try {
  regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
} catch {
  regionNames = null
}

const ALL: Country[] = getCountries()
  .map((iso) => {
    let name: string = iso
    try {
      name = regionNames?.of(iso) ?? iso
    } catch {
      /* keep iso */
    }
    return { iso, name, code: getCountryCallingCode(iso) }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

// Kenya and the markets we hear from most, pinned to the top of the list.
const PINNED = ['KE', 'UG', 'TZ', 'RW', 'GB', 'US', 'AE', 'CA', 'AU', 'ZA']

export const COUNTRIES: Country[] = [
  ...PINNED.map((iso) => ALL.find((c) => c.iso === iso)).filter((c): c is Country => !!c),
  ...ALL.filter((c) => !PINNED.includes(c.iso)),
]

/* ── Email checks ───────────────────────────────────────────────────────── */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const COMMON_DOMAINS = [
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'ymail.com',
  'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'live.com', 'msn.com',
  'icloud.com', 'me.com', 'mac.com', 'aol.com', 'protonmail.com', 'proton.me',
]

function editDistance(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 1; j <= n; j++) d[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
    }
  }
  return d[m][n]
}

/** Returns a corrected email if the domain looks like a typo of a common one. */
export function suggestEmail(email: string): string | null {
  const at = email.lastIndexOf('@')
  if (at < 1) return null
  const local = email.slice(0, at)
  const domain = email.slice(at + 1).toLowerCase().trim()
  if (!domain || COMMON_DOMAINS.includes(domain)) return null

  let best: string | null = null
  let bestDist = 3
  for (const d of COMMON_DOMAINS) {
    const dist = editDistance(domain, d)
    if (dist > 0 && dist < bestDist) {
      bestDist = dist
      best = d
    }
  }
  return best ? `${local}@${best}` : null
}
