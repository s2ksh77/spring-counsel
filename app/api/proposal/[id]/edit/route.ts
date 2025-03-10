import { NextRequest, NextResponse } from 'next/server';
import client from '@libs/server/client';
import { getUser } from '@libs/server/session';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser(req);
    const { status } = await req.json();

    const data = await client.reservation.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error('Error updating reservation:', error);
    return NextResponse.json({ ok: false, error: 'Failed to update reservation' }, { status: 500 });
  }
}
