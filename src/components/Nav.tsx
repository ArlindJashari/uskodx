import { useLayoutEffect, useRef, useState } from 'react'
import { Wordmark } from './Wordmark'

type Props = { onToggle: () => void; open: boolean }

/** Frost reaches full strength across this scroll distance, after the lead-in. */
const SCROLL_START = 162
const SCROLL_RANGE = 645
const DARK_LUMINANCE = 0.36

const sampleCanvas = typeof document !== 'undefined' ? document.createElement('canvas') : null
if (sampleCanvas) {
  sampleCanvas.width = 1
  sampleCanvas.height = 1
}

function opaqueLuminance(color: string): number | null {
  const m = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)/)
  if (!m) return null
  let alpha = 1
  if (m[4] != null) alpha = m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])
  if (alpha < 0.45) return null
  const lin = (channel: number) => {
    const c = channel / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  const r = lin(parseFloat(m[1]))
  const g = lin(parseFloat(m[2]))
  const b = lin(parseFloat(m[3]))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function imageIsDark(img: HTMLImageElement, x: number, y: number): boolean | null {
  if (!sampleCanvas || !img.complete || !img.naturalWidth) return null
  const rect = img.getBoundingClientRect()
  if (rect.width < 1 || rect.height < 1) return null
  const sx = Math.min(img.naturalWidth - 1, Math.max(0, ((x - rect.left) / rect.width) * img.naturalWidth))
  const sy = Math.min(img.naturalHeight - 1, Math.max(0, ((y - rect.top) / rect.height) * img.naturalHeight))
  const ctx = sampleCanvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null
  try {
    ctx.clearRect(0, 0, 1, 1)
    ctx.drawImage(img, sx, sy, 1, 1, 0, 0, 1, 1)
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
    if (a < 40) return null
    const lum = opaqueLuminance(`rgba(${r}, ${g}, ${b}, 1)`)
    return lum != null && lum < DARK_LUMINANCE
  } catch {
    return null
  }
}

function surfaceIsDark(x: number, y: number, nav: HTMLElement): boolean {
  const stack = document.elementsFromPoint(x, y)
  for (const node of stack) {
    if (!(node instanceof Element)) continue
    if (node === nav || nav.contains(node)) continue
    if (node instanceof HTMLImageElement) {
      const dark = imageIsDark(node, x, y)
      if (dark != null) return dark
      continue
    }
    const lum = opaqueLuminance(getComputedStyle(node).backgroundColor)
    if (lum == null) continue
    return lum < DARK_LUMINANCE
  }
  return false
}

function pointOf(el: Element) {
  const rect = el.getBoundingClientRect()
  return { x: rect.left + rect.width * 0.35, y: rect.top + rect.height * 0.5 }
}

export function Nav({ onToggle, open }: Props) {
  const navRef = useRef<HTMLElement>(null)
  const [onDark, setOnDark] = useState(false)
  const [btnOnDark, setBtnOnDark] = useState(false)

  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return

    let frame = 0
    let brandDark = false
    let buttonDark = false

    const read = () => {
      frame = 0
      const y = window.scrollY || document.documentElement.scrollTop || 0
      const opacity = open ? 0 : Math.max(0, Math.min(1, (y - SCROLL_START) / SCROLL_RANGE))
      document.documentElement.style.setProperty('--nav-veil-opacity', String(opacity))

      const brandEl = nav.querySelector('.nav__brand')
      const btnEl = nav.querySelector('.nav__btn')
      const brandPt = brandEl ? pointOf(brandEl) : null
      const btnPt = btnEl ? pointOf(btnEl) : null
      const nextBrand = open || (brandPt ? surfaceIsDark(brandPt.x, brandPt.y, nav) : false)
      const nextBtn = !open && btnPt ? surfaceIsDark(btnPt.x, btnPt.y, nav) : false
      if (nextBrand !== brandDark) {
        brandDark = nextBrand
        setOnDark(nextBrand)
      }
      if (nextBtn !== buttonDark) {
        buttonDark = nextBtn
        setBtnOnDark(nextBtn)
      }
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
    <header
      ref={navRef}
      className={[
        'nav',
        open ? 'nav--open' : '',
        onDark ? 'nav--on-dark' : '',
        btnOnDark ? 'nav--btn-on-dark' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="nav__veil" aria-hidden="true">
        <div className="nav__veil-fill" />
      </div>
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
