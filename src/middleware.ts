import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPrefixes = ["/dashboard", "/token"];
const authOnlyRoutes = ["/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));
  const isAuthPage = authOnlyRoutes.some((p) => pathname.startsWith(p));

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtected && !token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && token) {
    const from = req.nextUrl.searchParams.get("from") || "/dashboard";
    const safeTarget =
      from.startsWith("/") && !from.startsWith("//") ? from : "/dashboard";
    return NextResponse.redirect(new URL(safeTarget, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/token/:path*", "/login"],
};
