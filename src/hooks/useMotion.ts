import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const desktopQuery = '(min-width: 1024px)'

export function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return
    // Native scroll on touch and below the desktop breakpoint. Lenis wheel
    // smoothing fights mobile address-bar resize and makes ScrollTrigger miss.
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const small = window.matchMedia('(max-width: 1023px)').matches
    if (coarse || small) return
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
    })
    lenis.on('scroll', ScrollTrigger.update)
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    document.documentElement.classList.add('lenis', 'lenis-smooth')
    const onResize = () => lenis.resize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(id)
      lenis.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])
}

export function useReveal(selector = '.reveal') {
  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>(selector)
    if (reduced()) { els.forEach((el) => el.classList.add('is-in')); return }
    const ts = els.map((el) =>
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => el.classList.add('is-in') }),
    )
    return () => ts.forEach((t) => t.kill())
  }, [selector])
}

export function useMaskLines(selector = '.mask-line') {
  useEffect(() => {
    const lines = gsap.utils.toArray<HTMLElement>(selector)
    const inners = lines
      .map((l) => l.querySelector<HTMLElement>('.mask-line__inner'))
      .filter((n): n is HTMLElement => Boolean(n))
    if (reduced()) { gsap.set(inners, { yPercent: 0 }); return }
    gsap.set(inners, { yPercent: 108 })

    const groups = new Map<Element, HTMLElement[]>()
    lines.forEach((line) => {
      const parent = line.closest('h1, h2, h3, .mask-group') ?? line.parentElement ?? line
      groups.set(parent, [...(groups.get(parent) ?? []), line])
    })

    const ts: ScrollTrigger[] = []
    groups.forEach((group, parent) => {
      const gi = group
        .map((l) => l.querySelector<HTMLElement>('.mask-line__inner'))
        .filter((n): n is HTMLElement => Boolean(n))
      const tween = gsap.to(gi, {
        yPercent: 0, duration: 1.05, ease: 'expo.out', stagger: 0.085, paused: true,
      })
      ts.push(ScrollTrigger.create({ trigger: parent, start: 'top 92%', once: true, onEnter: () => tween.play() }))
    })
    return () => ts.forEach((t) => t.kill())
  }, [selector])
}

function drawIso(row: HTMLElement, mode: 'pin' | 'play') {
  const svg = row.querySelector<SVGSVGElement>('[data-iso]')
  if (!svg) return
  const lns = gsap.utils.toArray<SVGPathElement>(svg.querySelectorAll('.iso__ln'))
  const fill = svg.querySelector<SVGPathElement>('.iso__fill')
  const nodes = gsap.utils.toArray<SVGCircleElement>(svg.querySelectorAll('.iso__node'))
  if (!lns.length) return

  try {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
    for (const el of [...lns, fill, ...nodes]) {
      if (!el) continue
      const bb = (el as SVGGraphicsElement).getBBox()
      if (!bb.width && !bb.height) continue
      x0 = Math.min(x0, bb.x); y0 = Math.min(y0, bb.y)
      x1 = Math.max(x1, bb.x + bb.width); y1 = Math.max(y1, bb.y + bb.height)
    }
    if (Number.isFinite(x0) && x1 > x0) {
      const pad = 7
      svg.setAttribute('viewBox', `${x0 - pad} ${y0 - pad} ${x1 - x0 + pad * 2} ${y1 - y0 + pad * 2}`)
    }
  } catch { /* getBBox is unavailable on a detached node — keep the authored viewBox */ }

  if (reduced()) {
    gsap.set(lns, { strokeDasharray: 'none', strokeDashoffset: 0 })
    gsap.set([fill, ...nodes].filter(Boolean), { opacity: 1, scale: 1 })
    return
  }

  lns.forEach((l) => {
    const len = l.getTotalLength() || 1
    gsap.set(l, { strokeDasharray: `${len} ${len + 2}`, strokeDashoffset: len })
  })
  if (fill) gsap.set(fill, { opacity: 0, scale: 0.55 })
  if (nodes.length) gsap.set(nodes, { opacity: 0, scale: 0 })

  const tl = gsap.timeline({
    paused: mode === 'play',
    scrollTrigger: mode === 'pin' ? {
      trigger: row,
      start: 'center center',
      end: '+=520',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.5,
      invalidateOnRefresh: true,
    } : undefined,
  })

  tl.to(lns, { strokeDashoffset: 0, duration: 1, ease: 'none', stagger: 0.16 })
  if (fill) tl.to(fill, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '>-0.3')
  if (nodes.length) tl.to(nodes, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.1 }, '<0.15')

  if (mode === 'play') {
    ScrollTrigger.create({
      trigger: row,
      start: 'top 82%',
      once: true,
      onEnter: () => tl.play(),
    })
  }
}

export function usePageMotion() {
  useEffect(() => {
    const isReduced = reduced()
    ScrollTrigger.config({ ignoreMobileResize: true })

    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {

      /* Desktop only: pinned chapter stack + scrubbed strips + pinned diagrams.
         Below 1024 the chapters use a CSS sticky stack (native touch scroll),
         strips drift on a view timeline, and the diagrams play once. */
      mm.add(desktopQuery, () => {
        const pin = document.querySelector<HTMLElement>('[data-why-pin]')
        const panels = gsap.utils.toArray<HTMLElement>('[data-why-panel]')

        if (pin && panels.length && !isReduced) {
          const strip = () => window.innerWidth * 0.0801 // 115.3px @1440
          const DWELL = 1
          const SLIDE = 0.222
          const LEAD = 0.017
          const TOTAL = 3.5

          panels.forEach((p, i) => {
            gsap.set(p, { zIndex: i + 1, xPercent: 0, x: i === 0 ? 0 : () => window.innerWidth })
          })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              start: 'top top',
              end: 'bottom bottom',
              pin: '.why__stack',
              pinSpacing: false,
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          })

          for (let i = 1; i < panels.length; i++) {
            const at = LEAD + (i - 1) * DWELL
            tl.fromTo(panels[i],
              { x: () => window.innerWidth },
              { x: () => i * strip(), duration: SLIDE, ease: 'power2.out' },
              at,
            )
            const drift = Math.max(0, (panels.length - 1 - i) * 10)
            if (drift) {
              tl.to(panels[i],
                { x: () => i * strip() - drift, duration: TOTAL - (at + SLIDE), ease: 'none' },
                at + SLIDE,
              )
            }
          }
          tl.to({}, { duration: TOTAL }, 0)
        }

        gsap.utils.toArray<HTMLElement>('[data-strip-track]').forEach((track, k) => {
          if (isReduced) return
          const dist = () => track.scrollWidth / 2
          gsap.fromTo(track,
            { x: k % 2 === 0 ? 0 : -dist() * 0.25 },
            {
              x: () => (k % 2 === 0 ? -dist() * 0.5 : -dist() * 0.75),
              ease: 'none',
              scrollTrigger: {
                trigger: track.parentElement ?? track,
                start: 'top bottom', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true,
              },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-iso-row]').forEach((row) => drawIso(row, 'pin'))
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.set('[data-why-panel]', { clearProps: 'transform,x,xPercent,zIndex' })
        gsap.utils.toArray<HTMLElement>('[data-iso-row]').forEach((row) => drawIso(row, 'play'))
      })

      /* capability list follows the shot column on every viewport */
      const shots = gsap.utils.toArray<HTMLElement>('.cap__shot')
      const rows = gsap.utils.toArray<HTMLElement>('.cap__list li')
      if (shots.length && rows.length && !isReduced) {
        shots.forEach((shot, i) => {
          ScrollTrigger.create({
            trigger: shot, start: 'top center', end: 'bottom center',
            onToggle: (self) => {
              if (!self.isActive) return
              rows.forEach((r, k) => r.classList.toggle('is-active', k === i % rows.length))
            },
          })
        })
      }
    })

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 220)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      window.clearTimeout(id)
      window.removeEventListener('load', onLoad)
      mm.revert()
      ctx.revert()
    }
  }, [])
}
