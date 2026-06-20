import { createServerClient } from '@/lib/supabase'
import { PostContent } from '@/components/PostContent'
import { notFound } from 'next/navigation'
import type { PublishedPost } from '@/lib/types'

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createServerClient()
  const { data: post } = await supabase.from('published_posts').select('*').eq('id', id).single()
  if (!post) notFound()
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <PostContent post={post as PublishedPost} />
    </main>
  )
}
