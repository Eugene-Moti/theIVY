import { NextResponse } from 'next/server'
import { resolveMx, resolve4 } from 'node:dns/promises'
import { Resend } from 'resend'
import { createAdminClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([p, new Promise<T>((_, r) => setTimeout(() => r(new Error('timeout')), ms))])
}

/**
 * Checks the email domain can actually receive mail. Rejects obvious junk
 * ("@gmial.com", made-up domains); stays permissive on transient DNS errors
 * so a real enquiry is never lost to a flaky lookup.
 */
async function emailDeliverable(email: string): Promise<boolean> {
  const domain = String(email).split('@')[1]?.toLowerCase().trim()
  if (!domain || !domain.includes('.') || domain.endsWith('.')) return false
  try {
    const mx = await withTimeout(resolveMx(domain), 3000)
    if (Array.isArray(mx) && mx.length > 0) return true
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code
    if (code !== 'ENOTFOUND' && code !== 'ENODATA') return true // transient — allow
  }
  // No MX — fall back to an A record (RFC 5321 implicit MX)
  try {
    const a = await withTimeout(resolve4(domain), 3000)
    return Array.isArray(a) && a.length > 0
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code
    return code !== 'ENOTFOUND' && code !== 'ENODATA'
  }
}
const TO   = 'marketing.ivy-group@rsunproperty.net'
const FROM = 'The Ivy Group Website <onboarding@resend.dev>'

const ROW = (k: string, v: string) =>
  `<tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:150px;vertical-align:top;">${k}</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;line-height:1.5;">${v || '—'}</td></tr>`

function isAgent(v?: string) {
  return !!v && /agent|broker/i.test(v)
}

function contactHtml(data: Record<string, string>) {
  const agent = isAgent(data.buyer_type)
  const hot = /as soon as possible|1.3 months/i.test(data.timeline || '')
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;">
      <div style="background:#0D0D0D;padding:28px 32px;">
        <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;">The Ivy Group</p>
        <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0;">New Website Enquiry</h1>
      </div>
      <div style="padding:32px;">
        ${agent
          ? `<div style="margin:0 0 20px;padding:12px 16px;background:#fef2f2;border-left:3px solid #dc2626;"><p style="margin:0;color:#991b1b;font-size:13px;font-weight:700;">AGENT / BROKER ENQUIRY — not a direct buyer</p></div>`
          : hot
          ? `<div style="margin:0 0 20px;padding:12px 16px;background:#ecfdf5;border-left:3px solid #059669;"><p style="margin:0;color:#065f46;font-size:13px;font-weight:700;">HOT LEAD — ready to buy soon</p></div>`
          : ''}
        <table style="width:100%;border-collapse:collapse;">
          ${ROW('Name', data.name)}
          ${ROW('Email', `<a href="mailto:${data.email}" style="color:#C9A84C;">${data.email || '—'}</a>`)}
          ${ROW('Phone', `<a href="tel:${data.phone}" style="color:#C9A84C;">${data.phone || '—'}</a>`)}
          ${data.interest ? ROW('Interested in', data.interest) : ''}
          ${data.budget ? ROW('Budget', `<strong>${data.budget}</strong>`) : ''}
          ${data.buyer_type ? ROW('Decision maker', `<strong>${data.buyer_type}</strong>`) : ''}
          ${data.timeline ? ROW('Timeframe', `<strong>${data.timeline}</strong>`) : ''}
          ${data.source ? ROW('Came from', data.source) : ''}
          ${data.message ? ROW('Message', String(data.message).replace(/\n/g, '<br>')) : ''}
          ${String(data.consent) === 'true' ? ROW('Consent', 'Agreed to privacy policy &amp; contact') : ''}
        </table>
        <div style="margin-top:28px;padding:16px;background:#f9fafb;border-left:3px solid #C9A84C;">
          <p style="margin:0;color:#6b7280;font-size:12px;">Reply directly to this email to respond to the enquirer.</p>
        </div>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#9ca3af;font-size:11px;">Sent from ivygroup.ke · The Ivy Group, Ivy Park Residence, Kirichwa Road, Kilimani (near Yaya Centre), Nairobi</p>
      </div>
    </div>
  `
}

function chatLeadHtml(data: Record<string, string>, leadType: string) {
  const isCallback = leadType === 'chat-callback'
  const badge = isCallback ? '📞 Callback Request' : '📄 Brochure Request'
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;">
      <div style="background:#0D0D0D;padding:28px 32px;">
        <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;">The Ivy Group · Chat Lead</p>
        <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0;">New ${isCallback ? 'Callback' : 'Brochure'} Request</h1>
      </div>
      <div style="padding:32px;">
        <div style="background:#C9A84C;display:inline-block;padding:6px 14px;margin-bottom:24px;">
          <p style="color:#0D0D0D;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0;">${badge}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:130px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;">${data.name || '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;"><a href="tel:${data.phone}" style="color:#C9A84C;">${data.phone || '—'}</a></td></tr>
          <tr><td style="padding:10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Property Interest</td><td style="padding:10px 0;color:#111827;font-size:14px;">${data.property_interest || 'General Enquiry'}</td></tr>
        </table>
        <div style="margin-top:28px;padding:16px;background:#f9fafb;border-left:3px solid #C9A84C;">
          <p style="margin:0;color:#6b7280;font-size:12px;">
            ${isCallback
              ? `<strong>Action required:</strong> Call ${data.name || 'this lead'} on <a href="tel:${data.phone}" style="color:#C9A84C;">${data.phone}</a> at your earliest convenience.`
              : `<strong>Action:</strong> Send the ${data.property_interest || ''} brochure and follow up with ${data.name || 'this lead'} on <a href="tel:${data.phone}" style="color:#C9A84C;">${data.phone}</a>.`
            }
          </p>
        </div>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#9ca3af;font-size:11px;">Lead via Ivy Chat Widget · ivygroup.ke</p>
      </div>
    </div>
  `
}

function waitlistHtml(data: Record<string, string>) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;">
      <div style="background:#0D0D0D;padding:28px 32px;">
        <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;">The Ivy Group</p>
        <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0;">New Rental Waitlist Sign-up</h1>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:130px;">Email</td><td style="padding:10px 0;color:#111827;font-size:14px;"><a href="mailto:${data.email}" style="color:#C9A84C;">${data.email || '—'}</a></td></tr>
        </table>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#9ca3af;font-size:11px;">Sent from ivygroup.ke</p>
      </div>
    </div>
  `
}

// The site's own project names ("Ivy Park Residence", chat's short "Blossom
// Ivy", ...) don't always match Ivy Group CRM's canonical project names
// exactly (its /Settings > Projects table currently has 'Ivy Park', 'Ivy
// Myst', 'Blossoms Ivy', 'Luckinn Ivy') — the CRM webhook only links a lead
// to a project on an exact case-insensitive match, so this normalizes
// every known spelling this site uses before sending. Anything not listed
// here (e.g. "Rental enquiry", "General — not sure yet") is left unmatched
// on purpose — it isn't one of the four real developments.
const CRM_PROJECT_MAP: Record<string, string> = {
  'ivy park': 'Ivy Park',
  'ivy park residence': 'Ivy Park',
  'ivy myst': 'Ivy Myst',
  'blossom ivy': 'Blossoms Ivy',
  'blossom ivy residence': 'Blossoms Ivy',
  'blossoms ivy': 'Blossoms Ivy',
  'luckinn ivy': 'Luckinn Ivy',
  'luckinn ivy residence': 'Luckinn Ivy',
}

function crmProjectName(raw?: string): string | undefined {
  if (!raw) return undefined
  return CRM_PROJECT_MAP[raw.trim().toLowerCase()]
}

// Same first-word/rest-of-name split Ivy Group CRM's own import tool uses,
// so a name splits the same way everywhere it enters the system.
function splitName(full: string): { first: string; last?: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean)
  if (parts.length <= 1) return { first: parts[0] ?? '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

const CRM_SOURCE_LABEL: Record<string, string> = {
  'contact-form': 'Website — Contact form',
  'brochure-download': 'Website — Brochure request',
  'chat-callback': 'Website — Chat callback request',
  'chat-brochure': 'Website — Chat brochure request',
  'chat-ticket': 'Website — Chat assistant',
}

/**
 * Mirrors every real enquiry into Ivy Group CRM as a lead, alongside the
 * existing email notification and this site's own Supabase leads table —
 * rental-waitlist is skipped (email only, nothing a CRM lead needs a name
 * or phone for). Fire-and-forget, same shape as saveLead: a CRM outage
 * should never block or fail a visitor's submission.
 */
async function pushToCrm(data: Record<string, string>, type: string) {
  const url = process.env.CRM_WEBHOOK_URL
  const secret = process.env.CRM_WEBHOOK_SECRET
  if (!url || !secret) return

  const name = (data.name || '').trim()
  if (!name) return

  const { first, last } = splitName(name)
  const project = crmProjectName(data.project || data.interest || data.property_interest)

  const extras = [
    data.budget ? `Budget: ${data.budget}` : null,
    data.timeline ? `Timeline: ${data.timeline}` : null,
    data.buyer_type ? `Decision maker: ${data.buyer_type}` : null,
    data.country ? `Country: ${data.country}` : null,
  ].filter(Boolean).join(' · ')
  const message = [extras, data.message].filter(Boolean).join('\n') || undefined

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
      body: JSON.stringify({
        first_name: first,
        last_name: last,
        phone: data.phone || undefined,
        email: data.email || undefined,
        source: CRM_SOURCE_LABEL[type] || 'Website',
        project,
        message,
        lead_type: isAgent(data.buyer_type) ? 'Real Estate Agent' : 'Direct Client',
      }),
    })
    if (!res.ok) {
      console.error('[Ivy Group] CRM webhook rejected the lead:', res.status, await res.text().catch(() => ''))
    }
  } catch (err) {
    console.error('[Ivy Group] CRM webhook failed:', err)
  }
}

async function saveLead(data: Record<string, string>, type: string) {
  try {
    const supabase = createAdminClient()
    const meta: Record<string, string> = {}
    for (const k of ['budget', 'buyer_type', 'timeline', 'country_code', 'message', 'source'] as const) {
      if (data[k]) meta[k] = data[k]
    }
    if (String(data.consent) === 'true') meta.consent = `given ${new Date().toISOString()}`
    const row: Record<string, unknown> = {
      name:              data.name || null,
      phone:             data.phone || null,
      email:             data.email || null,
      property_interest: data.interest || data.property_interest || data.project || null,
      lead_type:         type,
    }
    if (Object.keys(meta).length) row.meta = meta
    const { error } = await supabase.from('leads').insert(row)
    // `meta` column may not exist yet — retry without it so the lead is still saved.
    if (error && 'meta' in row) {
      delete row.meta
      await supabase.from('leads').insert(row)
    }
  } catch { /* non-critical — email is primary notification */ }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { type, _hp, _elapsed, ...rest } = data

    // Bot filters — honeypot field, and submissions faster than a human could fill the form.
    if ((typeof _hp === 'string' && _hp.trim()) || (typeof _elapsed === 'number' && _elapsed > 0 && _elapsed < 2500)) {
      return NextResponse.json({ success: true })
    }

    // Email deliverability — for the visitor-facing forms only.
    if (['contact-form', 'brochure-download', 'chat-ticket'].includes(type) && rest.email) {
      if (!(await emailDeliverable(rest.email))) {
        return NextResponse.json(
          { field: 'email', message: "This email address doesn't appear able to receive mail — please check it." },
          { status: 422 },
        )
      }
    }

    let subject = 'New Enquiry — The Ivy Group Website'
    let html = contactHtml(rest)

    const tag = isAgent(rest.buyer_type) ? '⚠ AGENT · ' : ''

    if (type === 'brochure-download') {
      subject = `${tag}Brochure Request — ${rest.project || rest.interest || 'General'} · ${rest.name || 'Unknown'}`
      html = contactHtml(rest)
    } else if (type === 'chat-callback') {
      subject = `🔴 Callback Request — ${rest.name || 'Unknown'} · ${rest.property_interest || 'General'}`
      html = chatLeadHtml(rest, type)
    } else if (type === 'chat-brochure') {
      subject = `📄 Brochure Request — ${rest.name || 'Unknown'} · ${rest.property_interest || 'General'}`
      html = chatLeadHtml(rest, type)
    } else if (type === 'chat-ticket') {
      subject = `💬 New Chat Contact — ${rest.name || 'Unknown'}`
      html = contactHtml(rest)
    } else if (type === 'rental-waitlist') {
      subject = 'New Rental Waitlist Sign-up — The Ivy Group'
      html = waitlistHtml(rest)
    } else if (type === 'contact-form') {
      subject = `${tag}Website Enquiry${rest.interest ? ` — ${rest.interest}` : ''} — ${rest.name || 'Unknown'}`
    }

    // Save to Supabase and push into Ivy Group CRM in parallel with the
    // email send — started here, awaited below (with the email) rather
    // than left to run loose. A serverless function can be frozen the
    // instant its response is returned, which was silently killing these
    // two mid-flight on every submission whenever they hadn't already
    // finished before the email did.
    const sidePromise = Promise.allSettled([
      saveLead(rest, type),
      type !== 'rental-waitlist' ? pushToCrm(rest, type) : Promise.resolve(),
    ])

    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: rest.email || undefined,
      subject,
      html,
    })

    await sidePromise

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Ivy Group] Email error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
