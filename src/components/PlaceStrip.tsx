const ITEMS = [
  { img: '/images/F1.webp', label: 'Product surfaces', h: 230, top: 0 },
  { img: '/images/F2.webp', label: 'Interlaced structure', h: 232, top: 48 },
  { img: '/images/F3.webp', label: 'Custom software development', h: 195, top: 8 },
  { img: '/images/F4.webp', label: 'Network modernization', h: 218, top: 0 },
  { img: '/images/F5.webp', label: 'Cloud migration & deployment', h: 232, top: 44 },
  { img: '/images/F6.webp', label: 'Cloud and network security support', h: 205, top: 12 },
  { img: '/images/F7.webp', label: 'Monitoring and incident support', h: 228, top: 36 },
]

export function PlaceStrip() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <section className="strip" aria-label="Studio places">
      <div className="strip__track" data-strip-track>
        {loop.map((it, i) => (
          <figure key={`${it.label}-${i}`} className="strip__item" style={{ marginTop: `${it.top}px` }}>
            <img src={it.img} alt="" style={{ height: `${it.h}px` }} />
            <figcaption className="t-sm"><i className="strip__mark" aria-hidden="true" />{it.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
