// import { NextRequest, NextResponse } from "next/server";
// import Negotiator from "negotiator";
// import { match } from "@formatjs/intl-localematcher";
// let locales = ["en", "th"];
// let defaultLocale = "en";
// const PUBLIC_FILE = /\.(.*)$/;
// const cookieName = "i18nlang";
// // Get the preferred locale, similar to the above or using a library
// function getLocale(request: NextRequest): string {
//   // Get locale from cookie
//   if (request.cookies.has(cookieName))
//     return request.cookies.get(cookieName)!.value;
//   // Get accept language from HTTP headers
//   const acceptLang = request.headers.get("Accept-Language");
//   if (!acceptLang) return defaultLocale;
//   // Get match locale
//   const headers = { "accept-language": acceptLang };
//   const languages = new Negotiator({ headers }).languages();
//   return match(languages, locales, defaultLocale);
// }
// export function middleware(request: NextRequest) {
//   if (PUBLIC_FILE.test(request.nextUrl.pathname)) {
//     return;
//   }

//   if (request.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();

//   // Check if there is any supported locale in the pathname

//   const { pathname } = request.nextUrl;

//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );
//   if (pathnameHasLocale) {
//     return;
//   }
//   // Redirect if there is no locale
//   const locale = getLocale(request);

//   request.nextUrl.pathname = `/${locale}${pathname}`;
//   // e.g. incoming request is /products
//   // The new URL is now /en/products

//   return NextResponse.redirect(request.nextUrl);
// }
// export const config = {
//   matcher: [
//     // Skip all internal paths (_next)
//     "/((?!_next).*)",
//     // Optional: only run on root (/) URL
//     // '/'
//   ],
// };

import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getLocale } from "next-intl/server";
import { routing } from "./i18n/routing";

const publicPages = [
  "/",
  "/auth/login",
  "/auth/register",
  "/configure/upload",
  "/unauthorized-route",
];
const authPages = ["/auth/login", "/auth/login"];
// const privatePages = ['/dashboard']
const PUBLIC_FILE = /\.(.*)$/;

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // console.log(
        //   "inside authorized",
        //   token,
        //   token != null || token!.email === process.env.ADMIN_EMAIL
        // );
        return token && token!.email === process.env.ADMIN_EMAIL;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export default async function middleware(req: NextRequestWithAuth) {
  if (PUBLIC_FILE.test(req.nextUrl.pathname)) {
    return;
  }

  if (req.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();
  // const locale = await getLocale();
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  // console.log(req.nextUrl);

  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  // console.log(session);

  if (session) {
    const url = new URL(req.headers.get("x-middleware-rewrite") || req.nextUrl);
    const locale = url.pathname.split("/")[1];
    const isAdmin = session!.email === process.env.ADMIN_EMAIL ? true : false;

    // console.log(isAdmin, req.nextUrl.pathname);

    // const privatePathnameRegex = RegExp(
    //   `^(/(${routing.locales.join("|")}))?(${publicPages
    //     .flatMap((p) => (p === "/" ? ["", "/"] : p))
    //     .join("|")})/?$`,
    //   "i"
    // );

    // console.log(locale);

    if (!isAdmin && !publicPathnameRegex.test(req.nextUrl.pathname)) {
      console.log(
        "trying to enter dashboard",
        `${process.env.NEXTAUTH_URL}${locale}/unauthorized-route`
      );

      const unauthorizedURL = `${process.env.NEXTAUTH_URL}${locale}/unauthorized-route`;
      return NextResponse.redirect(unauthorizedURL);
    }

    if (req.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
    }
  }

  // console.log(publicPathnameRegex);
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return handleI18nRouting(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
    "/(en|th)/:path*",
    // '/dashboard/:path*'
    // Optional: only run on root (/) URL
    // '/'
  ],
};
// export const config = {
//   matcher: [
//     // Skip all internal paths (_next)
//     "/((?!_next).*)",
//     // Optional: only run on root (/) URL
//     // '/'
//   ],
// };
