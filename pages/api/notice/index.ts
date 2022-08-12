import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { title, content, isPrimary },
    session: { user },
  } = req;
  if (req.method === 'POST') {
    const notice = await client.notice.create({
      data: {
        title,
        content,
        isPrimary,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, notice });
  }
  if (req.method === 'GET') {
    const notices = await client.notice.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    res.json({ ok: true, notices });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
    isPrivate: false,
  })
);
