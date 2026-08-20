import { createRoot } from 'react-dom/client'
import { PostHogErrorBoundary, PostHogProvider } from '@posthog/react'
import App from './App.tsx'
import './index.css'
import { initPostHog, posthog } from './lib/posthog'

initPostHog();

createRoot(document.getElementById("root")!).render(
  <PostHogProvider client={posthog}>
    {/* Renders the app as-is on success; on a render crash it reports the
        exception to PostHog and falls through to the same blank shell React
        would have given us anyway. */}
    <PostHogErrorBoundary>
      <App />
    </PostHogErrorBoundary>
  </PostHogProvider>
);
