import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { cookieOptions } from '@libs/server/withSession';

export async function POST(req: Request) {
  const res = new Response();
  const session = await getIronSession(req, res, cookieOptions);

  await session.destroy();

  return NextResponse.json({ ok: true }, { headers: res.headers });
}
