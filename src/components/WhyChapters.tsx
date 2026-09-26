import { SERVICES } from './site'

export function WhyChapters() {
  return (
    <section className="why" id="services">
      <div className="why__pin" data-why-pin>
        <div className="why__stack">
          {SERVICES.map((c) => (
            <article key={c.n} className={`why-panel why-panel--${c.tone}`} data-why-panel>
              <span className="why-panel__num" aria-hidden="true">{c.n}</span>
              <div className="why-panel__rail">
                <h3 className="t-lg t-lg--med">{c.title}</h3>
                <ul className="why-panel__list">
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
