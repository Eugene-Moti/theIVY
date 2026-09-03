import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createAdminClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO   = 'marketing.ivy-group@rsunproperty.net'
const FROM = 'The Ivy Group Website <onboarding@resend.dev>'

function contactHtml(data: Record<string, string>) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;">
      <div style="background:#0D0D0D;padding:28px 32px;">
        <p style="color:#2F5540;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;">The Ivy Group</p>
        <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0;">New Website Enquiry</h1>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:130px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;">${data.name || '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;"><a href="mailto:${data.email}" style="color:#2F5540;">${data.email || '—'}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;"><a href="tel:${data.phone}" style="color:#2F5540;">${data.phone || '—'}</a></td></tr>
          ${data.interest ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Interested In</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;">${data.interest}</td></tr>` : ''}
          ${data.message ? `<tr><td style="padding:10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Message</td><td style="padding:10px 0;color:#111827;font-size:14px;line-height:1.6;">${data.message}</td></tr>` : ''}
        </table>
        <div style="margin-top:28px;padding:16px;background:#f9fafb;border-left:3px solid #2F5540;">
          <p style="margin:0;color:#6b7280;font-size:12px;">Reply directly to this email to respond to the enquirer.</p>
        </div>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#9ca3af;font-size:11px;">Sent from ivygroup.ke · The Ivy Group, Ivy Park Residence, Kirichwa Road, Kilimani (near Yaya Centre), Nairobi</p>
      </div>
    </div>
  `
}

function brochureHtml(data: Record<string, string>) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;">
      <div style="background:#0D0D0D;padding:28px 32px;">
        <p style="color:#2F5540;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;">The Ivy Group</p>
        <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0;">New Brochure Download Lead</h1>
      </div>
      <div style="padding:32px;">
        <div style="background:#2F5540;display:inline-block;padding:6px 14px;margin-bottom:24px;">
          <p style="color:#ffffff;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0;">📄 ${data.project || 'Unknown Project'}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:130px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;">${data.name || '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;"><a href="mailto:${data.email}" style="color:#2F5540;">${data.email || '—'}</a></td></tr>
          <tr><td style="padding:10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</td><td style="padding:10px 0;color:#111827;font-size:14px;"><a href="tel:${data.phone}" style="color:#2F5540;">${data.phone || '—'}</a></td></tr>
        </table>
        <div style="margin-top:28px;padding:16px;background:#f9fafb;border-left:3px solid #2F5540;">
          <p style="margin:0;color:#6b7280;font-size:12px;">This lead downloaded the <strong>${data.project}</strong> brochure. Follow up within 24 hours for best conversion.</p>
        </div>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#9ca3af;font-size:11px;">Sent from ivygroup.ke</p>
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
        <p style="color:#2F5540;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;">The Ivy Group · Chat Lead</p>
        <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0;">New ${isCallback ? 'Callback' : 'Brochure'} Request</h1>
      </div>
      <div style="padding:32px;">
        <div style="background:#2F5540;display:inline-block;padding:6px 14px;margin-bottom:24px;">
          <p style="color:#ffffff;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0;">${badge}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:130px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;">${data.name || '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;"><a href="tel:${data.phone}" style="color:#2F5540;">${data.phone || '—'}</a></td></tr>
          <tr><td style="padding:10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Property Interest</td><td style="padding:10px 0;color:#111827;font-size:14px;">${data.property_interest || 'General Enquiry'}</td></tr>
        </table>
        <div style="margin-top:28px;padding:16px;background:#f9fafb;border-left:3px solid #2F5540;">
          <p style="margin:0;color:#6b7280;font-size:12px;">
            ${isCallback
              ? `<strong>Action required:</strong> Call ${data.name || 'this lead'} on <a href="tel:${data.phone}" style="color:#2F5540;">${data.phone}</a> at your earliest convenience.`
              : `<strong>Action:</strong> Send the ${data.property_interest || ''} brochure and follow up with ${data.name || 'this lead'} on <a href="tel:${data.phone}" style="color:#2F5540;">${data.phone}</a>.`
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
        <p style="color:#2F5540;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;">The Ivy Group</p>
        <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0;">New Rental Waitlist Sign-up</h1>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:130px;">Email</td><td style="padding:10px 0;color:#111827;font-size:14px;"><a href="mailto:${data.email}" style="color:#2F5540;">${data.email || '—'}</a></td></tr>
        </table>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#9ca3af;font-size:11px;">Sent from ivygroup.ke</p>
      </div>
    </div>
  `
}

async function saveLead(data: Record<string, string>, type: string) {
  try {
    const supabase = createAdminClient()
    await supabase.from('leads').insert({
      name:              data.name || null,
      phone:             data.phone || null,
      email:             data.email || null,
      property_interest: data.property_interest || data.project || null,
      lead_type:         type,
    })
  } catch { /* non-critical — email is primary notification */ }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { type, ...rest } = data

    let subject = 'New Enquiry — The Ivy Group Website'
    let html = contactHtml(rest)

    if (type === 'brochure-download') {
      subject = `Brochure Download Lead — ${rest.project || 'Unknown Project'}`
      html = brochureHtml(rest)
    } else if (type === 'chat-callback') {
      subject = `🔴 Callback Request — ${rest.name || 'Unknown'} · ${rest.property_interest || 'General'}`
      html = chatLeadHtml(rest, type)
    } else if (type === 'chat-brochure') {
      subject = `📄 Brochure Request — ${rest.name || 'Unknown'} · ${rest.property_interest || 'General'}`
      html = chatLeadHtml(rest, type)
    } else if (type === 'rental-waitlist') {
      subject = 'New Rental Waitlist Sign-up — The Ivy Group'
      html = waitlistHtml(rest)
    } else if (type === 'contact-form') {
      subject = `Website Enquiry${rest.interest ? ` — ${rest.interest}` : ''} — ${rest.name || 'Unknown'}`
    }

    // Save to Supabase (non-blocking)
    saveLead(rest, type)

    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: rest.email || undefined,
      subject,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Ivy Group] Email error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
