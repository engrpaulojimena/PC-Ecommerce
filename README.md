# PCFORGE — Next.js + Neon PostgreSQL

Converted from plain PHP + SQLite to **Next.js 14 (App Router) + Neon PostgreSQL**.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | Neon (serverless PostgreSQL) |
| Auth | JWT via `jose` + HTTP-only cookies |
| Passwords | `bcryptjs` |
| Styling | CSS (globals.css — same dark teal theme) |

---

## Quick Setup

### 1. Create a Neon project

1. Go to [neon.tech](https://neon.tech) → create a free account
2. Create a new **project** (e.g. `pcforge`)
3. Copy the **Connection string** → looks like:
   ```
   postgresql://neondb_owner:xxxx@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### 2. Run the database schema

In your Neon dashboard → **SQL Editor** → paste the contents of `database/schema.sql` and click **Run**.

This creates all tables and seeds sample products + the default admin account.

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
DATABASE_URL=your-neon-connection-string-here
JWT_SECRET=generate-with-openssl-rand-base64-32
```

Generate a JWT secret:
```bash
openssl rand -base64 32
```

### 4. Install and run

```bash
npm install
npm run dev
```

Visit:
- **Shop:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/dashboard

---

## Default Admin Login

```
Email:    admin@pcshop.test
Password: admin123
```

> ⚠️ Change this password after first login! Update it directly in the Neon SQL Editor:
> ```sql
> -- Generate a new hash first, then:
> UPDATE users SET password = 'new-bcrypt-hash' WHERE email = 'admin@pcshop.test';
> ```

---

## Project Structure

```
pcforge-next/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Shop / product catalog
│   │   ├── product/[id]/page.tsx     # Product detail
│   │   ├── cart/page.tsx             # Cart (localStorage-based)
│   │   ├── checkout/page.tsx         # Checkout form
│   │   ├── pay/page.tsx              # Sandbox payment gateway
│   │   ├── order-success/page.tsx
│   │   ├── order-failed/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── orders/page.tsx           # Customer order history
│   │   ├── admin/
│   │   │   ├── layout.tsx            # Admin nav wrapper
│   │   │   ├── dashboard/page.tsx    # Stats + recent orders
│   │   │   ├── products/
│   │   │   │   ├── page.tsx          # Product list
│   │   │   │   ├── new/page.tsx      # Add product
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   └── orders/page.tsx       # Order management
│   │   └── api/
│   │       ├── auth/login/route.ts
│   │       ├── auth/register/route.ts
│   │       ├── auth/logout/route.ts
│   │       ├── products/route.ts
│   │       ├── products/[id]/route.ts
│   │       ├── categories/route.ts
│   │       ├── orders/route.ts
│   │       ├── orders/my/route.ts
│   │       ├── orders/[id]/route.ts
│   │       └── orders/[id]/pay/route.ts
│   ├── components/
│   │   ├── Header.tsx                # Sticky nav with cart count + auth state
│   │   ├── AddToCartButton.tsx       # Client-side cart add
│   │   ├── AdminDeleteProduct.tsx
│   │   ├── AdminProductForm.tsx
│   │   └── AdminOrderStatus.tsx
│   └── lib/
│       ├── db.ts                     # Neon SQL client
│       ├── auth.ts                   # JWT sign/verify + session helpers
│       └── types.ts                  # TypeScript types + formatPrice()
├── database/
│   └── schema.sql                    # Neon PostgreSQL schema + seed data
├── .env.local.example
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Key Differences from PHP Version

| PHP + SQLite | Next.js + Neon |
|---|---|
| `$_SESSION['cart']` | `localStorage` (client-side) |
| `session_start()` auth | JWT in HTTP-only cookie |
| `password_hash()` | `bcryptjs` |
| SQLite `AUTOINCREMENT` | PostgreSQL `SERIAL` |
| `LIKE` queries | `ILIKE` (case-insensitive) |
| Server-side rendering | Next.js App Router (RSC + client components) |
| `header('Location:')` | `useRouter().push()` / `redirect()` |

---

## Deploying to Vercel

1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` — your Neon connection string
   - `JWT_SECRET` — your generated secret
4. Deploy!

Neon works perfectly with Vercel Edge and serverless functions out of the box.
