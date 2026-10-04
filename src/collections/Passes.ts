import type { CollectionConfig } from 'payload'

import { revalidateSite } from '@/hooks/revalidate'

export const Passes: CollectionConfig = {
  slug: 'passes',
  labels: {
    singular: 'Pass',
    plural: 'Pass',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'order'],
    group: 'Billetterie',
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { status: { not_equals: 'hidden' } }
    },
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
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
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Description courte',
    },
    {
      name: 'badge',
      type: 'text',
      localized: true,
      label: 'Badge',
      admin: { description: 'Ex. « Early bird » ou « Populaire ».' },
    },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'EUR',
      options: [
        { label: 'EUR', value: 'EUR' },
        { label: 'GBP', value: 'GBP' },
        { label: 'CHF', value: 'CHF' },
      ],
      label: 'Devise',
    },
    {
      name: 'pricingTiers',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Périodes tarifaires',
      labels: { singular: 'Période', plural: 'Périodes' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: 'Libellé',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          label: 'Prix',
        },
        {
          name: 'validFrom',
          type: 'date',
          label: 'Valide à partir du',
        },
        {
          name: 'validUntil',
          type: 'date',
          label: 'Valide jusqu’au',
        },
      ],
    },
    {
      name: 'daysIncluded',
      type: 'select',
      hasMany: true,
      label: 'Jours inclus',
      options: [
        { label: 'Jeudi', value: 'thursday' },
        { label: 'Vendredi', value: 'friday' },
        { label: 'Samedi', value: 'saturday' },
        { label: 'Dimanche', value: 'sunday' },
      ],
    },
    {
      name: 'inclusions',
      type: 'array',
      label: 'Prestations incluses',
      labels: { singular: 'Prestation', plural: 'Prestations' },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          localized: true,
          label: 'Prestation',
        },
      ],
    },
    {
      name: 'restrictions',
      type: 'richText',
      localized: true,
      label: 'Conditions et restrictions',
    },
    {
      name: 'purchaseUrl',
      type: 'text',
      label: 'Lien d’achat',
      admin: {
        description:
          'URL directe vers ce pass sur la billetterie. Si vide, le lien général des réglages du site est utilisé.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'available',
      label: 'Statut',
      options: [
        { label: 'Disponible', value: 'available' },
        { label: 'Complet', value: 'soldOut' },
        { label: 'Masqué', value: 'hidden' },
      ],
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
