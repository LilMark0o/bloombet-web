'use client'
import { useState } from 'react'

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, language: 'en' }),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') return (
    <div className="text-center py-4 text-green-700 font-medium">
      You are subscribed! We will alert you when odds shift dramatically.
    </div>
  )

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 font-medium"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status === 'error' && <p className="text-red-500 text-sm mt-1">Something went wrong. Try again.</p>}
    </form>
  )
}
