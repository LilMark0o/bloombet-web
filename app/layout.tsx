import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BloomBet — Bloomberg for Prediction Markets',
  description: 'Deep analysis when prediction market probabilities shift dramatically.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b border-gray-200 px-4 py-3">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <a href="/" className="font-bold text-lg">BloomBet</a>
            <div className="flex gap-4 text-sm text-gray-600">
              <a href="https://t.me/bloombet" target="_blank" rel="noopener">Telegram</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-gray-200 mt-20 py-8 text-center text-xs text-gray-400">
          BloomBet — Prediction market intelligence. Not financial advice.
        </footer>
      </body>
    </html>
  )
}
