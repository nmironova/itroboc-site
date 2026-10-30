import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Sector22 from './Sector22.tsx'

const isSector22 = window.location.pathname.replace(/\/$/, '') === '/x22-7f3c9a'

if (isSector22) {
  document.title = 'Sector 22 — Emergency Control Panel'
  const robots = document.createElement('meta')
  robots.name = 'robots'
  robots.content = 'noindex, nofollow, noarchive'
  document.head.append(robots)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isSector22 ? <Sector22 /> : <App />}
  </StrictMode>,
)
