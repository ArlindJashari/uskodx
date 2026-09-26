import { Iso } from './Iso'

const ROWS = [
  { title: 'Discover', body: 'We start by understanding the business, the problem and the systems already in place. This gives the project a clear direction before any technical work begins.', img: '/images/F3.webp', iso: 1 as const },
  { title: 'Architect', body: 'We map the structure of the solution before development starts. Every component, integration, and workflow is planned with a clear role.', img: '/images/F2.webp', iso: 2 as const },
  { title: 'Build', body: 'We turn the plan into working software, networks and connected systems. The focus is on precision, performance, and long-term usability.', img: '/images/F6.webp', iso: 3 as const },
  { title: 'Scale', body: 'We refine, support, and strengthen the system after launch. This helps it grow with the business without losing stability.', img: '/images/F4.webp', iso: 4 as const },
]

export function PracticeIndex() {
  return (
    <section className="index" id="process">
      <div className="index__head">
        <h2 className="t-h2">From vision to system</h2>
        <p className="index__lede t-lg">
          The steps USKODX follows to reach the building of systems.
        </p>
      </div>

      <div className="index__rows">
        {ROWS.map((r, k) => (
          <article key={r.title} className="index-row" data-iso-row>
            <div className="index-row__figure">
              <Iso variant={r.iso} className="index-row__iso" />
              <span className="index-row__no t-sm" aria-hidden="true">
                {String(k + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="index-row__copy">
              <h3 className="t-h2">{r.title}</h3>
              <p className="t-sm">{r.body}</p>
            </div>
            <figure className="index-row__media">
              <img src={r.img} alt="" />
            </figure>
          </article>
        ))}
      </div>
    </section>
  )
}
