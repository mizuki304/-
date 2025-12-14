import crypto from 'node:crypto';
import { NextResponse } from 'next/server';

const AUTH_COOKIE = 'trip_auth';

function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  const expected = process.env.SITE_PASSWORD;
  if (!expected) {
    return NextResponse.json({ ok: false, message: 'SITE_PASSWORD is not set on the server.' }, { status: 500 });
  }

  const body = await request.json().catch(() => null) as { password?: string } | null;
  const provided = body?.password ?? '';

  if (provided !== expected) {
    return NextResponse.json({ ok: false, message: 'パスワードが違います。' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, hashPassword(expected), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
