import { NextResponse } from 'next/server';
import client from '@libs/server/client';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const takeParam = searchParams.get('take');
    const take = takeParam ? parseInt(takeParam, 10) : undefined;

    const data = await client.notice.findMany({
      orderBy: [{ createdAt: 'desc' }],
      ...(take && { take }),
    });

    return NextResponse.json({ ok: true, status: 200, data });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch notices' }, { status: 500 });
  }
}
