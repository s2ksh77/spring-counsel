import { NextRequest, NextResponse } from 'next/server';
import client from '@libs/server/client';
import { cookieOptions } from '@libs/server/withSession';
import { getIronSession } from 'iron-session';

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

export async function POST(req: Request) {
  try {
    const user = await getUser(req);
    const { title, content, isPrimary } = await req.json();

    const notice = await client.notice.create({
      data: {
        title,
        content,
        isPrimary,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json({ ok: true, notice });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Failed to create notice' }, { status: 500 });
  }
}
