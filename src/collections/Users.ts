import type { CollectionConfig } from 'payload'

import { revalidateSite } from '@/hooks/revalidate'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Utilisateur',
    plural: 'Utilisateurs',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Système',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
  },
}
