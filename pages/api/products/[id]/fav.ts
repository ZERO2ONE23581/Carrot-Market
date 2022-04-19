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

  const alreadyExists = await client.favorites.findFirst({
    //로그인된 유저가 한 좋아요 + 좋아요한 제품 -> 좋아요 찾기
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    //delete는 unique한 id를 찾아야 한다
    await client.favorites.delete({ where: { id: alreadyExists.id } });
  } else {
    await client.favorites.create({
      data: {
        user: { connect: { id: user?.id } },
        product: { connect: { id: +id.toString() } },
      },
    });
  }
  //
  return res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ['POST'], handler }));
