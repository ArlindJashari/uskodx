import { Iso } from './Iso'

const ROWS = [
  { tag: 'In progress', title: 'Platform foundations', body: 'A long-running platform rebuilt around clear seams — services, contracts and deployment paths a team can reason about. Shipping spring 2026.', img: '/images/F3.webp', iso: 1 as const },
  { tag: 'In progress', title: 'Network fabric', body: 'Routing, observability and failure domains designed together, so growth deepens the weave instead of pulling it apart.', img: '/images/F4.webp', iso: 2 as const },
  { tag: null, title: 'Integration layer', body: 'One deliberate junction per system. Typed contracts, replayable events and no hidden coupling between teams.', img: '/images/F2.webp', iso: 3 as const },
  { tag: null, title: 'Design system', body: 'A component library that carries the brand and the accessibility rules at once, so product teams stop re-deciding the basics.', img: '/images/F5.webp', iso: 4 as const },
  { tag: null, title: 'Observability', body: 'Instrumentation shaped around the questions people actually ask at 3am, not around the metrics that were easy to emit.', img: '/images/F6.webp', iso: 5 as const },
  { tag: null, title: 'Reliability practice', body: 'Error budgets, rehearsed failure and written decisions — the habits that keep a system calm once we hand it over.', img: '/images/F7.webp', iso: 6 as const },
]

export function PracticeIndex() {
  return (
    <section className="index" id="process">
      <div className="index__head">
        <h2 className="t-h2">Practice</h2>
        <p className="index__lede t-lg">
          A selection of the work we are in the middle of — platform, network and product
          systems, built with the same grammar: clear seams, written decisions, room to grow.
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
              {r.tag ? <span className="index-row__tag t-sm">{r.tag}</span> : null}
              <h3 className="t-h2">{r.title}</h3>
              <p className="t-sm">{r.body}</p>
              <a className="index-row__link t-sm" href="#contact">
                View practice <span aria-hidden="true">&#8594;</span>
              </a>
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
