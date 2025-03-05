import { NextResponse } from 'next/server';
import client from '@libs/server/client';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const data = await client.notice.findUnique({
      where: {
        id: params.id.toString(),
      },
      include: {
        files: true,
      },
    });

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch notices' }, { status: 500 });
  }
}
