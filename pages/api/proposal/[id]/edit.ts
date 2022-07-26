import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    body: { status },
    session: { user },
  } = req;

  const reservation = await client.reservation.update({
    data: {
      status,
    },
    where: {
      id,
    },
  });

  return res.json({
    ok: true,
    reservation,
  });
}

export default withApiSession(withHandler({ methods: ['GET', 'POST'], handler }));
