// app/_providers/PostHogProvider.tsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import PostHogPageView from './PostHogPageView' // 引入剛才寫的組件

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false // 因為我們有 PostHogPageView 手動抓取，這裡設 false
    })
  }, [])

  return (
    <PostHogProvider client={posthog}>
      <PostHogPageView /> {/* 放在這裡，保證只在客戶端運行 */}
      {children}
    </PostHogProvider>
  )
}