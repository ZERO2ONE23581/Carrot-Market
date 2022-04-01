import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

declare module "iron-session" {
  //타입스크립트가 세션을 이해함.
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  console.log(req.session);
  const { token } = req.body;
  //입력한 토큰과 일치하는 토큰을 찾는다.
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: { user: true }, // 토큰을 찾고 유저와 연결한다.
  });
  //토큰을 찾지 못하면
  if (!exists) return res.status(404).end();

  //토큰을 찾으면 세션에 유저를 추가해주고, 그 유저의 아이디는 = 토큰의 유저아이디와 일치한다.
  req.session.user = {
    id: exists.userId,
  };
  await req.session.save();
  return res.status(200).end();
}

//이런식으로 감싸주면 session을 사용할 수 있음.
export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrot-session",
  password: "asdlfkjas;djlfkasdl;fjkasdfasl;dfkj", // 쿠키를 암호화하는 비번
});
