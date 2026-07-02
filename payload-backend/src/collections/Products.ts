import type { CollectionConfig } from 'payload'

import { addDocumentId } from './addDocumentId'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'ProductId', 'price', 'stock'],
    useAsTitle: 'title',
  },
  hooks: {
    afterRead: [addDocumentId],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'ProductId',
      type: 'text',
      label: 'Product URL ID',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'json',
      defaultValue: [],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'PercentageDiscount',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 100,
    },
    {
      name: 'sku',
      type: 'text',
    },
    {
      name: 'measurement',
      type: 'text',
    },
    {
      name: 'stock',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'Is_new',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'rating',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 5,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'product_category',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
    },
    {
      name: 'colour',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
