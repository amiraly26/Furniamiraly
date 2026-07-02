import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { Categories } from './collections/Categories'
import { ContactMessages } from './collections/ContactMessages'
import { Media } from './collections/Media'
import { OrderItems } from './collections/OrderItems'
import { Orders } from './collections/Orders'
import { Pages } from './collections/Pages'
import { Products } from './collections/Products'
import { ReviewWebs } from './collections/ReviewWebs'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
    dashboard: {
      widgets: [],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Products,
    Categories,
    Pages,
    ReviewWebs,
    Orders,
    OrderItems,
    ContactMessages,
  ],
  cors: [frontendURL],
  csrf: [frontendURL],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:1337',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
