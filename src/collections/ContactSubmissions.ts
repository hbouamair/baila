import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Message',
    plural: 'Messages de contact',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['createdAt', 'name', 'email'],
    group: 'Formulaires',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-mail',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'locale',
      type: 'text',
      label: 'Langue',
      admin: { readOnly: true },
    },
  ],
}
