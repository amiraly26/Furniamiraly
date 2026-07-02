import type { CollectionConfig } from 'payload'

import { addDocumentId } from './addDocumentId'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ['firstName', 'lastName', 'email', 'createdAt'],
    useAsTitle: 'email',
  },
  hooks: {
    afterRead: [addDocumentId],
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'nid', type: 'text' },
    { name: 'street', type: 'text', required: true },
    { name: 'city', type: 'text', required: true },
    { name: 'country', type: 'text', required: true },
    { name: 'state', type: 'text' },
    { name: 'postCode', type: 'text' },
    {
      name: 'delivery',
      type: 'select',
      required: true,
      options: [
        { label: 'Free', value: 'free' },
        { label: 'Express', value: 'express' },
        { label: 'Pick up', value: 'pick-up' },
      ],
    },
  ],
}
