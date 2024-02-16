import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { name, email, phone, content },
    session: { user },
  } = req;
  if (req.method === 'POST') {
    const reservation = await client.reservation.create({
      data: {
        name,
        email,
        phone: +phone,
        content,
        status: 'pending',
      },
    });
    res.json({ ok: true, reservation });
  }
  if (req.method === 'GET') {
    const reservations = await client.reservation.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    res.json({ ok: true, reservations });
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
