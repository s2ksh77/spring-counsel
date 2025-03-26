import { NextRequest, NextResponse } from 'next/server';
import client from '@libs/server/client';
import { getUser } from '@libs/server/session';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser(req);
    const { title, content } = await req.json();

    const review = await client.review.update({
      where: { id: params.id },
      data: {
        title,
        content,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json({ ok: true, review });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Failed to update review' }, { status: 500 });
  }
}
