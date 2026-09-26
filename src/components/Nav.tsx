import { useLayoutEffect, useRef } from 'react'
import { NAV } from './site'
import { Symbol, Wordmark } from './Wordmark'

type Props = { onToggle: () => void; open: boolean }

/** Frost reaches full strength across this scroll distance, after the lead-in. */
const SCROLL_START = 162
const SCROLL_RANGE = 645

export function Nav({ onToggle, open }: Props) {
  const navRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return

    let frame = 0

    const read = () => {
      frame = 0
      const y = window.scrollY || document.documentElement.scrollTop || 0
      const opacity = open ? 0 : Math.max(0, Math.min(1, (y - SCROLL_START) / SCROLL_RANGE))
      document.documentElement.style.setProperty('--nav-veil-opacity', String(opacity))
      const foldEnd = Math.max(320, window.innerHeight * 0.85)
      const fold = open ? 0 : Math.max(0, Math.min(1, (y - 24) / (foldEnd - 24)))
      nav.style.setProperty('--brand-fold', fold.toFixed(4))
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [open])

  return (
    <header ref={navRef} className={open ? 'nav nav--open' : 'nav'}>
      <div className="nav__veil" aria-hidden="true" />
      <a className="nav__brand" href="#top" aria-label="USKODX — home">
        <span className="nav__symbol">
          <Symbol />
        </span>
        <span className="nav__word">
          <Wordmark />
        </span>
      </a>
      <nav className="nav__links" aria-label="Primary">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>
      <button
        type="button"
        className={`nav__btn ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="nav__bars" aria-hidden="true"><i /><i /></span>
      </button>
    </header>
  )
}
