import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const product = await client.product.findUnique({
    where: {
      id: +id.toString(),
    },
    include: { user: { select: { name: true, id: true } } },
  });
  console.log(product);
  return res.json({ ok: true, product });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
