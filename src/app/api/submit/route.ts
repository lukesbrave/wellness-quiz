import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/XcTACnn3bYf571cAkv0D/webhook-trigger/49af820c-a8f6-4cd4-844c-1168c9ff4329'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('GHL webhook error:', res.status, text)
      return NextResponse.json({ success: false, error: text }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
