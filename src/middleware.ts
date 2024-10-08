import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";

// import { match } from "@formatjs/intl-localematcher";
import { match } from "@formatjs/intl-localematcher";
let locales = ["en", "th"];
let defaultLocale = "en";
const PUBLIC_FILE = /\.(.*)$/;
const cookieName = "i18nlang";
// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
  // Get locale from cookie
  if (request.cookies.has(cookieName))
    return request.cookies.get(cookieName)!.value;
  // Get accept language from HTTP headers
  const acceptLang = request.headers.get("Accept-Language");
  if (!acceptLang) return defaultLocale;
  // Get match locale
  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}
export function middleware(request: NextRequest) {
  if (PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return;
  }

  if (request.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();

  // Check if there is any supported locale in the pathname

  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) {
    return;
  }
  // Redirect if there is no locale
  const locale = getLocale(request);
  // console.log(request.nextUrl);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products

  return NextResponse.redirect(request.nextUrl);
}
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",

    // Optional: only run on root (/) URL
    // '/'
  ],
};
