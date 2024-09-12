import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

let locales = ["en", "ua"];
let defaultLocale = "en";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: {
  nextUrl?: string | NextURL | URL;
  headers?: any;
}) {
  const { pathname } = request.nextUrl as NextURL;
  const locale = pathname.split("/")[1];
  return locales.includes(locale) ? locale : defaultLocale;
}

export function middleware(request: { nextUrl: NextURL | URL }) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  if (
    pathname.match(
      /\.(jpg|svg|png|jpeg|json|ico|webp|js|css|woff|woff2|ttf|otf|eot|gif|mp4|webm|ogv|flv|mp3|ogg|aac|oga)$/
    )
  ) {
    return;
  }
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /ru/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    //  '/'
  ],
};
