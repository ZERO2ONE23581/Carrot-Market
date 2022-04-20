import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;

  //로그인된 사용자의 좋아요 찾기
  const favs = await client.favorites.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });
  //
  return res.json({ ok: true, favs });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
