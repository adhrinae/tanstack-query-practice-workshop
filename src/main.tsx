import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.tsx'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    worker.start()
  }
}

const queryClient = new QueryClient()

enableMocking().then(() => ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
))
