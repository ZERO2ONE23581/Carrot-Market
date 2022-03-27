import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;

  //1. 이메일(번호)을 입력했다면 ? => 해당하는 user를 찾는다.
  const payload = email ? { email } : { phone: +phone };

  //1. Token 생성 (payload와 user는 필수값)
  const token = await client.token.create({
    data: {
      payload: "1234",
      //token과 user를 연결
      user: {
        //1-1. user를 찾으면 찾은 user를 token과 연결
        //1-2. user를 찾지못하면 유저를 생성한다음 연결
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: "Anonymous",
            ...payload,
          },
        },
      },
    },
  });
  console.log(token);

  return res.status(200).end();
}

export default withHandler("POST", handler);
