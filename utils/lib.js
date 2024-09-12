import { IronSessionOptions } from "iron-session";
//import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session";
export const defaultSession = {
  isLoggedIn: false
};

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: "ADMIN_CHIVATO",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  }
};
 