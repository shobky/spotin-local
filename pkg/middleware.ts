import { withAuth } from "next-auth/middleware";

const ADMINS: any = {
  "shobkyy@gmail.com": true,
  "zashobky4@gmail.com": true,
  "mohamedbakr.5957@gmail.com": true,
  "teamxappee@gmail.com": true,
  "mohamedhammad69@gmail.com": true,
};

const SUPER_ADMINS: any = {
  "shobkyy@gmail.com": true,
  "zashobky4@gmail.com": false,
  "mohamedbakr.5957@gmail.com": true,
  "mohamedhammad69@gmail.com": true,
  "teamxappee@gmail.com": true,
};

export default withAuth(function middleware() {}, {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/signout",
  },
  callbacks: {
    authorized: async ({ req, token }) => {
      const pathname = req.nextUrl.pathname;

      if (pathname.startsWith("/login")) {
        return true;
      }

      if (!token) {
        return false;
      }

      // if admin give pass unless route needs super admin privlages..
      if (token.email && ADMINS[token.email]) {
        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/control-panel")
        ) {
          if (SUPER_ADMINS[token.email]) return true;
          return false;
        }
        return true;
      }

      return false;
    },
  },
});
