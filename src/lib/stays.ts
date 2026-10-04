export type StayTier = {
  id: string
  label: { fr: string; en: string; es: string }
  price: number
}

export type StayPackage = {
  id: string
  photo: string
  occupancy: number
  days: Array<'friday' | 'saturday' | 'sunday'>
  name: { fr: string; en: string; es: string }
  summary: { fr: string; en: string; es: string }
  tiers: StayTier[]
}

export const stayPackages: StayPackage[] = [
  {
    id: 'two-bed',
    photo: '/examples/stays/two-bed.jpg?v=2',
    occupancy: 4,
    days: ['friday', 'saturday', 'sunday'],
    name: {
      fr: 'Appartement 2 chambres',
      en: '2-bedroom apartment',
      es: 'Apartamento 2 habitaciones',
    },
    summary: {
      fr: '4 personnes, 3 nuits au Palm Plaza Marrakech.',
      en: '4 people, 3 nights at Palm Plaza Marrakech.',
      es: '4 personas, 3 noches en el Palm Plaza Marrakech.',
    },
    tiers: [
      { id: 'early', label: { fr: 'Early bird', en: 'Early bird', es: 'Early bird' }, price: 259 },
      { id: 't1', label: { fr: 'Palier 1', en: 'Tier 1', es: 'Nivel 1' }, price: 299 },
      { id: 't2', label: { fr: 'Palier 2', en: 'Tier 2', es: 'Nivel 2' }, price: 314 },
      { id: 't3', label: { fr: 'Palier 3', en: 'Tier 3', es: 'Nivel 3' }, price: 329 },
      { id: 't4', label: { fr: 'Palier 4', en: 'Tier 4', es: 'Nivel 4' }, price: 344 },
    ],
  },
  {
    id: 'one-bed',
    photo: '/examples/stays/one-bed.jpg?v=2',
    occupancy: 2,
    days: ['friday', 'saturday', 'sunday'],
    name: {
      fr: 'Appartement 1 chambre',
      en: '1-bedroom apartment',
      es: 'Apartamento 1 habitación',
    },
    summary: {
      fr: '2 personnes, 3 nuits au Palm Plaza Marrakech.',
      en: '2 people, 3 nights at Palm Plaza Marrakech.',
      es: '2 personas, 3 noches en el Palm Plaza Marrakech.',
    },
    tiers: [
      { id: 'early', label: { fr: 'Early bird', en: 'Early bird', es: 'Early bird' }, price: 289 },
      { id: 't1', label: { fr: 'Palier 1', en: 'Tier 1', es: 'Nivel 1' }, price: 329 },
      { id: 't2', label: { fr: 'Palier 2', en: 'Tier 2', es: 'Nivel 2' }, price: 344 },
      { id: 't3', label: { fr: 'Palier 3', en: 'Tier 3', es: 'Nivel 3' }, price: 359 },
      { id: 't4', label: { fr: 'Palier 4', en: 'Tier 4', es: 'Nivel 4' }, price: 374 },
    ],
  },
  {
    id: 'double',
    photo: '/examples/stays/double.jpg?v=2',
    occupancy: 2,
    days: ['friday', 'saturday', 'sunday'],
    name: {
      fr: 'Chambre double',
      en: 'Double hotel room',
      es: 'Habitación doble',
    },
    summary: {
      fr: '2 personnes, 3 nuits au Palm Plaza Marrakech.',
      en: '2 people, 3 nights at Palm Plaza Marrakech.',
      es: '2 personas, 3 noches en el Palm Plaza Marrakech.',
    },
    tiers: [
      { id: 'early', label: { fr: 'Early bird', en: 'Early bird', es: 'Early bird' }, price: 364 },
      { id: 't1', label: { fr: 'Palier 1', en: 'Tier 1', es: 'Nivel 1' }, price: 379 },
      { id: 't2', label: { fr: 'Palier 2', en: 'Tier 2', es: 'Nivel 2' }, price: 389 },
      { id: 't3', label: { fr: 'Palier 3', en: 'Tier 3', es: 'Nivel 3' }, price: 399 },
      { id: 't4', label: { fr: 'Palier 4', en: 'Tier 4', es: 'Nivel 4' }, price: 409 },
    ],
  },
]

export const earlyBirdMaxSaving = Math.max(
  ...stayPackages.map((stay) => {
    const early = stay.tiers.find((tier) => tier.id === 'early')
    const tier1 = stay.tiers.find((tier) => tier.id === 't1')
    return early && tier1 ? tier1.price - early.price : 0
  }),
)

export const featuredArtists = [
  {
    id: 'kevin-y-lucia',
    name: 'Kevin y Lucia',
    slug: 'kevin-y-lucia',
    role: 'dancer' as const,
    photo: '/examples/artists/kevin-y-lucia.jpg',
  },
  {
    id: 'jordi-judith',
    name: 'Jordi & Judith',
    slug: 'jordi-judith',
    role: 'dancer' as const,
    photo: '/examples/artists/jordi-judith.jpg',
  },
]
