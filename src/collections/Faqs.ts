import type { CollectionConfig } from 'payload'

import { revalidateSite } from '@/hooks/revalidate'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'Question',
    plural: 'FAQ',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
    group: 'Contenu',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
      label: 'Question',
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      localized: true,
      label: 'Réponse',
    },
    {
      name: 'category',
      type: 'text',
      localized: true,
      label: 'Catégorie',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Ordre',
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSite],
  },
}
