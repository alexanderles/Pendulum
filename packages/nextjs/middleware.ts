import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("request: ", request)
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail" || path === "/pendulum" || path === "/";
  const token = request.cookies.get("token")?.value || "";
  console.log("TOKEN: ", token)
  console.log("URL:", request.nextUrl.href)

  if (isPublicPath && !token) {
    console.log("IS");
    return NextResponse.redirect(new URL("/", request.nextUrl.href));
  }

  if (!isPublicPath && !token) {
    console.log("NOT");
    return NextResponse.redirect(new URL("/login", request.nextUrl.href));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail", "/pendulum"],
};