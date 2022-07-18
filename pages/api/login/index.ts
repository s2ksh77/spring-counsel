import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { userId, password },
    session: { user },
  } = req;
  if (req.method === 'POST') {
    res.json({ ok: true });
  }
  if (req.method === 'GET') {
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
    isPrivate: false,
  })
);
