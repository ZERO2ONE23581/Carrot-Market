import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'POST') {
    const { question, latitude, longitude } = req.body;
    const { user } = req.session;
    //
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
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
    const { latitude, longitude } = req.query;
    const latNumber = parseFloat(latitude.toString());
    const lonNumber = parseFloat(longitude.toString());
    //
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
      where: {
        latitude: {
          gte: latNumber - 0.01,
          lte: latNumber + 0.01,
        },
        longitude: {
          gte: lonNumber - 0.01,
          lte: lonNumber + 0.01,
        },
      },
    });
    return res.json({ ok: true, posts });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
