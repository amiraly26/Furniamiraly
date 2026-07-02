import type { CollectionConfig } from 'payload'

import { addDocumentId } from './addDocumentId'

export const Categories: CollectionConfig = {
  slug: 'product-categories',
  access: {
    read: () => true,
  },
  admin: {
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
