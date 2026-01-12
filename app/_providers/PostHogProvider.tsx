// app/_providers/PostHogProvider.tsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect, Suspense } from 'react' // 💡 引入 Suspense
import PostHogPageView from './PostHogPageView'

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 💡 補上安全性檢查，確保只在瀏覽器端執行 init
    if (typeof window !== 'undefined') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: false 
      })
    }
  }, [])

  return (
    <PostHogProvider client={posthog}>
      {/* 💡 修正關鍵：用 Suspense 包裹 PostHogPageView */}
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PostHogProvider>
  )
}