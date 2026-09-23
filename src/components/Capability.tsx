const SHOTS = [
  { img: '/images/F1.webp', caption: 'Product surfaces' },
  { img: '/images/F3.webp', caption: 'Platform build' },
  { img: '/images/F4.webp', caption: 'Network fabric' },
  { img: '/images/F2.webp', caption: 'Interlaced structure' },
  { img: '/images/F6.webp', caption: 'Delivery rhythm' },
  { img: '/images/F5.webp', caption: 'Material detail' },
  { img: '/images/F7.webp', caption: 'Structural light' },
  { img: '/images/F3.webp', caption: 'Reliability' },
  { img: '/images/F4.webp', caption: 'Integrations' },
  { img: '/images/F1.webp', caption: 'Room to grow' },
]

const LIST = [
  { label: 'Discovery & strategy', tones: ['lime'] },
  { label: 'Product design', tones: ['lime'] },
  { label: 'Platform build', tones: ['lime'] },
  { label: 'Integrations', tones: ['lime', 'ink', 'gray', 'cream'] },
  { label: 'Data & networks', tones: ['lime', 'ink', 'gray', 'cream'] },
  { label: 'Cloud architecture', tones: ['lime', 'ink', 'gray', 'cream'] },
  { label: 'Reliability', tones: ['ink', 'gray', 'cream'] },
  { label: 'Support', tones: ['lime', 'ink', 'gray', 'cream'] },
] as const

export function Capability() {
  return (
    <section className="cap" id="capability">
      <div className="cap__intro">
        <hr className="cap__rule" />
        <h2 className="t-h2 mask-group">
          <span className="mask-line"><span className="mask-line__inner">Capability</span></span>
        </h2>
      </div>

      <div className="cap__body">
        <aside className="cap__rail">
          <div className="cap__rail-top">
            <p className="t-lg">The one with the range to carry your whole system, not just a slice of it.</p>
            <p className="t-sm">
              In addition, we build a strong practice around every engagement — shared
              rituals, written decisions and open instrumentation, so the teams we work
              with keep moving long after we hand over.
            </p>
          </div>
          <div className="cap__rail-bottom">
            <ul className="cap__list">
              {LIST.map((row, i) => (
                <li key={row.label} className={i === 0 ? 'is-active' : ''}>
                  <span className="t-sm">{row.label}</span>
                  <span className="cap__dots" aria-hidden="true">
                    {row.tones.map((t) => <i key={t} className={`dot dot--${t}`} />)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="cap__note t-sm">The colours indicate the strand of USKODX that carries each capability.</p>
          </div>
        </aside>

        <div className="cap__shots">
          {SHOTS.map((s, i) => (
            <figure key={`${s.caption}-${i}`} className="cap__shot">
              <img src={s.img} alt="" />
              <figcaption className="sr-only">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
