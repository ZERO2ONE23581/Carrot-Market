import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: "GET" | "POST" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({ method, isPrivate = true, handler }: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse): Promise<any> {
    if (req.method !== method) {
      return res.status(405).end();
    }
    //로그인 protection
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, errorMessage: "YOU NEED TO LOG IN!" });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
