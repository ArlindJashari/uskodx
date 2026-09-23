import { Newsletter } from './Newsletter'
import { ADDRESS, CONTACTS } from './site'

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot__stage" data-foot-stage>
        <div className="foot__sticky">
          <span className="foot__giant" aria-hidden="true">USKODX</span>
        </div>
        <div className="foot__tiles" aria-hidden="true">
          <figure className="foot__tile foot__tile--1"><span className="foot__wash foot__wash--lime" /><img src="/images/F3.webp" alt="" /></figure>
          <figure className="foot__tile foot__tile--2"><span className="foot__wash foot__wash--gray" /><img src="/images/F5.webp" alt="" /></figure>
          <figure className="foot__tile foot__tile--3"><span className="foot__wash foot__wash--ink" /><img src="/images/F2.webp" alt="" /></figure>
          <figure className="foot__tile foot__tile--4"><span className="foot__wash foot__wash--cream" /><img src="/images/F6.webp" alt="" /></figure>
          <figure className="foot__tile foot__tile--5"><span className="foot__wash foot__wash--lime" /><img src="/images/F4.webp" alt="" /></figure>
        </div>
      </div>

      <Newsletter />

      <div className="foot__cols">
        <div className="foot__col">
          <p className="t-label t-label--med">Address</p>
          <p className="t-label">{ADDRESS[0]}<br />{ADDRESS[1]}<br />{ADDRESS[2]}</p>
        </div>
        {CONTACTS.map((c) => (
          <div key={c.email} className="foot__col">
            <p className="t-label t-label--med">{c.org}</p>
            <p className="t-label"><a href={`mailto:${c.email}`}>{c.email}</a><br />{c.phone}</p>
          </div>
        ))}
        <div className="foot__col">
          <p className="t-label t-label--med">Legal</p>
          <p className="t-label"><a href="#top">Privacy policy</a><br /><a href="#top">Cookies</a><br /><a href="#top">Terms of use</a></p>
        </div>
        <div className="foot__col">
          <p className="t-label t-label--med">Disclaimer</p>
          <p className="foot__disclaimer t-sm">
            Although the information on this website has been compiled with the greatest care, no
            rights can be derived from its contents. The published images provide inspiration for a
            possible delivery, but no guarantees are given for this.
          </p>
        </div>
      </div>
    </footer>
  )
}
