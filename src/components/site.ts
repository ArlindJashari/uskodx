export const TONES = ['lime', 'ink', 'gray', 'cream'] as const
export type Tone = (typeof TONES)[number]

export const NAV = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#capability', label: 'Capabilities' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
] as const

export const CONTACTS = [
  { org: 'New business', name: 'Studio desk', email: 'hello@uskodx.com', phone: '+31 (0)6 3085 0119' },
  { org: 'Partnerships', name: 'Network desk', email: 'partners@uskodx.com', phone: '+31 (0)6 5192 6649' },
]

export const INFO_EMAIL = 'info@uskodx.com'

export const ADDRESS = [
  'USKODX Corp',
  '1961 Commerce Street',
  'Yorktown Heights, NY 10598',
  'United States',
] as const

/** Chapter panels, in the order the review arrows assign them. */
export const SERVICES = [
  {
    n: '1',
    tone: 'lime',
    title: 'Software development',
    items: [
      'Custom software development',
      'Web & mobile applications',
      'API development & integration',
      'Application modernization',
      'Maintenance & support',
      'QA & testing',
    ],
  },
  {
    n: '2',
    tone: 'ink',
    title: 'Network engineering & infrastructure',
    items: [
      'Network modernization',
      'Cloud and network security support',
      'Identity & access implementation',
      'Monitoring and incident support',
      'Zero-trust implementation support',
      'Secure infrastructure operations',
    ],
  },
  {
    n: '3',
    tone: 'gray',
    title: 'Cybersecurity support',
    items: [
      'Ongoing technical operations',
      'Infrastructure and application support',
      'Network monitoring',
      'Systems administration',
      'Technical troubleshooting',
      'Flexible managed-service support',
    ],
  },
  {
    n: '4',
    tone: 'cream',
    title: 'Cloud & infrastructure',
    items: [
      'Cloud migration & deployment',
      'Infrastructure design & support',
      'DevOps & automation',
      'Containerization & orchestration',
      'Cloud monitoring & optimization',
      'Technical operations support',
    ],
  },
] as const

/** Placeholder portraits until the client sends real photographs. */
export const TEAM = [
  {
    name: 'Team member 01',
    role: 'Software engineering lead',
    bio: 'Leads custom software and application modernization, from architecture to release.',
    photo: '/team/team-1.webp',
  },
  {
    name: 'Team member 02',
    role: 'Cloud & infrastructure architect',
    bio: 'Designs cloud migrations, DevOps pipelines and resilient infrastructure.',
    photo: '/team/team-2.webp',
  },
  {
    name: 'Team member 03',
    role: 'Network & security engineer',
    bio: 'Runs network modernization, zero-trust and security operations support.',
    photo: '/team/team-3.webp',
  },
  {
    name: 'Team member 04',
    role: 'Delivery & managed services',
    bio: 'Keeps projects, dedicated teams and managed services moving on schedule.',
    photo: '/team/team-4.webp',
  },
] as const
