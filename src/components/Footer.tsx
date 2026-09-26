import { useEffect, useId, useRef, useState } from 'react'
import { Newsletter } from './Newsletter'
import { ADDRESS, CONTACTS, INFO_EMAIL, TEAM } from './site'

const WASH = ['gray', 'ink', 'cream', 'lime'] as const

function finePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function placePopover(tile: HTMLElement) {
  const pop = tile.querySelector<HTMLElement>('.foot__pop')
  if (!pop) return
  const rect = tile.getBoundingClientRect()
  const stage = tile.closest('.foot__stage')?.getBoundingClientRect()
  const margin = 12
  const narrow = window.innerWidth < 1024
  const popW = Math.min(280, window.innerWidth - (narrow ? 32 : 48))
  const popH = Math.max(pop.offsetHeight, 160)
  const limitLeft = (stage?.left ?? margin) + 8
  const limitRight = (stage?.right ?? window.innerWidth - margin) - 8

  if (narrow) {
    const overflowRight = rect.left + popW > limitRight
    const placeAbove = rect.bottom + margin + popH > window.innerHeight - margin && rect.top > popH + margin
    pop.dataset.side = overflowRight ? 'left' : 'right'
    pop.dataset.valign = placeAbove ? 'above' : 'below'
    return
  }

  const spaceRight = limitRight - rect.right - 14
  const spaceLeft = rect.left - limitLeft - 14
  const placeLeft = spaceRight < popW && spaceLeft >= spaceRight
  const placeEnd = rect.top + popH > window.innerHeight - margin && rect.bottom > popH
  pop.dataset.side = placeLeft ? 'left' : 'right'
  pop.dataset.valign = placeEnd ? 'end' : 'start'
}

export function Footer() {
  const [open, setOpen] = useState<number | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const baseId = useId()

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (finePointer()) return
      const target = event.target as Element | null
      if (!target?.closest('.foot__tile')) setOpen(null)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  useEffect(() => {
    if (open == null) return
    const tile = stageRef.current?.querySelector<HTMLElement>(`[data-team="${open}"]`)
    if (tile) placePopover(tile)
    const onLayout = () => {
      const current = stageRef.current?.querySelector<HTMLElement>(`[data-team="${open}"]`)
      if (current) placePopover(current)
    }
    window.addEventListener('resize', onLayout)
    window.addEventListener('scroll', onLayout, { passive: true })
    return () => {
      window.removeEventListener('resize', onLayout)
      window.removeEventListener('scroll', onLayout)
    }
  }, [open])

  return (
    <footer className="foot">
      <div className="foot__stage" data-foot-stage ref={stageRef}>
        <div className="foot__sticky">
          <span className="foot__giant" aria-hidden="true">USKODX</span>
        </div>
        <div className="foot__tiles">
          {TEAM.map((person, index) => (
            <button
              key={person.name}
              type="button"
              data-team={index}
              className={`foot__tile foot__tile--${index + 1}${open === index ? ' is-open' : ''}`}
              aria-expanded={open === index}
              aria-controls={`${baseId}-pop-${index}`}
              onPointerEnter={(event) => {
                if (!finePointer() || event.pointerType !== 'mouse') return
                placePopover(event.currentTarget)
                setOpen(index)
              }}
              onPointerLeave={(event) => {
                if (!finePointer() || event.pointerType !== 'mouse') return
                setOpen((current) => (current === index ? null : current))
              }}
              onFocus={(event) => {
                if (!event.currentTarget.matches(':focus-visible')) return
                placePopover(event.currentTarget)
                setOpen(index)
              }}
              onBlur={() => setOpen((current) => (current === index ? null : current))}
              onClick={(event) => {
                if (finePointer() || event.detail === 0) {
                  event.preventDefault()
                  return
                }
                placePopover(event.currentTarget)
                setOpen((current) => (current === index ? null : index))
              }}
            >
              <span className={`foot__wash foot__wash--${WASH[index]}`} />
              <img src={person.photo} alt="" />
              <span className="sr-only">{person.name}, {person.role}. {person.bio}</span>
              <div className="foot__pop" id={`${baseId}-pop-${index}`} aria-hidden={open === index ? undefined : true}>
                <div className="foot__pop-meta">
                  <span className="foot__pop-index">{String(index + 1).padStart(2, '0')}/{String(TEAM.length).padStart(2, '0')}</span>
                  <span className="foot__pop-role">{person.role}</span>
                </div>
                <p className="foot__pop-name">{person.name}</p>
                <p className="foot__pop-bio">{person.bio}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="foot__team" id="team">
          <h2 className="t-h2">Team</h2>
          <p className="t-sm">
            <span className="foot__hint foot__hint--hover">Hover a portrait to meet the team.</span>
            <span className="foot__hint foot__hint--touch">Tap a portrait to meet the team.</span>
          </p>
        </div>
      </div>

      <Newsletter />

      <div className="foot__cols">
        <div className="foot__col">
          <p className="t-label t-label--med">Address</p>
          <p className="t-label">
            {ADDRESS.map((line, i) => (
              <span key={line}>{i > 0 && <br />}{line}</span>
            ))}
            <br />
            <a href={`mailto:${INFO_EMAIL}`}>{INFO_EMAIL}</a>
          </p>
        </div>
        {CONTACTS.map((c) => (
          <div key={c.email} className="foot__col">
            <p className="t-label t-label--med">{c.org}</p>
            <p className="t-label"><a href={`mailto:${c.email}`}>{c.email}</a><br />{c.phone}</p>
          </div>
        ))}
        <div className="foot__col">
          <p className="t-label t-label--med">Legal</p>
          <p className="t-label"><a href="#top">Privacy policy</a><br /><a href="#top">Cookies</a><br /><a href="#top">Terms of use</a></p>
        </div>
        <div className="foot__col">
          <p className="t-label t-label--med">Disclaimer</p>
          <p className="foot__disclaimer t-sm">
            Although the information on this website has been compiled with the greatest care, no
            rights can be derived from its contents. The published images provide inspiration for a
            possible delivery, but no guarantees are given for this.
          </p>
        </div>
      </div>
    </footer>
  )
}
