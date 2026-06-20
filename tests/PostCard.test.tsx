import { render, screen } from '@testing-library/react'
import { PostCard } from '../components/PostCard'
import { describe, it, expect } from 'vitest'

describe('PostCard', () => {
  it('renders post title and date', () => {
    render(
      <PostCard
        post={{
          id: '1',
          draft_id: 'd1',
          title: 'OpenAI IPO Drops 40%',
          body_en: 'Analysis here with enough text to show excerpt.',
          body_es: 'Analisis aqui con suficiente texto para el extracto.',
          published_at: '2026-06-19T12:00:00Z',
          market_id: 'm1',
        }}
        lang="en"
      />
    )
    expect(screen.getByText('OpenAI IPO Drops 40%')).toBeInTheDocument()
  })
})
