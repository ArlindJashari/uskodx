import { useLayoutEffect, useRef } from 'react'
import { Wordmark } from './Wordmark'

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
        <Wordmark />
      </a>
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
