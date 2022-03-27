import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  //### UPSERT를 활용한 리팩토링 ###

  //1. 이메일(번호)을 입력했다면 ? => 해당하는 user를 찾는다.
  const payload = email ? { email } : { phone: +phone };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    //2. 해당 user 없다면 입력값으로 새로운 user 데이터 생성
    create: {
      name: "Anonymous",
      ...payload,
    },
    //3. 업데이트는 안함. (upsert사용시 필수적으로 코드 써줘야함)
    update: {},
  });
  console.log(user);

  return res.status(200).end();
}

export default withHandler("POST", handler);
