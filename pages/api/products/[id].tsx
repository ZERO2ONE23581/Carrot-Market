import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //상품 찾기
  const { id } = req.query;
  const product = await client.product.findUnique({
    where: {
      id: +id.toString(),
    },
    include: { user: { select: { name: true, id: true } } },
  });
  //관련상품 찾기
  const terms = product?.name.split(' ').map((word) => ({
    name: { contains: word },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms, // 관련 단어랑 일치하는 상품
      AND: { id: { not: product?.id } }, //관련단어상품의 아이디와 중복되지 않는 상품
    },
  });

  //
  return res.json({ ok: true, product, relatedProducts });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
