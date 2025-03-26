import { NextRequest, NextResponse } from 'next/server';
import client from '@libs/server/client';
import { getUser } from '@libs/server/session';
import { PrismaClient } from '@prisma/client';

const svcObjecct = {
  reservation: 'reservationFile',
  notice: 'noticeFile',
  review: 'reviewFile',
};

export async function POST(req: NextRequest) {
  try {
    const user = await getUser(req);
    const { name, url, form, id, fileId } = await req.json();
    const model = svcObjecct[form] as keyof PrismaClient;

    await (client[model] as any).create({
      data: {
        id: fileId,
        name,
        url,
        [form]: {
          connect: { id },
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to upload file' },
      { status: 500 },
    );
  }
}
