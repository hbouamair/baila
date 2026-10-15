export const extraTrips = [
  {
    id: 'essaouira' as const,
    image: '/campaign/essaouira.jpg?v=2',
    position: 'center 46%',
    glyphs: ['wave', 'fish', 'fort'] as const,
  },
  {
    id: 'marrakech' as const,
    image: '/campaign/marrakech.jpg?v=2',
    position: 'center 28%',
    glyphs: ['landmark', 'bag', 'palm'] as const,
  },
  {
    id: 'agafay' as const,
    image: '/campaign/agafay.jpg?v=2',
    position: 'center 55%',
    glyphs: ['dunes', 'quad', 'tent'] as const,
  },
]

export type ExtraTripId = (typeof extraTrips)[number]['id']
export type ExtraGlyph = (typeof extraTrips)[number]['glyphs'][number]
