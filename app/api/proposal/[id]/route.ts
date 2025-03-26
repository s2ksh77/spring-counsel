import { NextRequest, NextResponse } from 'next/server';
import client from '@libs/server/client';
import { getUser } from '@libs/server/session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser(req);
    const data = await client.reservation.findUnique({
      where: { id: params.id },
      include: { files: true },
    });

    if (!data) {
      return NextResponse.json({ ok: false, error: 'Reservation not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error('Error fetching reservation:', error);
    return NextResponse.json({ ok: false, error: 'Failed to fetch reservation' }, { status: 500 });
  }
}
