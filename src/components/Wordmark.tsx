type Props = { variant?: 'light' | 'dark'; className?: string }

/** light = cream/white mark (on dark UI); dark = ink mark (on cream UI) */
export function Wordmark({ variant = 'light', className = '' }: Props) {
  const src =
    variant === 'dark'
      ? '/brand/USKODX_Wordmark_Dark.svg'
      : '/brand/USKODX_Wordmark_Light.svg'
  return (
    <img
      className={`wordmark wordmark--${variant} ${className}`.trim()}
      src={src}
      alt="USKODX"
      width={140}
      height={28}
      decoding="async"
    />
  )
}
