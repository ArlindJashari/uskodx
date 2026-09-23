import { Wordmark } from './Wordmark'

type Props = { onToggle: () => void; open: boolean }

export function Nav({ onToggle, open }: Props) {
  return (
    <header className={`nav ${open ? 'nav--open' : ''}`}>
      <a className="nav__brand" href="#top" aria-label="USKODX — home">
        <Wordmark variant={open ? 'light' : 'dark'} />
      </a>
      <button
        type="button"
        className={`nav__btn ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="nav__bars" aria-hidden="true"><i /><i /></span>
      </button>
    </header>
  )
}
