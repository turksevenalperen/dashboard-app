import { auth } from "@/auth"; // next-auth@beta
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = await auth();

  const pathname = req.nextUrl.pathname;

  // Kullanıcı giriş yaptıysa ve giriş ekranına gitmeye çalışıyorsa, dashboard'a yönlendir
  if (pathname.startsWith("/auth/login") && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Kullanıcı giriş yapmadıysa ve korunan bir sayfaya gitmeye çalışıyorsa, login'e yönlendir
  const protectedPaths = ["/dashboard", "/meProfile", "/create", "/settings"];
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}
