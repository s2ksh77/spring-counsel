import { NextRequest, NextResponse } from 'next/server';
import client from '@libs/server/client';
import { getUser } from '@libs/server/session';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser(req);
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content, isPrimary } = await req.json();
  try {
    const notice = await client.notice.update({
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
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ ok: true, notice });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Failed to update notice' }, { status: 500 });
  }
}
