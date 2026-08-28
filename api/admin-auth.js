const crypto = require('crypto');

function json(res, status, body, extraHeaders = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  Object.entries(extraHeaders).forEach(([k, v]) => res.setHeader(k, v));
  res.end(JSON.stringify(body));
}

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function makeSession(secret) {
  const payload = `${Date.now()}`;
  return `${payload}.${sign(payload, secret)}`;
}

function validSession(token, secret) {
  if (!token || !secret) return false;
  const [ts, sig] = token.split('.');
  if (!ts || !sig || !/^\d+$/.test(ts)) return false;
  const age = Date.now() - Number(ts);
  if (age < 0 || age > 8 * 60 * 60 * 1000) return false; // 8 hours
  const expected = sign(ts, secret);
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch (_) {
    return false;
  }
}

function getCookie(req, name) {
  const header = req.headers.cookie || '';
  const item = header.split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`));
  return item ? decodeURIComponent(item.slice(name.length + 1)) : '';
}

function clearCookie() {
  return 'admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0';
}

module.exports = async (req, res) => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!secret || !adminEmail || !adminPassword) {
    return json(res, 500, { error: 'Admin authentication is not configured on the server.' });
  }

  const action = new URL(req.url, `https://${req.headers.host || 'localhost'}`).searchParams.get('action');

  if (req.method === 'GET' && action === 'check') {
    const authenticated = validSession(getCookie(req, 'admin_session'), secret);
    return json(res, authenticated ? 200 : 401, {
      authenticated,
      email: authenticated ? adminEmail : undefined
    });
  }

  if (req.method === 'POST' && action === 'logout') {
    return json(res, 200, { authenticated: false }, { 'Set-Cookie': clearCookie() });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  let body = {};
  try {
    body = typeof req.body === 'object' && req.body !== null ? req.body : JSON.parse(req.body || '{}');
  } catch (_) {
    return json(res, 400, { error: 'Invalid request.' });
  }

  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  const emailOk = email === String(adminEmail).trim().toLowerCase();
  const passwordOk = password.length > 0 && password === adminPassword;

  if (!emailOk || !passwordOk) {
    // Same response for both failures; do not reveal which credential was wrong.
    return json(res, 401, { authenticated: false, error: 'Invalid admin credentials.' });
  }

  const session = makeSession(secret);
  const cookie = `admin_session=${encodeURIComponent(session)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`;
  return json(res, 200, { authenticated: true, email: adminEmail }, { 'Set-Cookie': cookie });
};
