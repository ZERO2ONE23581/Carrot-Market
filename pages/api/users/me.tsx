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

//For ONLY logged in user!
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  //Find the user with matched session
  const profile = await client.user.findUnique({ where: { id: req.session.user?.id } });
  return res.json({ ok: true, profile });
}

export default withApiSession(withHandler({ method: "GET", handler }));
