# Secure Admin Dashboard Setup

This version changes the admin panel from client-side/localStorage authentication to a server-side Vercel authentication flow.

## 1. Add Vercel Environment Variables

In your Vercel project: **Settings -> Environment Variables** add:

- `ADMIN_EMAIL` — your private admin email
- `ADMIN_PASSWORD` — a long random password (do not use `123456`)
- `ADMIN_SESSION_SECRET` — a different long random secret used to sign the HttpOnly session cookie

Use **Production** (and Preview/Development if you want to test those environments). Vercel environment variables are stored outside the source code and apply to new deployments. See Vercel's environment-variable documentation.

## 2. Deploy a new commit

Push this folder to GitHub, then redeploy on Vercel. Environment-variable changes apply to new deployments.

## 3. Admin URLs

- Login: `/admin-login.html`
- Protected dashboard: `/admin-dashboard.html`

Unauthenticated requests to `/admin-dashboard.html` are rejected by Vercel Routing Middleware with HTTP 404. The login creates an `HttpOnly`, `Secure`, `SameSite=Strict` cookie; the browser's localStorage is not used for admin authentication.

## 4. Important limitation

The existing product-management UI still uses the downloaded storefront's JavaScript/localStorage for product changes. This protects access to the dashboard, but it does **not** turn those product changes into a secure server-side database. For persistent, multi-device admin product management, connect the admin actions to a real database/API (for example Supabase with Row Level Security).
