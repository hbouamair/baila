import type { CollectionConfig } from 'payload'

import { revalidateSite } from '@/hooks/revalidate'

export const Programme: CollectionConfig = {
  slug: 'programme',
  labels: {
    singular: 'Créneau',
    plural: 'Programme',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'startTime', 'type'],
    group: 'Programmation',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'date',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Titre',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'startTime',
      type: 'text',
      required: true,
      label: 'Heure de début',
      admin: { placeholder: '14:00' },
    },
    {
      name: 'endTime',
      type: 'text',
      label: 'Heure de fin',
      admin: { placeholder: '15:30' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'workshop',
      label: 'Type',
      options: [
        { label: 'Atelier', value: 'workshop' },
        { label: 'Soirée', value: 'party' },
        { label: 'Show', value: 'show' },
        { label: 'Autre', value: 'other' },
      ],
    },
    {
      name: 'room',
      type: 'text',
      label: 'Salle',
    },
    {
      name: 'level',
      type: 'select',
      defaultValue: 'all',
      label: 'Niveau',
      options: [
        { label: 'Tous niveaux', value: 'all' },
        { label: 'Débutant', value: 'beginner' },
        { label: 'Intermédiaire', value: 'intermediate' },
        { label: 'Avancé', value: 'advanced' },
      ],
    },
    {
      name: 'artists',
      type: 'relationship',
      relationTo: 'artists',
      hasMany: true,
      label: 'Artistes',
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: 'Description',
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSite],
  },
}
