import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Next.js 16+: substitui "middleware"; injeta locale no request para o RootLayout
 * definir `<html lang="…">` em /pt, /en e /es.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let htmlLang = "pt-BR";
  if (pathname.startsWith("/en")) htmlLang = "en";
  else if (pathname.startsWith("/es")) htmlLang = "es";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname-html-lang", htmlLang);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/", "/pt", "/pt/:path*", "/en", "/en/:path*", "/es", "/es/:path*"],
};
