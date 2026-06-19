import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = 'marketing.ivy-group@rsunproperty.net'
const FROM = 'The Ivy Group Website <onboarding@resend.dev>'

function contactHtml(data: Record<string, string>) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;">
      <div style="background:#0D0D0D;padding:28px 32px;">
        <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;">The Ivy Group</p>
        <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0;">New Website Enquiry</h1>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:130px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;">${data.name || '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;"><a href="mailto:${data.email}" style="color:#C9A84C;">${data.email || '—'}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;"><a href="tel:${data.phone}" style="color:#C9A84C;">${data.phone || '—'}</a></td></tr>
          ${data.interest ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Interested In</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;">${data.interest}</td></tr>` : ''}
          ${data.message ? `<tr><td style="padding:10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Message</td><td style="padding:10px 0;color:#111827;font-size:14px;line-height:1.6;">${data.message}</td></tr>` : ''}
        </table>
        <div style="margin-top:28px;padding:16px;background:#f9fafb;border-left:3px solid #C9A84C;">
          <p style="margin:0;color:#6b7280;font-size:12px;">Reply directly to this email to respond to the enquirer.</p>
        </div>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#9ca3af;font-size:11px;">Sent from ivygroup.ke · The Ivy Group, Blossoms Ivy Residence, Gatundu Road, Kileleshwa</p>
      </div>
    </div>
  `
}

function brochureHtml(data: Record<string, string>) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;">
      <div style="background:#0D0D0D;padding:28px 32px;">
        <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;">The Ivy Group</p>
        <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0;">New Brochure Download Lead</h1>
      </div>
      <div style="padding:32px;">
        <div style="background:#C9A84C;display:inline-block;padding:6px 14px;margin-bottom:24px;">
          <p style="color:#0D0D0D;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0;">📄 ${data.project || 'Unknown Project'}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:130px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;">${data.name || '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;"><a href="mailto:${data.email}" style="color:#C9A84C;">${data.email || '—'}</a></td></tr>
          <tr><td style="padding:10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</td><td style="padding:10px 0;color:#111827;font-size:14px;"><a href="tel:${data.phone}" style="color:#C9A84C;">${data.phone || '—'}</a></td></tr>
        </table>
        <div style="margin-top:28px;padding:16px;background:#f9fafb;border-left:3px solid #C9A84C;">
          <p style="margin:0;color:#6b7280;font-size:12px;">This lead downloaded the <strong>${data.project}</strong> brochure. Follow up within 24 hours for best conversion.</p>
        </div>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#9ca3af;font-size:11px;">Sent from ivygroup.ke · The Ivy Group, Blossoms Ivy Residence, Gatundu Road, Kileleshwa</p>
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
        <p style="color:#374151;font-size:14px;margin:0 0 20px;">Someone registered for rental availability notifications:</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:130px;">Email</td><td style="padding:10px 0;color:#111827;font-size:14px;"><a href="mailto:${data.email}" style="color:#C9A84C;">${data.email || '—'}</a></td></tr>
        </table>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#9ca3af;font-size:11px;">Sent from ivygroup.ke · The Ivy Group</p>
      </div>
    </div>
  `
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
    } else if (type === 'rental-waitlist') {
      subject = 'New Rental Waitlist Sign-up — The Ivy Group'
      html = waitlistHtml(rest)
    } else if (type === 'contact-form') {
      subject = `Website Enquiry${rest.interest ? ` — ${rest.interest}` : ''} — ${rest.name || 'Unknown'}`
    }

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
