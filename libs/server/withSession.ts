import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  //타입스크립트가 세션을 이해함.
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrot-session",
  password: process.env.COOKIE_PASSWORD!,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
