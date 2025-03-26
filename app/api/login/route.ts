import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { cookieOptions } from '@libs/server/withSession';
import client from '@libs/server/client';

export async function GET(req: Request) {
  const res = new Response();
  const session = await getIronSession(req, res, cookieOptions);

  return NextResponse.json({ ok: !!session.user }, { headers: res.headers });
}

export async function POST(req: Request) {
  const res = new Response();
  const session = await getIronSession(req, res, cookieOptions);
  const { userId, password } = await req.json();

  const user = await client.user.findUnique({
    where: { userId_password: { userId, password } },
  });

  if (user) {
    session.user = { id: user.id };
    await session.save();
    return NextResponse.json({ ok: true }, { headers: res.headers });
  }

  return NextResponse.json({ ok: false, message: 'fail' });
}
