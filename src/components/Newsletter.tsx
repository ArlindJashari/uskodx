import { ADDRESS, CONTACTS } from './site'

export function Newsletter() {
  return (
    <section className="news" id="contact">
      <p className="news__head t-lg t-lg--med">Join our &lsquo;Fresh Systems&rsquo; letter</p>
      <div className="news__fields news__fields--contact">
        <div className="news__intro">
          <p className="t-lg t-lg--med">Are we the one?</p>
          <p className="t-lg">Then let&apos;s touch base offline. <span className="news__shake">Call us today, tomorrow, anytime.</span></p>
          <p className="news__place t-sm">{ADDRESS[1]}, {ADDRESS[2]}</p>
          <div id="start">
            <button type="button" className="pill pill--solid" data-start>Start a project</button>
          </div>
        </div>
        {CONTACTS.map((c) => (
          <div key={c.email} className="news__person">
            <p className="t-label t-label--med">{c.name}</p>
            <p className="t-label"><a href={`mailto:${c.email}`}>{c.email}</a></p>
            <p className="t-label">{c.phone}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
