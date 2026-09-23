import { useEffect } from 'react'
import { ADDRESS, CONTACTS, NAV } from './site'

type Props = { open: boolean; onClose: () => void }

export function MenuOverlay({ open, onClose }: Props) {
  useEffect(() => {
    document.documentElement.classList.toggle('menu-is-open', open)
    return () => document.documentElement.classList.remove('menu-is-open')
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const colA = NAV.slice(0, 3)
  const colB = NAV.slice(3)

  return (
    <div className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <nav className="menu__grid">
        <ul className="menu__col">
          {colA.map((l) => (
            <li key={l.href}><a href={l.href} onClick={onClose}>{l.label}</a></li>
          ))}
        </ul>
        <ul className="menu__col">
          {colB.map((l) => (
            <li key={l.href}><a href={l.href} onClick={onClose}>{l.label}</a></li>
          ))}
        </ul>
        <div className="menu__meta">
          <p className="t-label t-label--med">Address</p>
          <p className="t-label">{ADDRESS[1]}<br />{ADDRESS[2]}</p>
          {CONTACTS.map((c) => (
            <div key={c.email} className="menu__meta-block">
              <p className="t-label t-label--med">{c.org}</p>
              <p className="t-label"><a href={`mailto:${c.email}`}>{c.email}</a><br />{c.phone}</p>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}
