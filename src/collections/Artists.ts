import type { CollectionConfig } from 'payload'

import { revalidateSite } from '@/hooks/revalidate'

export const Artists: CollectionConfig = {
  slug: 'artists',
  labels: {
    singular: 'Artiste',
    plural: 'Artistes',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'featured', 'order'],
    group: 'Programmation',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: { position: 'sidebar' },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'dancer',
      label: 'Rôle',
      options: [
        { label: 'Danse', value: 'dancer' },
        { label: 'DJ', value: 'dj' },
        { label: 'Enseignement', value: 'teacher' },
      ],
    },
    {
      name: 'country',
      type: 'text',
      label: 'Pays',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
    },
    {
      name: 'bio',
      type: 'richText',
      localized: true,
      label: 'Biographie',
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Réseaux',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Libellé',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Mis en avant',
      admin: { position: 'sidebar' },
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
