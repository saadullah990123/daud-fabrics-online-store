import crypto from 'node:crypto';

export const config = {
  runtime: 'nodejs',
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

function validSession(token: string, secret: string | undefined): boolean {
  if (!token || !secret) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [ts, sig] = parts;
  if (!ts || !sig || !/^\d+$/.test(ts)) return false;

  const age = Date.now() - Number(ts);
  if (age < 0 || age > 8 * 60 * 60 * 1000) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(ts)
    .digest('base64url');

  if (sig.length !== expected.length) return false;

  try {
    return crypto.timingSafeEqual(
      Buffer.from(sig, 'utf8'),
      Buffer.from(expected, 'utf8'),
    );
  } catch {
    return false;
  }
}

export default function middleware(request: Request) {
  const token = getCookie(request, 'admin_session');
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (validSession(token, secret)) {
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
