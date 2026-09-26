const SHOTS = [
  { img: '/images/F1.webp', caption: 'Cloud & platform engineering' },
  { img: '/images/F3.webp', caption: 'Software & application engineering' },
  { img: '/images/F4.webp', caption: 'Cybersecurity & network operations' },
  { img: '/images/F2.webp', caption: 'Managed IT & technical support' },
  { img: '/images/F6.webp', caption: 'Cloud & platform engineering' },
  { img: '/images/F5.webp', caption: 'Software & application engineering' },
  { img: '/images/F7.webp', caption: 'Cybersecurity & network operations' },
  { img: '/images/F3.webp', caption: 'Managed IT & technical support' },
  { img: '/images/F4.webp', caption: 'Cloud & platform engineering' },
  { img: '/images/F1.webp', caption: 'Software & application engineering' },
]

const LIST = [
  { label: 'Cloud & platform engineering', tones: ['lime'] },
  { label: 'Software & application engineering', tones: ['lime'] },
  { label: 'Cybersecurity & network operations', tones: ['lime', 'ink', 'gray', 'cream'] },
  { label: 'Managed IT & technical support', tones: ['lime', 'ink', 'gray', 'cream'] },
] as const

const MARKETS = [
  'Cloud & digital infrastructure',
  'Cybersecurity',
  'Network modernization',
  'Software & application modernization',
  'DevOps',
  'Managed technical services',
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
            <p className="t-lg">Built to extend your technology team.</p>
            <p className="t-sm">
              Engineering connected systems. Technical capabilities across the platforms,
              applications and operations your organization depends on.
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
            <div className="cap__note">
              <p className="cap__note-label t-label t-label--med" id="cap-market">
                <i className="cap__note-mark" aria-hidden="true" />
                Market-aligned delivery
              </p>
              <ul className="cap__tags" aria-labelledby="cap-market">
                {MARKETS.map((item) => (
                  <li key={item} className="cap__tag">{item}</li>
                ))}
              </ul>
            </div>
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
