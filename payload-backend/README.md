# Payload Backend

Payload CMS backend for the ecommerce site.

## Local setup

1. Copy `.env.example` to `.env`.
2. Add your hosted Postgres connection string to `DATABASE_URL`.
3. Run `npm install`.
4. Run `npm run dev`.

The Payload admin panel runs at:

```txt
http://localhost:1337/admin
```

The frontend should use:

```env
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:1337
```
