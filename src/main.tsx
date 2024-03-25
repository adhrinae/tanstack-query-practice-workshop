import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.tsx'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    worker.start()
  }
}

enableMocking().then(() => ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
))
