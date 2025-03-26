import { NextRequest, NextResponse } from 'next/server';
import client from '@libs/server/client';
import { getUser } from '@libs/server/session';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser(req);
    if (user) {
      await client.notice.delete({
        where: {
          id: params.id,
        },
      });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Failed to delete notice' }, { status: 500 });
  }
}
