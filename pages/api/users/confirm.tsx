import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { token } = req.body; //1. receive token from FrontEnd
  //2. Looking for the token on db
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  //3. if there is no token found, return 404 error
  if (!foundToken) return res.status(404).end();

  //4. if the token is found, then put the userId of the Token to the req.session.user
  req.session.user = {
    id: foundToken.userId,
  };

  //5. save the session
  await req.session.save();

  //6. delete the session where its userId is same as the userId of the foundToken
  await client.token.deleteMany({
    where: { userId: foundToken.userId },
  });

  return res.json({ ok: true });
}

//Use helper Function for Iron Session
export default withApiSession(withHandler({ method: "POST", handler, isPrivate: false }));
