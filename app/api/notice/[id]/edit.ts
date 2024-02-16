import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    body: { title, content, isPrimary },
    session: { user },
  } = req;

  const notice = await client.notice.update({
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
    where: {
      id: id?.toString(),
    },
  });

  return res.json({
    ok: true,
    notice,
  });
}

export default withApiSession(withHandler({ methods: ['GET', 'POST'], handler }));
