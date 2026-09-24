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

type Rgb = { r: number; g: number; b: number }

function parseColor(color: string): (Rgb & { a: number }) | null {
  const m = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)/)
  if (!m) return null
  let a = 1
  if (m[4] != null) a = m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])
  return { r: parseFloat(m[1]), g: parseFloat(m[2]), b: parseFloat(m[3]), a }
}

function luminanceOf(rgb: Rgb): number {
  const lin = (channel: number) => {
    const c = channel / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(rgb.r) + 0.7152 * lin(rgb.g) + 0.0722 * lin(rgb.b)
}

function imageRgb(img: HTMLImageElement, x: number, y: number): Rgb | null {
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
    return { r, g, b }
  } catch {
    return null
  }
}

function surfaceRgb(x: number, y: number, nav: HTMLElement): Rgb | null {
  const stack = document.elementsFromPoint(x, y)
  for (const node of stack) {
    if (!(node instanceof Element)) continue
    if (node === nav || nav.contains(node)) continue
    if (node instanceof HTMLImageElement) {
      const rgb = imageRgb(node, x, y)
      if (rgb) return rgb
      continue
    }
    const parsed = parseColor(getComputedStyle(node).backgroundColor)
    if (!parsed || parsed.a < 0.45) continue
    return parsed
  }
  return null
}

function surfaceIsDark(x: number, y: number, nav: HTMLElement): boolean {
  const rgb = surfaceRgb(x, y, nav)
  return rgb != null && luminanceOf(rgb) < DARK_LUMINANCE
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
    let veilRgb = ''

    const read = () => {
      frame = 0
      const y = window.scrollY || document.documentElement.scrollTop || 0
      const opacity = open ? 0 : Math.max(0, Math.min(1, (y - SCROLL_START) / SCROLL_RANGE))
      document.documentElement.style.setProperty('--nav-veil-opacity', String(opacity))

      const navRect = nav.getBoundingClientRect()
      const veilSample = surfaceRgb(
        window.innerWidth / 2,
        Math.min(window.innerHeight - 1, navRect.bottom + 6),
        nav,
      )
      if (veilSample) {
        const next = `${Math.round(veilSample.r)} ${Math.round(veilSample.g)} ${Math.round(veilSample.b)}`
        if (next !== veilRgb) {
          veilRgb = next
          document.documentElement.style.setProperty('--nav-veil-rgb', next)
        }
      }

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
