'use client'

import { trackConversion } from '@/lib/analytics'

/**
 * A plain <a> that fires a Google Ads / GA4 conversion event on click before
 * navigating. Exists so server components (e.g. the footer) can still get a
 * tracked WhatsApp/call link without becoming client components themselves.
 */
export default function TrackedLink({
  kind,
  href,
  target,
  rel,
  className,
  children,
  extra,
}: {
  kind: 'whatsapp' | 'call'
  href: string
  target?: string
  rel?: string
  className?: string
  children: React.ReactNode
  extra?: Record<string, unknown>
}) {
  return (
    <a href={href} target={target} rel={rel} className={className} onClick={() => trackConversion(kind, extra)}>
      {children}
    </a>
  )
}
