import { useEffect, useId, useRef, useState } from 'react'
import { Newsletter } from './Newsletter'
import { ADDRESS, CONTACTS, INFO_EMAIL, TEAM_SHOTS } from './site'

export function Footer() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [active, setActive] = useState<number | null>(null)
  const shot = active == null ? null : TEAM_SHOTS[active]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (shot && !dialog.open) dialog.showModal()
    if (!shot && dialog.open) dialog.close()
  }, [shot])

  return (
    <footer className="foot">
      <div className="foot__stage" data-foot-stage>
        <div className="foot__sticky">
          <span className="foot__giant" aria-hidden="true">USKODX</span>
        </div>
        <div className="foot__tiles">
          {TEAM_SHOTS.map((tile, index) => (
            <button
              key={tile.title}
              type="button"
              className={`foot__tile foot__tile--${index + 1}`}
              onClick={() => setActive(index)}
            >
              <span className={`foot__wash foot__wash--${['lime', 'gray', 'ink', 'cream', 'lime'][index]}`} />
              <img src={tile.img} alt="" />
              <span className="sr-only">{tile.title}. {tile.detail}</span>
            </button>
          ))}
        </div>
        <div className="foot__team" id="team">
          <h2 className="t-h2">Team</h2>
          <p className="t-sm">
            Select a photograph. It opens larger, with the discipline behind it.
          </p>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="shot"
        aria-labelledby={titleId}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close()
        }}
      >
        {shot ? (
          <div className="shot__panel">
            <figure className="shot__figure">
              <img src={shot.img} alt="" />
            </figure>
            <div className="shot__copy">
              <p className="t-label t-label--med">Team</p>
              <h2 className="t-h2" id={titleId}>{shot.title}</h2>
              <p className="t-lg">{shot.detail}</p>
              <button type="button" className="pill pill--solid" onClick={() => dialogRef.current?.close()}>
                Close
              </button>
            </div>
          </div>
        ) : null}
      </dialog>

      <Newsletter />

      <div className="foot__cols">
        <div className="foot__col">
          <p className="t-label t-label--med">Address</p>
          <p className="t-label">
            {ADDRESS.map((line, i) => (
              <span key={line}>{i > 0 && <br />}{line}</span>
            ))}
            <br />
            <a href={`mailto:${INFO_EMAIL}`}>{INFO_EMAIL}</a>
          </p>
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
