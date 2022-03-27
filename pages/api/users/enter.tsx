import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;

  //### UPSERT를 활용한 리팩토링 ###

  const user = await client.user.upsert({
    //1-1. 입력한 이메일이 있다면 ? => 해당하는 메일의 user를 찾는다.
    //1-2. 입력한 번호가 있다면 ? => 해당하는 번호의 user를 찾는다.
    where: {
      ...(email ? { email } : {}),
      ...(phone ? { phone: +phone } : {}),
    },
    //2. 없다면 입력값으로 새로운 user 데이터 생성
    create: {
      name: "Anonymous",
      ...(email ? { email } : {}),
      ...(phone ? { phone: +phone } : {}),
    },
    //3. 업데이트는 안함. (upsert사용시 필수적으로 코드 써줘야함)
    update: {},
  });
  console.log(user);

  return res.status(200).end();
}

export default withHandler("POST", handler);
