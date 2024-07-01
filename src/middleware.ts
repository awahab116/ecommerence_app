import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("server session is ", session);

  const path = request.nextUrl.pathname;

  const isPubicPath = path === "/login" || path === "/";
  const isAdminPath = path === "/dashboard";

  if (session && isAdminPath && !session.isAdmin) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (session && isPubicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!session && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/login",
    "/product-detail/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/dashboard/:path*",
  ],
};
