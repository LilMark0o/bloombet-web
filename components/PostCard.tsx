import Link from 'next/link'
import type { PublishedPost } from '@/lib/types'

interface Props {
  post: PublishedPost
  lang: 'en' | 'es'
}

export function PostCard({ post, lang }: Props) {
  const body = lang === 'es' ? post.body_es : post.body_en
  const excerpt = body.slice(0, 160) + '...'
  const date = new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <Link href={`/post/${post.id}`} className="block border border-gray-200 rounded-lg p-6 hover:border-gray-400 transition-colors">
      <p className="text-xs text-gray-500 mb-2">{date}</p>
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 text-sm leading-relaxed">{excerpt}</p>
    </Link>
  )
}
