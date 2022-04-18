import { NextApiRequest, NextApiResponse } from 'next';

export default function withHandler({
  methods,
  isPrivate = true,
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    //
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    //로그인 protection
    if (isPrivate && !req.session.user) {
      return res
        .status(401)
        .json({ ok: false, errorMessage: 'YOU NEED TO LOG IN!' });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

//ts
export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = 'GET' | 'POST' | 'DELETE';

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}
