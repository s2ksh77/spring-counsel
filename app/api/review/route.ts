import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { NextResponse } from 'next/server';

// async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
//   const {
//     body: { title, content },
//     session: { user },
//   } = req;
//   if (req.method === 'POST') {
//     const review = await client.review.create({
//       data: {
//         title,
//         content,
//         user: {
//           connect: {
//             id: user?.id,
//           },
//         },
//       },
//     });
//     res.json({ ok: true, review });
//   }
//   if (req.method === 'GET') {
//     const reviews = await client.review.findMany({
//       orderBy: [
//         {
//           createdAt: 'desc',
//         },
//       ],
//       include: {
//         files: true,
//       },
//     });
//     res.json({ ok: true, reviews, isLogin: !!user?.id });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '100mb',
//     },
//   },
// };

// export default withApiSession(
//   withHandler({
//     methods: ['GET', 'POST'],
//     handler,
//     isPrivate: false,
//   })
// );

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
