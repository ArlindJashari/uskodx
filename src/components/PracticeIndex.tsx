import { Iso } from './Iso'
import { PROCESS } from './site'

export function PracticeIndex() {
  return (
    <section className="index" id="process">
      <div className="index__head">
        <h2 className="t-h2">From vision to system</h2>
        <p className="index__lede t-lg">
          The steps USKODX follows to go from the first understanding of a problem
          to a system that is built, running and ready to grow.
        </p>
      </div>

      <div className="index__rows">
        {PROCESS.map((r) => (
          <article key={r.title} className="index-row" data-iso-row>
            <div className="index-row__figure">
              <Iso variant={r.iso} className="index-row__iso" />
              <span className="index-row__no t-sm" aria-hidden="true">{r.n}</span>
            </div>
            <div className="index-row__copy">
              <h3 className="t-h2">{r.title}</h3>
              <p className="t-sm">{r.body}</p>
            </div>
            <figure className="index-row__media">
              <img src={r.img} alt="" />
              <ol className="step-on-photo">
                {PROCESS.map((step) => (
                  <li key={step.title} className={step.title === r.title ? 'is-current' : ''}>
                    {step.title}
                  </li>
                ))}
              </ol>
            </figure>
          </article>
        ))}
      </div>
    </section>
  )
}
