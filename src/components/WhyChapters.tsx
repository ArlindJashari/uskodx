const CHAPTERS = [
  {
    n: '1', tone: 'lime', title: 'We are precise',
    body: 'The one with foundations that hold under pressure. Calm interfaces, deliberate structure, and architecture designed for the people who depend on it every day.',
  },
  {
    n: '2', tone: 'ink', title: 'We are connected',
    body: 'At USKODX every system gets its own clear seam. Integrations, data flows and network design turn isolated strands into interlaced strength.',
  },
  {
    n: '3', tone: 'gray', title: 'We are sustainable',
    body: 'The one that is ready for what comes next. Efficient by default, our platforms flex to the changing needs of every team, with room left for growth.',
  },
  {
    n: '4', tone: 'cream', title: 'We have a lot of room',
    body: 'With platform surfaces built to carry real load, we create systems attractive to both product and infrastructure teams. Plus headroom to spare.',
  },
] as const

export function WhyChapters() {
  return (
    <section className="why">
      <div className="why__pin" data-why-pin>
        <div className="why__stack">
          {CHAPTERS.map((c) => (
            <article key={c.n} className={`why-panel why-panel--${c.tone}`} data-why-panel>
              <span className="why-panel__num" aria-hidden="true">{c.n}</span>
              <div className="why-panel__rail">
                <h3 className="t-lg t-lg--med">{c.title}</h3>
                <p className="t-lg">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
