import { useEffect, useState } from 'react'

const PLACES = [
  { tz: 'Europe/Belgrade', city: 'Prishtina', country: 'Kosovo' },
  { tz: 'Europe/Zurich', city: 'Lorem', country: 'Ipsum' },
]

function stamp(tz: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz, timeZoneName: 'short',
  }).format(new Date())
}

export function LocaleStrip() {
  const [now, setNow] = useState(() => PLACES.map((p) => stamp(p.tz)))

  useEffect(() => {
    const id = window.setInterval(() => setNow(PLACES.map((p) => stamp(p.tz))), 15000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="locale">
      {PLACES.map((p, i) => (
        <div key={p.city} className="locale__cell">
          <span className="locale__dot" aria-hidden="true" />
          <span className="locale__stack t-sm">
            <b>{now[i]}</b>
            {p.city}
            <i>{p.country}</i>
          </span>
        </div>
      ))}
    </div>
  )
}
