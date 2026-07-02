import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const rootDir = path.resolve(dirname, '..', '..')
const frontendDir = path.join(rootDir, 'ecomv2-frontend')
const payloadURL = process.env.PAYLOAD_URL || 'http://localhost:1337'
const adminEmail = process.env.PAYLOAD_ADMIN_EMAIL || 'admin@gmail.com'
const adminPassword = process.env.PAYLOAD_ADMIN_PASSWORD || 'admin123'

const productsPath = path.join(frontendDir, 'public', 'dummyData.json')
const products = JSON.parse(await readFile(productsPath, 'utf8'))

// Small Payload API wrapper so the seed script fails loudly if any request is wrong.
async function request(url, options = {}) {
  const response = await fetch(url, options)
  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new Error(`${options.method || 'GET'} ${url} failed: ${response.status} ${text}`)
  }

  return data
}

async function login() {
  const data = await request(`${payloadURL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: adminEmail,
      password: adminPassword,
    }),
  })

  return data.token
}

// Products can have more than one category, but the current shop design uses the first one.
function firstCategory(product) {
  return product.product_category?.[0]
}

// Payload stores rich text as JSON, so plain product descriptions are converted before saving.
function richTextFromDescription(description) {
  if (Array.isArray(description)) return description

  return [
    {
      children: [
        {
          text: description || '',
        },
      ],
    },
  ]
}

async function findOne(collection, field, value) {
  const url = new URL(`${payloadURL}/api/${collection}`)
  url.searchParams.set(`where[${field}][equals]`, value)
  url.searchParams.set('limit', '1')
  const data = await request(url)
  return data.docs?.[0] || null
}

// Upload each product image once, then reuse the existing media record on the next seed run.
async function uploadMedia(token, image) {
  const filename = path.basename(image.url)
  const existing = await findOne('media', 'filename', filename)
  if (existing) return existing

  const imagePath = path.join(frontendDir, 'public', image.url)
  const buffer = await readFile(imagePath)
  const ext = path.extname(imagePath).toLowerCase()
  const type = ext === '.png' ? 'image/png' : ext === '.jpeg' || ext === '.jpg' ? 'image/jpeg' : 'application/octet-stream'
  const blob = new Blob([buffer], { type })
  const form = new FormData()

  form.append('file', blob, filename)
  form.append(
    '_payload',
    JSON.stringify({
      alt: image.alternativeText,
      alternativeText: image.alternativeText,
    }),
  )

  const data = await request(`${payloadURL}/api/media`, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
    },
    body: form,
  })

  return data.doc || data
}

// Create the category only if it does not already exist in Payload/Neon.
async function ensureCategory(token, category, media) {
  const existing = await findOne('product-categories', 'slug', category.slug)
  if (existing) return existing

  const data = await request(`${payloadURL}/api/product-categories`, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: category.name,
      slug: category.slug,
      image: media?.id,
    }),
  })

  return data.doc || data
}

// Seed products from dummyData.json into Payload while keeping product IDs stable.
async function ensureProduct(token, product, category, media) {
  const productId = product.ProductId || product.slug
  const existing = await findOne('products', 'ProductId', productId)
  if (existing) return existing

  const data = await request(`${payloadURL}/api/products`, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: product.name,
      ProductId: productId,
      slug: product.slug,
      shortDescription: product.shortDescription,
      description: richTextFromDescription(product.description),
      price: product.price,
      PercentageDiscount: product.PercentageDiscount || 0,
      sku: product.sku,
      stock: product.stock || 0,
      featured: Boolean(product.featured),
      Is_new: true,
      rating: product.rating || 0,
      featuredImage: media.id,
      images: [media.id],
      product_category: [category.id],
      colour: [{ name: 'default' }],
      _status: 'published',
    }),
  })

  return data.doc || data
}

const token = await login()
const mediaByURL = new Map()
const categoriesBySlug = new Map()
let createdOrFoundProducts = 0

// Main seed loop: product image -> category -> product.
for (const product of products) {
  const category = firstCategory(product)
  const image = product.images

  if (!category || !image?.url) {
    console.warn(`Skipping ${product.name}: missing category or image`)
    continue
  }

  if (!mediaByURL.has(image.url)) {
    mediaByURL.set(image.url, await uploadMedia(token, image))
  }

  const media = mediaByURL.get(image.url)

  if (!categoriesBySlug.has(category.slug)) {
    categoriesBySlug.set(category.slug, await ensureCategory(token, category, media))
  }

  await ensureProduct(token, product, categoriesBySlug.get(category.slug), media)
  createdOrFoundProducts += 1
}

console.log(`Seed complete: ${createdOrFoundProducts} products, ${categoriesBySlug.size} categories, ${mediaByURL.size} media files.`)
