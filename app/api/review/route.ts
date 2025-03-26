import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { NextResponse } from 'next/server';
import { getUser } from '@libs/server/session';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const curPage = parseInt(url.searchParams.get('page') || '1', 10);

  const reviews = await client.review.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    include: {
      files: true,
    },
    skip: (curPage - 1) * 5,
    take: 5,
  });

  const totalReviews = await client.review.count();

  return NextResponse.json({
    ok: true,
    data: {
      reviews,
      curPage,
      maxPage: Math.ceil(totalReviews / 5),
    },
  });
}

export async function POST(req: Request) {
  try {
    const user = await getUser(req);
    const { title, content } = await req.json();

    const review = await client.review.create({
      data: {
        title,
        content,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return NextResponse.json({ ok: true, review });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Failed to create notice' }, { status: 500 });
  }
}
