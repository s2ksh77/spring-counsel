import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { userId, password },
  } = req;
  if (req.method === 'POST') {
    const user = await client.user.findUnique({
      where: {
        userId_password: { userId, password }
      },
    });
    if (user) {
      req.session.user = {
        id: user.id,
      };
      await req.session.save();

      res.json({ ok: true });
    }else res.json({ ok: false, message: 'fail' });
  }
  if (req.method === 'GET') {
    const {
      session: { user },
    } = req;
    res.json({ ok: user?.id ? true : false });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
    isPrivate: false,
  })
);
