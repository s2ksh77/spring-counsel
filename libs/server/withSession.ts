import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string;
    };
  }
}

export const cookieOptions = {
  cookieName: 'spring-counsel',
  password: process.env.COOKIE_PASSWORD!,
  cookieOptions: {
    maxAge: undefined,
  },
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOptions);
}
