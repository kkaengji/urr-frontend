import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const isAuthenticated = request.cookies.get("is_authenticated")?.value === "1";
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/landing", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
