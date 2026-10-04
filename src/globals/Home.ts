import type { GlobalConfig } from 'payload'

import { revalidateSite } from '@/hooks/revalidate'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Page d’accueil',
  admin: {
    group: 'Contenu',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      localized: true,
      label: 'Titre du hero',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      localized: true,
      label: 'Sous-titre',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image du hero',
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Blocs mis en avant',
      labels: { singular: 'Bloc', plural: 'Blocs' },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Titre',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          localized: true,
          label: 'Texte',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
  },
}
