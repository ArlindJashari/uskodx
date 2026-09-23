const ITEMS = [
  { img: '/images/F3.webp', label: 'Platform build — squads and standards', tones: ['lime', 'ink', 'gray', 'cream'], top: 0 },
  { img: '/images/F5.webp', label: 'Design systems', tones: ['lime', 'ink', 'gray'], top: 56 },
  { img: '/images/F4.webp', label: 'Network fabric', tones: ['lime', 'ink', 'cream'], top: 12 },
  { img: '/images/F6.webp', label: 'Observability', tones: ['gray', 'ink', 'lime', 'cream'], top: 44 },
  { img: '/images/F7.webp', label: 'Reliability practice', tones: ['ink', 'lime', 'gray'], top: 0 },
  { img: '/images/F2.webp', label: 'Structural review', tones: ['lime', 'gray', 'cream'], top: 30 },
]

export function FacilityStrip() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <section className="fstrip" aria-label="Practice">
      <div className="fstrip__track" data-strip-track>
        {loop.map((it, i) => (
          <figure key={`${it.label}-${i}`} className="fstrip__item" style={{ marginTop: `${it.top}px` }}>
            <img src={it.img} alt="" />
            <figcaption className="fstrip__cap">
              <span className="fstrip__dots" aria-hidden="true">
                {it.tones.map((t) => <i key={t} className={`dot dot--${t}`} />)}
              </span>
              <span className="t-sm">{it.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
