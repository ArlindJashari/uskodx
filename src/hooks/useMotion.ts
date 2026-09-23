import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    document.documentElement.classList.add('lenis', 'lenis-smooth')
    return () => {
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

export function usePageMotion() {
  useEffect(() => {
    const isReduced = reduced()

    const ctx = gsap.context(() => {
      /* ---------------- WHY: pinned 4-panel horizontal stack -----------------
         Reference cadence @1440x900: pin runs ~3115px (3.46 viewports).
         Panel 2 slides in over scroll 15-215px into the pin, panel 3 over
         915-1115, panel 4 over 1815-2015 — i.e. one viewport of dwell between
         arrivals and a ~200px slide, not a continuous scrub. Parked panels then
         creep left by a few px (115 -> 95, 231 -> 220) across the rest of the pin.
      --------------------------------------------------------------------- */
      const pin = document.querySelector<HTMLElement>('[data-why-pin]')
      const panels = gsap.utils.toArray<HTMLElement>('[data-why-panel]')
      const desktop = () => window.matchMedia('(min-width: 810px)').matches

      if (pin && panels.length && !isReduced && desktop()) {
        const strip = () => window.innerWidth * 0.0801 // 115.3px @1440
        const DWELL = 1        // one viewport of dwell between arrivals
        const SLIDE = 0.222    // ~200px of slide
        const LEAD = 0.017     // ~15px before the first slide starts
        const TOTAL = 3.5      // matches .why__pin height: 350vh

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
          // drift: 2nd panel loses ~20px, 3rd ~10px, last holds
          const drift = Math.max(0, (panels.length - 1 - i) * 10)
          if (drift) {
            tl.to(panels[i],
              { x: () => i * strip() - drift, duration: TOTAL - (at + SLIDE), ease: 'none' },
              at + SLIDE,
            )
          }
        }
        tl.to({}, { duration: TOTAL }, 0) // hold the timeline open to full length
      }

      /* ---------------- horizontal image strips ------------------------------ */
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

      /* ---------------- practice index: isometric diagrams draw on scroll -----
         Each row pins for ~520px. Over that pin the wireframe strokes draw in
         sequence, the brand-colour face floods once the outline closes, then the
         node dots pop. Scroll only continues after the drawing has finished.
      --------------------------------------------------------------------- */
      const isoRows = gsap.utils.toArray<HTMLElement>('[data-iso-row]')
      isoRows.forEach((row) => {
        const svg = row.querySelector<SVGSVGElement>('[data-iso]')
        if (!svg) return
        const lns = gsap.utils.toArray<SVGPathElement>(svg.querySelectorAll('.iso__ln'))
        const fill = svg.querySelector<SVGPathElement>('.iso__fill')
        const nodes = gsap.utils.toArray<SVGCircleElement>(svg.querySelectorAll('.iso__node'))
        if (!lns.length) return

        // fit the viewBox to the drawing so every diagram sits optically centred
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

        if (isReduced) {
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

        const pinned = window.matchMedia('(min-width: 810px)').matches

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: pinned ? 'center center' : 'top 78%',
            end: pinned ? '+=520' : 'bottom 60%',
            pin: pinned,
            pinSpacing: pinned,
            anticipatePin: pinned ? 1 : 0,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })

        tl.to(lns, { strokeDashoffset: 0, duration: 1, ease: 'none', stagger: 0.16 })
        if (fill) tl.to(fill, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '>-0.3')
        if (nodes.length) tl.to(nodes, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.1 }, '<0.15')
      })

      /* ---------------- capability: list follows the shot column ------------- */
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
    return () => { window.clearTimeout(id); ctx.revert() }
  }, [])
}
