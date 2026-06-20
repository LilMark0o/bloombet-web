'use client'
import { useState } from 'react'
import { LanguageToggle } from './LanguageToggle'
import type { PublishedPost } from '@/lib/types'

export function PostContent({ post }: { post: PublishedPost }) {
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const body = lang === 'es' ? post.body_es : post.body_en

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500">
          {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <LanguageToggle onChange={setLang} />
      </div>
      <h1 className="text-3xl font-bold mb-8">{post.title}</h1>
      <div className="prose max-w-none whitespace-pre-wrap text-gray-800 leading-relaxed">
        {body}
      </div>
    </div>
  )
}
