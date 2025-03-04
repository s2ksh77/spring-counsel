import { getSession } from '@libs/server/session';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await getSession();
  return NextResponse.json({ ok: true, data });
}
