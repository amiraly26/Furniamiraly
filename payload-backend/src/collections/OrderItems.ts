import type { CollectionConfig } from 'payload'

import { addDocumentId } from './addDocumentId'

export const OrderItems: CollectionConfig = {
  slug: 'order-items',
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ['order', 'product', 'quantity', 'colour'],
    useAsTitle: 'colour',
  },
  hooks: {
    afterRead: [addDocumentId],
  },
  fields: [
    {
      name: 'quantity',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'colour',
      type: 'text',
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      required: true,
    },
  ],
}
