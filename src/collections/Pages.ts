import type { CollectionConfig } from 'payload'

import { revalidateSite } from '@/hooks/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    group: 'Contenu',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Titre',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'Ex. mentions-legales, cgv, confidentialite',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: 'Contenu',
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSite],
  },
}
