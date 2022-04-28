import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

//For ONLY logged in user!
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    //Find the user with matched session
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
      include: {
        products: {
          include: {
            _count: {
              select: {
                favorites: true,
              },
            },
          },
        },
        sales: true,
        purchases: true,
      },
    });
    return res.json({ ok: true, profile });
  }
  if (req.method === 'POST') {
    const { user } = req.session;
    const { email, phone, name, avatarId } = req.body;
    //
    const currentUser = await client.user.findUnique({
      where: { id: user?.id },
    });
    //
    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: { email },
          select: { id: true },
        })
      );
      //
      if (alreadyExists) {
        res.json({ ok: false, error: 'Email is already taken.' });
      }
      //
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
      //
      return res.json({ ok: true });
    }
    if (phone && phone !== currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: { phone },
          select: { id: true },
        })
      );
      //
      if (alreadyExists) {
        res.json({ ok: false, error: 'Phone is already taken.' });
      }
      //
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });
      //
      return res.json({ ok: true });
    }
    if (name) {
      await client.user.update({
        where: { id: user?.id },
        data: { name },
      });
    }
    if (avatarId) {
      await client.user.update({
        where: { id: user?.id },
        data: { avatar: avatarId },
      });
    }
    //
    return res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
