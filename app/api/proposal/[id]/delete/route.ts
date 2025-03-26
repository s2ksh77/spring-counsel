import { NextRequest, NextResponse } from 'next/server';
import client from '@libs/server/client';
import { getUser } from '@libs/server/session';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser(req);
    await client.reservation.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return NextResponse.json({ ok: false, error: 'Failed to delete reservation' }, { status: 500 });
  }
}
