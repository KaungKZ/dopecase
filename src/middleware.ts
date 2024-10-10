import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const publicPages = [
  "/",
  "/auth/login",
  "/auth/register",
  "/configure/upload",
  "/unauthorized-route",
];
const PUBLIC_FILE = /\.(.*)$/;

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    return handleI18nRouting(req);
  },

  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token && token.email === process.env.ADMIN_EMAIL;
      },
    },

    pages: {
      signIn: "/auth/login",
    },
  }
);

// const authMiddleware = withAuth({
//   callbacks: {
//     authorized: async ({ token, req }) => {
//       return !!token && token.email === process.env.ADMIN_EMAIL;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
// });

export default async function middleware(req: NextRequest) {
  if (PUBLIC_FILE.test(req.nextUrl.pathname)) {
    return;
  }

  if (req.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();

  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session) {
    const url = new URL(req.headers.get("x-middleware-rewrite") || req.nextUrl);
    const locale = url.pathname.split("/")[1];
    const isAdmin = session.email === process.env.ADMIN_EMAIL;

    if (!isAdmin && !publicPathnameRegex.test(req.nextUrl.pathname)) {
      const unauthorizedURL = `${process.env.NEXTAUTH_URL}${locale}/unauthorized-route`;
      return NextResponse.redirect(unauthorizedURL);
    }

    if (req.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
    }
  }

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return handleI18nRouting(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
    "/(en|th)/:path*",
  ],
};
