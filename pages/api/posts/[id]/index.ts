import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const { user } = req.session;

  const post = await client.post.findUnique({
    where: { id: +id.toString() },
    include: {
      user: {
        select: { id: true, name: true, avatar: true },
      },
      _count: {
        select: {
          answer: true,
          wondering: true,
        },
      },
      answer: {
        select: {
          text: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        userId: user?.id,
        postId: +id.toString(),
      },
      select: { id: true },
    })
  );
  //
  return res.json({ ok: true, post, isWondering });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
