import type { CollectionConfig } from 'payload'

import { addDocumentId } from './addDocumentId'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
  },
  hooks: {
    afterRead: [addDocumentId],
  },
  upload: {
    staticDir: 'public/uploads',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alternative text',
    },
    {
      name: 'alternativeText',
      type: 'text',
      label: 'CMS alternative text',
    },
  ],
}
