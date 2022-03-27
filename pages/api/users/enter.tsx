import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { email, phone } = req.body;

  const payload = Math.floor(100000 + Math.random() * 900000) + ""; //여섯자리랜덤숫자
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false }); //Bad Request

  //Create Token and User
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);

  return res.json({ ok: true });
}

export default withHandler("POST", handler);
