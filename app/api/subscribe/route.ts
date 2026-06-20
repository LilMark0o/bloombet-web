import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  const body = await req.json() as { email?: string; language?: string }
  if (!body.email || !isValidEmail(body.email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const lang = ['en', 'es', 'both'].includes(body.language ?? '') ? body.language : 'en'
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: existing } = await supabase.from('subscribers').select('id').eq('email', body.email).single()
  if (existing) return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })

  const { error } = await supabase.from('subscribers').insert({ email: body.email, language: lang, interests: ['tech', 'finance'], tier: 'free', active: true })
  if (error) return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })

  return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 })
}
