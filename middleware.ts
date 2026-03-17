import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/ping")) {
    return new Response("pong", { status: 200 });
  }

  const { user, supabaseResponse } = await updateSession(request);

  if (!user) {
    const isAuthPage = ["/login", "/register"].includes(pathname);
    const isGuestRoute = pathname.startsWith("/api/auth/guest");

    if (isAuthPage || isGuestRoute) {
      return supabaseResponse;
    }

    const redirectUrl = encodeURIComponent(request.url);
    return NextResponse.redirect(
      new URL(`/api/auth/guest?redirectUrl=${redirectUrl}`, request.url)
    );
  }

  const isAnonymous = user.is_anonymous ?? false;
  if (!isAnonymous && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
