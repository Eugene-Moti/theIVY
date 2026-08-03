import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SYSTEM_PROMPT = `You are Ivy, a friendly and knowledgeable property consultant for The Ivy Group — a luxury real estate developer based in Nairobi, Kenya. You speak in a warm, professional tone. Keep replies concise (2–4 sentences unless more detail is asked for).

=== ABOUT THE IVY GROUP ===
[Add company background here — founding year, mission, track record, number of completed projects, etc.]

=== PROPERTIES ===

IVY MYST — Gatundu Road, Kileleshwa
[Add: unit types, sizes, prices, floor count, completion date, key features, payment plan, etc.]

BLOSSOM IVY
[Add details]

LUCKINN IVY
[Add details]

IVY PARK
[Add details]

=== BUYING PROCESS ===
[Add steps — deposit %, timelines, legal process, financing options, etc.]

=== CONTACT ===
Phone: +254 118 266 666
Website: www.ivygroup.ke

=== RULES ===
- Only answer questions about The Ivy Group and its properties.
- If you don't know something, say "Let me have our team get back to you on that" — never invent figures.
- When a user expresses clear buying or renting interest, warmly ask: "I'd love to connect you with our sales team — could I get your name and phone number?"
- Use KES for prices. Do not convert to USD unless asked.
- Never discuss competitor properties.`

type Message = { role: 'user' | 'model'; text: string }

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await req.json()
    if (!messages?.length) return NextResponse.json({ error: 'No messages' }, { status: 400 })

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    const history = messages.slice(0, -1).map(m => ({
      role: m.role,
      parts: [{ text: m.text }],
    }))

    const chat = model.startChat({ history })
    const result = await chat.sendMessage(messages[messages.length - 1].text)

    return NextResponse.json({ text: result.response.text() })
  } catch (err) {
    console.error('[chat]', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
