import { createRoot } from 'react-dom/client'
import { PostHogErrorBoundary, PostHogProvider } from '@posthog/react'
import App from './App.tsx'
import './index.css'
import { initPostHog, posthog } from './lib/posthog'

initPostHog()

createRoot(document.getElementById('root')!).render(
  <PostHogProvider client={posthog}>
    <PostHogErrorBoundary>
      <App />
    </PostHogErrorBoundary>
  </PostHogProvider>
)
