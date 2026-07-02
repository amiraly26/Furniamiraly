import type { CollectionConfig } from 'payload'

import { addDocumentId } from './addDocumentId'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ['name', 'email', 'createdAt'],
    useAsTitle: 'name',
  },
  hooks: {
    afterRead: [addDocumentId],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
