import type { GlobalConfig } from 'payload'

import { revalidateSite } from '@/hooks/revalidate'

export const PracticalInfo: GlobalConfig = {
  slug: 'practical-info',
  label: 'Infos pratiques',
  admin: {
    group: 'Contenu',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'venueName',
      type: 'text',
      localized: true,
      label: 'Nom du lieu',
    },
    {
      name: 'address',
      type: 'textarea',
      localized: true,
      label: 'Adresse',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'URL d’embed carte',
      admin: {
        description: 'URL iframe (Google Maps, OpenStreetMap…).',
      },
    },
    {
      name: 'access',
      type: 'richText',
      localized: true,
      label: 'Accès',
    },
    {
      name: 'accommodation',
      type: 'richText',
      localized: true,
      label: 'Hébergement',
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
  },
}
