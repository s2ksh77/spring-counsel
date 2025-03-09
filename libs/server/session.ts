import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { cookieOptions } from './withSession';
import { getIronSession } from 'iron-session';

export async function getSession() {
  const session = cookies().get('spring-counsel');
  return !!session;
}

export async function getUser(req: Request) {
  const session = await getIronSession(req, new Response(), cookieOptions);
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  return session.user;
}
