import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      products,
    });
  }
  if (req.method === 'POST') {
    const { name, price, description } = req.body;
    const { user } = req.session;
    //
    const product = await client.product.create({
      data: {
        image: 'imageString',
        name,
        price: +price,
        description,
        user: {
          connect: { id: user?.id },
        },
      },
    });
    //
    return res.json({ ok: true, product });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
