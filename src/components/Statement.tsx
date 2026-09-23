import { useEffect, useState } from 'react'

/** Same cycle mechanic + layout as Hero — dark chapter variant. */
const WORDS = [
  'thriving',
  'precise',
  'connected',
  'ambitious',
  'curious',
  'original',
  'driven',
  'thriving',
] as const

export function Statement() {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setI((v) => (v + 1) % (WORDS.length - 1)), 1400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="hero hero--dark" aria-label="Studio statement">
      <h2 className="hero__display t-display">
        <span className="hero__l1">At the heart of</span>
        <span className="hero__l2">the</span>
      </h2>

      <div className="hero__cycle" aria-live="polite">
        <div className="hero__cycle-view">
          <div className="hero__cycle-track t-display" style={{ ['--i' as string]: i }}>
            {WORDS.map((w, k) => (
              <span key={`${w}-${k}`} className="hero__cycle-word">
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero__rail">
        <div className="hero__rail-inner">
          <p className="t-label t-label--med">lorem ipsum</p>
          <p className="t-label">
            Where engineering rigour seamlessly blends with considered design.
          </p>
          <p className="hero__rail-cta t-sm">
            Are you the one?
            <a className="pill pill--solid" href="#contact">
              Learn more
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
