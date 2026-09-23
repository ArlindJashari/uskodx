import { useEffect, useState } from 'react'

const WORDS = ['Driven', 'Building', 'Connected', 'Precise', 'Scaling', 'Curious', 'Original', 'Ambitious', 'Driven']


export function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setI((v) => (v + 1) % (WORDS.length - 1)), 1400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="hero" id="top">
      <h1 className="hero__display t-display">
        <span className="hero__l1">For the one</span>
        <span className="hero__l2">that is</span>
      </h1>

      <div className="hero__cycle" aria-live="polite">
        <div className="hero__cycle-view">
          <div className="hero__cycle-track t-display" style={{ ['--i' as string]: i }}>
            {WORDS.map((w, k) => (
              <span key={`${w}-${k}`} className="hero__cycle-word">{w}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero__rail">
        <div className="hero__rail-inner">
          <p className="t-label t-label--med">Systems studio for software &amp; networks</p>
          <p className="t-label">Where engineering rigour seamlessly blends with considered design.</p>
          <p className="hero__rail-cta t-sm">
            Are you the one?
            <a className="pill pill--solid" href="#contact">Learn more</a>
          </p>
        </div>
      </div>
    </section>
  )
}
