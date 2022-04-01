import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

declare module "iron-session" {
  //타입스크립트가 세션을 이해함.
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  console.log(req.session.user);
  const profile = await client.user.findUnique({ where: { id: req.session.user?.id } });
  return res.json({ ok: true, profile });
}

//이런식으로 감싸주면 session을 사용할 수 있음.
export default withApiSession(withHandler("GET", handler));
