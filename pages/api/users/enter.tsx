import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  let user;
  //1. 유저가 입력한 이메일에 해당하는 유저가 있는지 찾는다.
  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log(`USER EXISTS!`);
    //1-2. 유저가 없다면 user = 지금 만든 유저
    if (!user) {
      console.log(`DIDN'T FIND USER.. WILL CREATE NOW!`);
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
    console.log(user);
  }

  //2. 유저가 입력한 휴대폰 번호에 해당하는 유저가 있는지 찾는다.
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log(`USER EXISTS!`);
    //2-2. 유저가 없다면 user = 지금 만든 유저
    if (!user) {
      console.log(`DIDN'T FIND USER.. WILL CREATE NOW!`);
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
    console.log(user);
  }

  return res.status(200).end();
}

export default withHandler("POST", handler);
