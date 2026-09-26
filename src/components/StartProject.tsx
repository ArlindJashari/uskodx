import { useEffect, useId, useRef, useState } from 'react'
import { INFO_EMAIL, SERVICES } from './site'

type Draft = {
  need: string
  field: string
  project: string
  first: string
  last: string
  company: string
  email: string
  phone: string
}

const EMPTY: Draft = {
  need: '',
  field: '',
  project: '',
  first: '',
  last: '',
  company: '',
  email: '',
  phone: '',
}

function fieldsFor(need: string) {
  return SERVICES.find((s) => s.title === need)?.items ?? []
}

function validStep(step: number, draft: Draft) {
  if (step === 1) return Boolean(draft.need && draft.field)
  if (step === 2) return draft.project.trim().length > 0
  return (
    draft.first.trim() &&
    draft.last.trim() &&
    draft.company.trim() &&
    /^\S+@\S+\.\S+$/.test(draft.email.trim()) &&
    draft.phone.trim().length > 0
  )
}

function briefMailto(draft: Draft) {
  const body = [
    `Need: ${draft.need}`,
    `Field: ${draft.field}`,
    '',
    draft.project.trim(),
    '',
    `${draft.first.trim()} ${draft.last.trim()}`,
    draft.company.trim(),
    draft.email.trim(),
    draft.phone.trim(),
  ].join('\n')
  return `mailto:${INFO_EMAIL}?subject=${encodeURIComponent('Start a project')}&body=${encodeURIComponent(body)}`
}

export function StartProject() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const errorId = useId()
  const [step, setStep] = useState(1)
  const [draft, setDraft] = useState<Draft>(EMPTY)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const reset = () => {
    setStep(1)
    setDraft(EMPTY)
    setError('')
    setSent(false)
  }

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const open = () => {
      reset()
      if (!dialog.open) dialog.showModal()
    }

    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-start]')
      if (!trigger) return
      event.preventDefault()
      open()
    }

    const onClose = () => reset()
    document.addEventListener('click', onClick)
    dialog.addEventListener('close', onClose)
    return () => {
      document.removeEventListener('click', onClick)
      dialog.removeEventListener('close', onClose)
    }
  }, [])

  const set = (key: keyof Draft, value: string) => {
    setDraft((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'need') next.field = ''
      return next
    })
    setError('')
  }

  const goNext = () => {
    if (!validStep(step, draft)) {
      setError(step === 1
        ? 'Choose the need and the field.'
        : step === 2
          ? 'Describe the project in a few sentences.'
          : 'Add your name, company, email and contact number.')
      return
    }
    setError('')
    if (step < 3) setStep((n) => n + 1)
    else setSent(true)
  }

  const options = fieldsFor(draft.need)

  return (
    <dialog
      ref={dialogRef}
      className="brief"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close()
      }}
    >
      <form
        className="brief__panel"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          goNext()
        }}
      >
        <div className="brief__bar">
          <p className="t-label t-label--med" id={titleId}>Start a project</p>
          <button type="button" className="brief__close" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </div>

        {sent ? (
          <div className="brief__done">
            <h2 className="t-h2">Brief ready.</h2>
            <p className="t-lg">
              {draft.first.trim()}, we have your note for {draft.field.toLowerCase()}. Send it to the studio desk to continue.
            </p>
            <a className="pill pill--solid" href={briefMailto(draft)}>Email this brief</a>
          </div>
        ) : (
          <>
            <ol className="brief__steps" aria-label="Form progress">
              {['Need and field', 'The project', 'Your details'].map((label, index) => (
                <li key={label} className={step === index + 1 ? 'is-current' : step > index + 1 ? 'is-done' : ''}>
                  <span>0{index + 1}</span>
                  {label}
                </li>
              ))}
            </ol>

            {step === 1 && (
              <fieldset className="brief__fields">
                <legend className="t-lg t-lg--med">Choose the need and the field.</legend>
                <label className="brief__field">
                  <span className="t-label">Need</span>
                  <select value={draft.need} onChange={(e) => set('need', e.target.value)} required>
                    <option value="">Select a need</option>
                    {SERVICES.map((service) => (
                      <option key={service.title} value={service.title}>{service.title}</option>
                    ))}
                  </select>
                </label>
                <label className="brief__field">
                  <span className="t-label">Field</span>
                  <select
                    value={draft.field}
                    onChange={(e) => set('field', e.target.value)}
                    disabled={!draft.need}
                    required
                  >
                    <option value="">{draft.need ? 'Select a field' : 'Choose a need first'}</option>
                    {options.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="brief__fields">
                <legend className="t-lg t-lg--med">Describe the project briefly.</legend>
                <label className="brief__field">
                  <span className="t-label">Project</span>
                  <textarea
                    value={draft.project}
                    onChange={(e) => set('project', e.target.value)}
                    rows={6}
                    required
                    placeholder="What needs to be built, connected or supported?"
                  />
                </label>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className="brief__fields">
                <legend className="t-lg t-lg--med">Your details.</legend>
                <div className="brief__pair">
                  <label className="brief__field">
                    <span className="t-label">First name</span>
                    <input value={draft.first} onChange={(e) => set('first', e.target.value)} autoComplete="given-name" required />
                  </label>
                  <label className="brief__field">
                    <span className="t-label">Last name</span>
                    <input value={draft.last} onChange={(e) => set('last', e.target.value)} autoComplete="family-name" required />
                  </label>
                </div>
                <label className="brief__field">
                  <span className="t-label">Company</span>
                  <input value={draft.company} onChange={(e) => set('company', e.target.value)} autoComplete="organization" required />
                </label>
                <div className="brief__pair">
                  <label className="brief__field">
                    <span className="t-label">Email</span>
                    <input type="email" value={draft.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" required />
                  </label>
                  <label className="brief__field">
                    <span className="t-label">Contact</span>
                    <input type="tel" value={draft.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" required />
                  </label>
                </div>
              </fieldset>
            )}

            {error ? <p className="brief__error" id={errorId} role="alert">{error}</p> : null}

            <div className="brief__actions">
              {step > 1 ? (
                <button type="button" className="pill pill--outline" onClick={() => { setError(''); setStep((n) => n - 1) }}>
                  Back
                </button>
              ) : <span />}
              <button type="submit" className="pill pill--solid">
                {step === 3 ? 'Review brief' : 'Continue'}
              </button>
            </div>
          </>
        )}
      </form>
    </dialog>
  )
}
