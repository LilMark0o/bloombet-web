import { createServerClient } from '@/lib/supabase'
import { PostCard } from '@/components/PostCard'
import { SubscribeForm } from '@/components/SubscribeForm'
import type { PublishedPost } from '@/lib/types'

export default async function Home() {
  const supabase = createServerClient()
  const { data: posts } = await supabase
    .from('published_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(20)

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3">BloomBet</h1>
        <p className="text-gray-600">Bloomberg for prediction markets. Deep analysis when the odds shift.</p>
      </div>

      <div className="mb-10">
        <SubscribeForm />
      </div>

      <div className="space-y-4">
        {(posts as PublishedPost[] ?? []).map(post => (
          <PostCard key={post.id} post={post} lang="en" />
        ))}
        {!posts?.length && (
          <p className="text-center text-gray-400 py-12">First analysis coming soon.</p>
        )}
      </div>
    </main>
  )
}
