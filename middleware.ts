// Uses the Web Crypto API (crypto.subtle) instead of Node's `crypto` module.
// This file is NOT part of a Next.js app, so Vercel runs it on the Edge
// runtime, which does not have Node built-ins like `node:crypto` available.
// `runtime: 'nodejs'` for middleware only applies inside Next.js projects.

export const config = {
  matcher: ['/admin-dashboard.html'],
};

function getCookie(request: Request, name: string): string {
  const raw = request.headers.get('cookie') || '';
  const item = raw
    .split(';')
    .map((v) => v.trim())
    .find((v) => v.startsWith(`${name}=`));

  return item ? decodeURIComponent(item.slice(name.length + 1)) : '';
}

function base64UrlEncode(bytes: ArrayBuffer): string {
  let binary = '';
  const view = new Uint8Array(bytes);
  for (let i = 0; i < view.length; i++) {
    binary += String.fromCharCode(view[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmacSha256Base64Url(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return base64UrlEncode(signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function validSession(token: string, secret: string | undefined): Promise<boolean> {
  if (!token || !secret) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [ts, sig] = parts;
  if (!ts || !sig || !/^\d+$/.test(ts)) return false;

  const age = Date.now() - Number(ts);
  if (age < 0 || age > 8 * 60 * 60 * 1000) return false;

  const expected = await hmacSha256Base64Url(ts, secret);
  return timingSafeEqual(sig, expected);
}

export default async function middleware(request: Request) {
  const token = getCookie(request, 'admin_session');
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (await validSession(token, secret)) {
    return;
  }

  return new Response('Not Found', {
    status: 404,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}