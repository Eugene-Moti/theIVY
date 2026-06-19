import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    /* ── TODO: wire up your email/CRM here (e.g. Resend, SendGrid) ── */
    console.log('[Ivy Group] New enquiry received:', data)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
