import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import answers from './[id]/answers';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { question } = req.body;
  const { user } = req.session;
  if (req.method === 'POST') {
    const post = await client.post.create({
      data: {
        question,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    //
    return res.json({ ok: true, post });
  }
  if (req.method === 'GET') {
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wondering: true,
            answer: true,
          },
        },
      },
    });
    return res.json({ ok: true, posts });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
