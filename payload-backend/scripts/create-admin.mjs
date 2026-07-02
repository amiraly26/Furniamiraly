import { getPayload } from 'payload'

import config from '../src/payload.config.ts'

const email = 'admin@gmail.com'
const password = 'admin123'

const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'users',
  limit: 1,
  overrideAccess: true,
  where: {
    email: {
      equals: email,
    },
  },
})

if (existing.docs[0]) {
  await payload.update({
    collection: 'users',
    data: { password },
    id: existing.docs[0].id,
    overrideAccess: true,
  })
  payload.logger.info(`Updated admin user: ${email}`)
} else {
  await payload.create({
    collection: 'users',
    data: { email, password },
    overrideAccess: true,
  })
  payload.logger.info(`Created admin user: ${email}`)
}

await payload.destroy()
