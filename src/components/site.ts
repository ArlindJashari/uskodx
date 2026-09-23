export const TONES = ['lime', 'ink', 'gray', 'cream'] as const
export type Tone = (typeof TONES)[number]

export const NAV = [
  { href: '#capability', label: 'Capability' },
  { href: '#practice', label: 'Practice' },
  { href: '#contact', label: 'Get in touch' },
]

export const CONTACTS = [
  { org: 'New business', name: 'Studio desk', email: 'hello@uskodx.com', phone: '+31 (0)6 3085 0119' },
  { org: 'Partnerships', name: 'Network desk', email: 'partners@uskodx.com', phone: '+31 (0)6 5192 6649' },
]

export const ADDRESS = ['USKODX', 'Lorem ipsum 12', '0000 AB']
