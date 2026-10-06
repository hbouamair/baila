export type StayTier = {
  id: string
  label: { fr: string; en: string; es: string }
  price: number
}

export type StayPackage = {
  id: string
  photo: string
  photoPosition?: string
  occupancy: number
  days: Array<'friday' | 'saturday' | 'sunday'>
  name: { fr: string; en: string; es: string }
  summary: { fr: string; en: string; es: string }
  tiers: StayTier[]
}

export const stayPackages: StayPackage[] = [
  {
    id: 'two-bed',
    photo: '/examples/stays/two-bed.jpg?v=3',
    photoPosition: 'center 68%',
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
    photo: '/examples/stays/one-bed.jpg?v=4',
    photoPosition: 'center 58%',
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
    photo: '/examples/stays/double.jpg?v=3',
    photoPosition: 'center 70%',
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
    id: 'leandro-y-jomante',
    name: 'Leandro y Jomante',
    slug: 'leandro-y-jomante',
    role: 'dancer' as const,
    photo: '/examples/artists/leandro-y-jomante.jpg?v=5',
  },
  {
    id: 'york-lisa',
    name: 'York & Lisa',
    slug: 'york-lisa',
    role: 'dancer' as const,
    photo: '/examples/artists/york-lisa.jpg?v=5',
  },
  {
    id: 'aitor-y-angelica',
    name: 'Aitor y Angelica',
    slug: 'aitor-y-angelica',
    role: 'dancer' as const,
    photo: '/examples/artists/aitor-y-angelica.jpg?v=5',
  },
  {
    id: 'victor-y-alba',
    name: 'Victor y Alba',
    slug: 'victor-y-alba',
    role: 'dancer' as const,
    photo: '/examples/artists/victor-y-alba.jpg?v=5',
  },
  {
    id: 'jerem-y-jade',
    name: 'Jerem y Jade',
    slug: 'jerem-y-jade',
    role: 'dancer' as const,
    photo: '/examples/artists/jerem-y-jade.jpg?v=5',
  },
  {
    id: 'giovana-y-rafael',
    name: 'Giovana y Rafael',
    slug: 'giovana-y-rafael',
    role: 'dancer' as const,
    photo: '/examples/artists/giovana-y-rafael.jpg?v=5',
  },
  {
    id: 'daimy-y-valeria',
    name: 'Daimy y Valeria',
    slug: 'daimy-y-valeria',
    role: 'dancer' as const,
    photo: '/examples/artists/daimy-y-valeria.jpg?v=5',
  },
  {
    id: 'smarty-y-mounia',
    name: 'Smarty y Mounia',
    slug: 'smarty-y-mounia',
    role: 'dancer' as const,
    photo: '/examples/artists/smarty-y-mounia.jpg?v=5',
  },
  {
    id: 'iman-y-nadina',
    name: 'Iman y Nadina',
    slug: 'iman-y-nadina',
    role: 'dancer' as const,
    photo: '/examples/artists/iman-y-nadina.jpg?v=5',
  },
  {
    id: 'sergio-y-sasha',
    name: 'Sergio y Sasha',
    slug: 'sergio-y-sasha',
    role: 'dancer' as const,
    photo: '/examples/artists/sergio-y-sasha.jpg?v=5',
  },
  {
    id: 'kevin-y-lucia',
    name: 'Kevin y Lucia',
    slug: 'kevin-y-lucia',
    role: 'dancer' as const,
    photo: '/examples/artists/kevin-y-lucia.jpg?v=5',
  },
  {
    id: 'habibi',
    name: 'Habibi',
    slug: 'habibi',
    role: 'dancer' as const,
    photo: '/examples/artists/habibi.jpg?v=5',
  },
  {
    id: 'jordi-judith',
    name: 'Jordi & Judith',
    slug: 'jordi-judith',
    role: 'dancer' as const,
    photo: '/examples/artists/jordi-judith.jpg?v=5',
  },
  {
    id: 'sara',
    name: 'Sara',
    slug: 'sara',
    role: 'dancer' as const,
    photo: '/examples/artists/sara.jpg?v=5',
  },
  {
    id: 'dj-chawkey',
    name: 'Chawkey',
    slug: 'dj-chawkey',
    role: 'dj' as const,
    photo: '/examples/artists/dj-chawkey.jpg?v=5',
  },
  {
    id: 'dj-togo',
    name: 'Togo',
    slug: 'dj-togo',
    role: 'dj' as const,
    photo: '/examples/artists/dj-togo.jpg?v=5',
  },
  {
    id: 'dj-york',
    name: 'York',
    slug: 'dj-york',
    role: 'dj' as const,
    photo: '/examples/artists/dj-york.jpg?v=5',
  },
  {
    id: 'dj-mr-t',
    name: 'Mr T',
    slug: 'dj-mr-t',
    role: 'dj' as const,
    photo: '/examples/artists/dj-mr-t.jpg?v=5',
  },
  {
    id: 'dj-one',
    name: 'One',
    slug: 'dj-one',
    role: 'dj' as const,
    photo: '/examples/artists/dj-one.jpg?v=5',
  },
]
