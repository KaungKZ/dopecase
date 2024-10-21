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
  "/configure/design",
  "/configure/preview",
  "/thank-you",
  "/unauthorized-route",
  "/not-found",
];

const privatePages = ["/dashboard"];
const PUBLIC_FILE = /\.(.*)$/;

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    return handleI18nRouting(req);
  },

  {
    callbacks: {
      authorized: ({ token }) => {
        console.log(token);
        return !!token && token.email === process.env.ADMIN_EMAIL;
      },
    },

    pages: {
      signIn: "/auth/login",
    },
  }
);

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

  const privatePathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${privatePages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const url = new URL(req.headers.get("x-middleware-rewrite") || req.nextUrl);
  const locale = url.pathname.split("/")[1] as any;

  // if locale is not a valid locale, redirect to default locale

  if (locale !== "auth" && !routing.locales.includes(locale)) {
    const notFoundURL = `${process.env.NEXTAUTH_URL}en`;
    return NextResponse.redirect(notFoundURL);
  }

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

  // default 404 handling doesn't work because it will always goes to unauthorize page on mismatch urls
  // if url is not either public or private page, redirect to 404 page

  if (!isPublicPage && !isPrivatePage) {
    const notFoundURL = `${process.env.NEXTAUTH_URL}${locale}/not-found`;
    return NextResponse.redirect(notFoundURL);
  }

  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // check if user is logged in

  if (session) {
    const isAdmin = session.email === process.env.ADMIN_EMAIL;

    // if current url is private route and user is not admin, redirect to unauthorize route

    if (!isAdmin && privatePathnameRegex.test(req.nextUrl.pathname)) {
      const unauthorizedURL = `${process.env.NEXTAUTH_URL}${locale}/unauthorized-route`;
      return NextResponse.redirect(unauthorizedURL);
    }

    // if current url is authentication routes (sign in, sign up) which they already passed through, redirect them to home page

    if (req.nextUrl.pathname.startsWith(`/${locale}/auth`)) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
    }
  }

  // if user is not logged in

  if (isPublicPage) {
    // if current url is public page, proceed

    return handleI18nRouting(req);
  } else {
    // if not, redirect to login page

    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
    "/(en|th)/:path*",
  ],
};
