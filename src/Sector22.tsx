import { useRef, useState } from 'react'
import './Sector22.css'

// Replace this with the topic subscribed to in the Android ntfy app.
const NTFY_TOPIC = 'halloween-zombie-7f3c9a82-manticora-2026'
const ROUTE_IMAGE_BASE = 'https://itroboc.com/sector22/routes'
const ROUTE_COUNT = 57

const equipmentMessage = 'ВНИМАНИЕ. ОБНАРУЖЕН АВАРИЙНЫЙ КОМПЛЕКТ.\nВ указанной зоне находится оборудование, необходимое для восстановления системы.\nОсмотрите территорию. Найдите оборудование.'
const markingMessage = 'ОБНАРУЖЕНА СЛУЖЕБНАЯ МАРКИРОВКА.\nВ указанной зоне присутствуют скрытые технические обозначения.'
const routeInstructions: Record<string, string> = {
  '15': equipmentMessage,
  '23': equipmentMessage,
  '35': equipmentMessage,
  '46': equipmentMessage,
  '47': equipmentMessage,
  '09': markingMessage,
  '18': markingMessage,
  '31': markingMessage,
  '40': markingMessage,
}

type Transmission = {
  title: string
  message: string
  priority: 'max' | 'high' | 'default'
  attach?: string
}

const alerts: Transmission[] = [
  { title: 'ZOMBIES ARE COMING', message: 'Zombies are coming. Stay alert.', priority: 'max' },
  { title: 'INFECTED ACTIVITY DETECTED', message: 'Infected activity detected. Avoid contact.', priority: 'high' },
  { title: 'SAFE ZONE LOST', message: 'Safe zone lost. Await new instructions.', priority: 'max' },
  { title: 'MEDICAL ALERT', message: 'Medical alert. Check your team.', priority: 'max' },
  { title: 'EVACUATION POINT COMPROMISED', message: 'Evacuation point compromised. Await a new location.', priority: 'high' },
  { title: 'SAFE ROUTE UPDATED', message: 'Safe route updated. Stand by for route data.', priority: 'default' },
]

export default function Sector22() {
  const [custom, setCustom] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('AWAITING TRANSMISSION')
  const [result, setResult] = useState('idle')
  // A synchronous lock also catches taps before React renders disabled buttons.
  const locked = useRef(false)

  async function transmit(data: Transmission) {
    if (locked.current) return
    if (NTFY_TOPIC.startsWith('REPLACE_')) {
      setResult('failed')
      setStatus('✗ SET NTFY_TOPIC BEFORE TRANSMITTING')
      return
    }
    locked.current = true
    setBusy(true)
    setResult('sending')
    setStatus('TRANSMITTING...')
    try {
      const url = new URL(`https://ntfy.sh/${encodeURIComponent(NTFY_TOPIC)}/publish`)
      Object.entries(data).forEach(([key, value]) => url.searchParams.set(key, value))
      const response = await fetch(url, {
        cache: 'no-store',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const receipt = await response.json()
      if (receipt.event !== 'message') throw new Error('No publish receipt')
      setResult('sent')
      setStatus(`✓ TRANSMISSION SENT — ${data.attach ? `ROUTE ${data.attach.match(/route-(\d+)/)?.[1]}` : data.title}`)
    } catch {
      setResult('failed')
      setStatus('✗ TRANSMISSION FAILED — check connection and topic. If timed out, check the phone before retrying.')
    } finally {
      // A short cooldown also catches a second tap after a fast response.
      await new Promise(resolve => setTimeout(resolve, 2000))
      locked.current = false
      setBusy(false)
    }
  }

  return (
    <div className="sector22">
      <div className="s22-panel">
        <header>
          <p className="s22-kicker">HALLOWEEN QUEST / COMMAND TERMINAL</p>
          <h1>SECTOR <span>22</span></h1>
          <p>EMERGENCY CONTROL PANEL</p>
          <p className="s22-topic">NTFY TOPIC: {NTFY_TOPIC}</p>
        </header>
        <div className={`s22-status s22-${result}`} role="status" aria-live="polite" aria-atomic="true">{status}</div>
        <section aria-labelledby="s22-alerts">
          <h2 id="s22-alerts">01 / EMERGENCY MESSAGES</h2>
          <div className="s22-alerts">
            {alerts.map(alert => (
              <button key={alert.title} disabled={busy} onClick={() => void transmit(alert)}>
                {alert.title}<small>{alert.priority} priority</small>
              </button>
            ))}
          </div>
          <form onSubmit={event => {
            event.preventDefault()
            if (custom.trim()) void transmit({ title: 'SECTOR 22 / COMMAND', message: custom.trim(), priority: 'default' })
          }}>
            <label htmlFor="s22-custom">CUSTOM MESSAGE</label>
            <textarea id="s22-custom" value={custom} onChange={event => setCustom(event.target.value)} maxLength={1000} rows={3} placeholder="Enter field instructions…" />
            <button className="s22-transmit" type="submit" disabled={busy || !custom.trim()}>TRANSMIT</button>
          </form>
        </section>
        <section aria-labelledby="s22-routes">
          <h2 id="s22-routes">02 / ROUTE TRANSMISSIONS</h2>
          <p className="s22-hint">Tap a route to send its photograph.</p>
          <div className="s22-routes">
            {Array.from({ length: ROUTE_COUNT }, (_, i) => String(i + 1).padStart(2, '0')).map(route => (
              <button key={route} disabled={busy} aria-label={`Transmit route ${route}`} onClick={() => void transmit({
                title: '📡 ROUTE DATA RECEIVED',
                message: `Proceed to the location shown.${routeInstructions[route] ? `\n\n${routeInstructions[route]}` : ''}`,
                priority: 'high',
                attach: `${ROUTE_IMAGE_BASE}/route-${route}.jpg`,
              })}>
                <img src={`/sector22/routes/route-${route}.jpg`} alt="" loading="lazy" decoding="async" />
                <span>{route}</span>
              </button>
            ))}
          </div>
        </section>
        <footer>SECTOR 22 / FAMILY QUEST OPERATIONS</footer>
      </div>
    </div>
  )
}
