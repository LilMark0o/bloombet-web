'use client'
import { useState, useEffect } from 'react'

interface Props {
  onChange: (lang: 'en' | 'es') => void
}

export function LanguageToggle({ onChange }: Props) {
  const [lang, setLang] = useState<'en' | 'es'>('en')

  useEffect(() => {
    const saved = localStorage.getItem('bb-lang') as 'en' | 'es' | null
    if (saved) { setLang(saved); onChange(saved) }
  }, [])

  const toggle = () => {
    const next = lang === 'en' ? 'es' : 'en'
    setLang(next)
    localStorage.setItem('bb-lang', next)
    onChange(next)
  }

  return (
    <button onClick={toggle} className="text-sm font-medium px-3 py-1 border rounded-full hover:bg-gray-100">
      {lang === 'en' ? 'ES' : 'EN'}
    </button>
  )
}
