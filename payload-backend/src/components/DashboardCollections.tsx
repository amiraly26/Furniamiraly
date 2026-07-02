const collections = [
  { label: 'Users', slug: 'users' },
  { label: 'Media', slug: 'media' },
  { label: 'Products', slug: 'products' },
  { label: 'Product Categories', slug: 'product-categories' },
  { label: 'Pages', slug: 'pages' },
  { label: 'Review Webs', slug: 'review-webs' },
  { label: 'Orders', slug: 'orders' },
  { label: 'Order Items', slug: 'order-items' },
  { label: 'Contact Messages', slug: 'contact-messages' },
]

export function DashboardCollections() {
  return (
    <section className="admin-collection-shortcuts" aria-labelledby="collection-shortcuts-title">
      <h2 id="collection-shortcuts-title">Collections</h2>
      <div className="admin-collection-shortcuts__grid">
        {collections.map((collection) => (
          <div className="admin-collection-shortcuts__item" key={collection.slug}>
            <a href={`/admin/collections/${collection.slug}`}>{collection.label}</a>
            <a
              aria-label={`Create ${collection.label}`}
              className="admin-collection-shortcuts__create"
              href={`/admin/collections/${collection.slug}/create`}
            >
              +
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
