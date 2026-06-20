import { describe, it, expect, vi, beforeAll } from 'vitest'

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      insert: vi.fn().mockResolvedValue({ error: null }),
    })),
  })),
}))

beforeAll(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
})

describe('POST /api/subscribe', () => {
  it('returns 200 for valid email', async () => {
    const { POST } = await import('../app/api/subscribe/route.ts')
    const req = new Request('http://localhost/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', language: 'en' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })

  it('returns 400 for invalid email', async () => {
    const { POST } = await import('../app/api/subscribe/route.ts')
    const req = new Request('http://localhost/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'not-an-email', language: 'en' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
