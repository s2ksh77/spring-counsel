import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    body: { title, content },
    session: { user },
  } = req;

  const review = await client.review.update({
    data: {
      title,
      content,
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
    review,
  });
}

export default withApiSession(withHandler({ methods: ['GET', 'POST'], handler }));
