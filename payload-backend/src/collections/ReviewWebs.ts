import type { CollectionConfig } from 'payload'

import { addDocumentId } from './addDocumentId'

export const ReviewWebs: CollectionConfig = {
  slug: 'review-webs',
  access: {
    create: () => true,
    read: () => true,
  },
  admin: {
    defaultColumns: ['name', 'rating', 'Comment', 'productId', 'createdAt'],
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
      name: 'rating',
      type: 'number',
      required: true,
      min: 0,
      max: 5,
    },
    {
      name: 'Comment',
      type: 'textarea',
      label: 'Review',
      required: true,
    },
    {
      name: 'Date',
      type: 'date',
      required: true,
    },
    {
      name: 'productId',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'pfp',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
