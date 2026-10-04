import type { GlobalConfig } from 'payload'

import { revalidateSite } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Réglages du site',
  admin: {
    group: 'Système',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'festivalName',
      type: 'text',
      required: true,
      localized: true,
      label: 'Nom du festival',
      defaultValue: 'Bailamos',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      localized: true,
      label: 'Ville',
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Début',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Fin',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'ticketingPlatformName',
      type: 'text',
      required: true,
      defaultValue: 'Go&Dance',
      label: 'Nom de la plateforme de billetterie',
    },
    {
      name: 'ticketingUrl',
      type: 'text',
      required: true,
      label: 'URL de billetterie (repli)',
      admin: {
        description: 'Utilisée si un pass n’a pas de lien d’achat dédié.',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'E-mail de contact',
    },
    {
      name: 'plausibleDomain',
      type: 'text',
      label: 'Domaine Plausible',
      admin: {
        description: 'Ex. bailamos.example — laisser vide pour désactiver le suivi.',
      },
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Réseaux sociaux',
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
      name: 'footerNote',
      type: 'textarea',
      localized: true,
      label: 'Note de pied de page',
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
  },
}
