import { NextRequest, NextResponse } from 'next/server';
import client from '@libs/server/client';

export async function GET() {
  try {
    const data = await client.reservation.findMany({
      orderBy: [{ createdAt: 'desc' }],
    });

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Failed to fetch reservations' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, content } = await req.json();

    const reservation = await client.reservation.create({
      data: {
        name,
        email,
        phone: +phone,
        content,
        status: 'pending',
      },
    });

    return NextResponse.json({ ok: true, reservation });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Failed to create reservation' },
      { status: 500 },
    );
  }
}
