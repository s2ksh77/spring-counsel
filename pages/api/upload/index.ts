import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { name, url, form, id, fileId },
    session: { user },
  } = req;
  if (req.method === 'POST') {
    if (form === 'reservation') {
      await client.reservationFile.create({
        data: {
          id: fileId,
          name,
          url,
          reservation: {
            connect: {
              id,
            },
          },
        },
      });
    } else if (form === 'notice') {
      await client.noticeFile.create({
        data: {
          id: fileId,
          name,
          url,
          notice: {
            connect: {
              id,
            },
          },
        },
      });
    } else if (form === 'review') {
      await client.reviewFile.create({
        data: {
          id: fileId,
          name,
          url,
          review: {
            connect: {
              id,
            },
          },
        },
      });
    }

    res.json({ ok: true });
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
