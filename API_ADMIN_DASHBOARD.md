# API & Admin Dashboard Spec (Client-facing features + Server API contracts)

Purpose
- Provide a single reference for all backend endpoints, data models, security, and client responsibilities needed to implement an admin dashboard and the client-side features that rely on the API.
- Focus on the server contracts needed for the frontend (dashboard and public site) to continue development.

Table of contents
1. Overview & goals
2. Auth & security
3. Data models (DB schema summary)
4. REST endpoints (Admin + Public)
5. Request/response examples
6. Client-side responsibilities
7. Admin UI screens & flows
8. File uploads, images & CDN
9. Background jobs & processing
10. Observability, monitoring & testing
11. Deployment, env vars & infra
12. Roadmap & priorities

---

1) Overview & goals
- Provide CRUD and search for Products, Categories, Pages, Settings, Users, Orders, and Contact messages.
- Support media uploads (images), bulk import/export, and email/webhook integrations.
- Provide role-based access (Admin, Editor, Support) with audit logging for all admin actions.
- Expose compact public endpoints for the storefront (products listing, product detail, categories, contact form) used by the client app.

2) Authentication & security
- Admin Auth:
  - Use JWT (short-lived access token + refresh token) OR session cookies (HttpOnly) depending on stack.
  - Endpoints: `POST /api/admin/auth/login`, `POST /api/admin/auth/refresh`, `POST /api/admin/auth/logout`.
  - Two-factor optional: `POST /api/admin/auth/2fa/*`.
- Roles & Permissions:
  - Roles: `admin`, `editor`, `support`.
  - Permission checks on every admin endpoint; return 403 for insufficient rights.
- Security Best Practices:
  - CSRF protection for cookie-based sessions.
  - CORS: restrict to known origins (dashboard + public site domains).
  - Input validation and sanitizer (especially WYSIWYG HTML).
  - Rate limiting on public endpoints and admin login.
  - Strong password hashing (bcrypt/argon2).
  - File upload validation (type, size, virus scan optionally).
  - Use signed URLs for direct uploads to storage (S3/GCS).

3) Data models (example fields)
- User
  - id, email, name, passwordHash, role, isActive, createdAt, updatedAt, lastLoginAt
- Product
  - id, sku, name, slug, description (html), price, currency, categoryId, subcategoryId, gallery: [imageIds], thumbnailId, stock, weight, dimensions, metadata(json), isFeatured, isPublished, createdBy, updatedBy, createdAt, updatedAt
- Category
  - id, parentId, name, slug, description, position, isPublished
- Image / Asset
  - id, url, storageKey, mimeType, width, height, size, altText, createdBy, createdAt
- Order (minimal admin view)
  - id, reference, customer {name,email,phone,address}, items [{productId, sku, name, price, qty}], total, shippingStatus, paymentStatus, createdAt, updatedAt
- ContactMessage
  - id, name, email, phone, subject, message, seen (bool), createdAt
- Page
  - id, slug, title, content(html/markdown), seo {title, description}, isPublished, createdAt
- AuditLog
  - id, actorUserId, action, targetType, targetId, payload, timestamp

4) REST endpoints (recommended paths)
- Auth (Admin)
  - POST /api/admin/auth/login {email,password} -> {accessToken, refreshToken, user}
  - POST /api/admin/auth/refresh {refreshToken} -> {accessToken}
  - POST /api/admin/auth/logout -> 204
- Users (admin)
  - GET /api/admin/users?search=&page=&limit=&role= -> {items, total}
  - POST /api/admin/users -> create user
  - GET /api/admin/users/:id
  - PUT /api/admin/users/:id
  - DELETE /api/admin/users/:id
- Products
  - GET /api/products?category=&q=&page=&limit=&sort= (public)
  - GET /api/products/:id (public) or GET /api/products/slug/:slug
  - Admin: POST /api/admin/products (create)
  - Admin: PUT /api/admin/products/:id
  - Admin: DELETE /api/admin/products/:id
  - Admin: POST /api/admin/products/bulk (csv/json import)
- Categories
  - GET /api/categories (public)
  - Admin CRUD: /api/admin/categories
- Images / Assets
  - POST /api/admin/uploads/init -> {uploadUrl, key, fields} (signed upload initialize)
  - POST /api/admin/uploads/complete -> confirm & create Image record
  - GET /api/admin/images?page=&limit=&q=
  - DELETE /api/admin/images/:id
- Orders (admin)
  - GET /api/admin/orders?status=&page=&limit=
  - GET /api/admin/orders/:id
  - PUT /api/admin/orders/:id/status {shippingStatus,paymentStatus}
- Contact messages
  - POST /api/contact (public form)
  - GET /api/admin/contacts?page=&limit=&seen= (admin)
  - PUT /api/admin/contacts/:id/seen
- Pages & Content
  - Admin CRUD /api/admin/pages
  - Public: GET /api/pages/:slug
- Settings
  - GET /api/admin/settings
  - PUT /api/admin/settings
- Analytics / Metrics (optional)
  - GET /api/admin/analytics/sales?from=&to=
- Search (optional)
  - GET /api/search?q=&type=products&limit=&page=

5) Request / Response examples
- POST /api/admin/products
  Request JSON:
  {
    "name": "Canapé Milano",
    "slug": "canape-milano",
    "description": "<p>...</p>",
    "price": 1299,
    "currency": "EUR",
    "categoryId": "salon",
    "gallery": ["img_abc","img_def"],
    "stock": 12,
    "isPublished": true
  }
  Response 201:
  {"id":"prod_123","message":"Created"}

- GET /api/products?page=1&limit=12
  Response 200:
  {
    "items":[ {"id":"prod_123","name":"...","price":1299,"thumbnail":"https://..."} ],
    "total": 234,
    "page":1,
    "limit":12
  }

6) Client-side responsibilities (what the frontend must handle)
- Authentication flows:
  - Store access token securely (HttpOnly cookie recommended), handle refresh token flows, redirect to login on 401.
- Pagination & infinite scroll for product lists; append pages and debounce requests.
- Form validation (contact form, product forms in admin), client-side and server-side validation handling.
- Image uploads:
  - Client requests signed upload URL -> performs direct upload to S3/GCS -> notifies API with image metadata.
  - Show upload progress, allow reordering gallery, preview images using local object URLs.
  - For large images, implement client-side resize/compression before upload (optional).
- Optimistic UI updates for quick admin UX (e.g., toggling publish state), with rollback on error.
- Provide clear error messages from server validation errors.
- Retry policy for transient network failures (exponential backoff for uploads).
- Sanitize and preview WYSIWYG content before saving.
- WebSocket or SSE connection for live updates (new orders, contact messages) in dashboard.

7) Admin UI screens & flows (minimum MVP)
- Login / SSO
- Dashboard / Overview (sales, orders count, recent activity)
- Products list (search, filters, bulk actions)
- Product edit/create (gallery manager, price, stock, SEO fields)
- Categories manager (nested categories)
- Orders list & detail (change status, print invoice)
- Contacts / Messages inbox (mark seen, reply via email integration)
- Pages / Content editor (WYSIWYG with image embed)
- Users & roles management
- Settings (company info, email SMTP settings, payment keys, storage settings)
- Media library (list, delete, upload)
- Audit log / Activity feed

8) File uploads, images & CDN
- Use signed uploads (S3 presigned PUT/POST or GCS signed URL). Endpoint: `POST /api/admin/uploads/init`.
- Store image records in DB with CDN URL and metadata (width/height, size).
- Use a CDN (CloudFront/Cloudflare) in front of storage for performance.
- Thumbnailing: either generate server-side (lambda job or image service) or use CDN image resizing.
- Client: show small preview while uploading; after upload complete, add record to gallery.

9) Background jobs & processing
- Use a job queue (Bull/Sidekiq/RQ) for:
  - Processing uploaded images (resize, optimize)
  - Sending email notifications
  - Importing products (CSV) and generating audit logs
  - Webhook deliveries

10) Observability, logging & testing
- Logging: structured logs with correlation IDs (request id). Store in centralized logging (ELK/Datadog).
- Metrics: requests, error rates, queue lengths, background job failures.
- Alerts: error rate spike, job failures, low disk/storage warnings.
- Tests: unit tests for business logic, integration tests for API contracts, e2e for critical flows (login, create product, upload image).

11) Deployment & env vars
- Example env vars:
  - DATABASE_URL
  - JWT_SECRET
  - JWT_EXPIRES_IN
  - REFRESH_TOKEN_SECRET
  - STORAGE_PROVIDER (s3/gcs)
  - S3_BUCKET, S3_REGION, S3_ACCESS_KEY, S3_SECRET
  - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
  - CDN_URL
  - NODE_ENV
  - ADMIN_ALLOWED_ORIGINS
- Recommend using containerized deployment (Docker) with separated environments (staging/prod).

12) Roadmap & priorities (MVP -> Next)
- MVP (priority):
  1. Admin auth + roles
  2. Product CRUD + image upload (signed uploads)
  3. Categories CRUD
  4. Orders listing & basic status update
  5. Contact messages endpoint and admin inbox
  6. Public product list & product detail endpoints
- Phase 2:
  - Bulk import/export, audit logs, analytics endpoints
  - Media optimization pipeline
  - User management & permissions UI
- Phase 3:
  - Integrate payments, advanced reporting, multi-warehouse stock

---

Appendix: Example minimal OpenAPI fragment (product create)
```yaml
paths:
  /api/admin/products:
    post:
      summary: Create product
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name: { type: string }
                slug: { type: string }
                description: { type: string }
                price: { type: number }
                currency: { type: string }
                categoryId: { type: string }
      responses:
        '201':
          description: Created
```

Notes & recommendations
- Provide a Postman collection / OpenAPI file early to accelerate frontend work.
- Use feature flags for risky changes (feature flag service or env toggles).
- Prefer storing images at a normalized size and use CDN transformations for different sizes.
- Keep API responses consistent (snake_case vs camelCase) — prefer camelCase for JS clients.

Contact
- If you want, I can also:
  - generate a full OpenAPI (yaml/json) file from this spec,
  - scaffold example Express/Fastify routes or a Next.js API routes starter,
  - create Postman collection with example requests.


<!-- EOF -->