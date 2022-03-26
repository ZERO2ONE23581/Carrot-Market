import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body.email);

  //만약 method가 post가 아니면  연결끊어줌
  if (req.method !== "POST") {
    res.status(401).end();
  }

  res.status(200).end();
}
