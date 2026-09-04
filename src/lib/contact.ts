export const PHONE_RAW = '+254118266666'
export const PHONE_PRETTY = '+254 118 266 666'
export const EMAIL = 'marketing.ivy-group@rsunproperty.net'

/** WhatsApp deep-link with an optional pre-filled context line. */
export function waLink(context?: string) {
  const msg = context
    ? `Hello, I'm interested in ${context}. Could you share more details?`
    : 'Hello, I came across The Ivy Group website and would like to know more about your developments.'
  return `https://wa.me/254118266666?text=${encodeURIComponent(msg)}`
}
