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

/** Footer photographs. The review asks for a zoom that reveals the data; no roster was supplied. */
export const TEAM_SHOTS = [
  {
    img: '/images/F3.webp',
    title: 'Software',
    detail: 'Custom software development, web and mobile applications, APIs, modernization, maintenance and QA.',
  },
  {
    img: '/images/F5.webp',
    title: 'Networks',
    detail: 'Network modernization, identity and access, zero-trust implementation and secure infrastructure operations.',
  },
  {
    img: '/images/F2.webp',
    title: 'Cloud',
    detail: 'Cloud migration and deployment, infrastructure design, DevOps, containerization and cloud monitoring.',
  },
  {
    img: '/images/F6.webp',
    title: 'Security',
    detail: 'Cloud and network security support, monitoring and incident response, and secure operations.',
  },
  {
    img: '/images/F4.webp',
    title: 'Operations',
    detail: 'Ongoing technical operations, systems administration, troubleshooting and flexible managed-service support.',
  },
] as const
