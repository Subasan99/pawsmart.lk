import { user } from "@nextui-org/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { toast } from "sonner";

const protectedRoutes = ["/admin", "/doctor"];

const authRoutes = ["/signin", "/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    const userRole = req.cookies.get("token")?.value;
    if (!userRole) {
      return;
    }

    const loginDetails = JSON.parse(userRole);
    if (loginDetails.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    if (loginDetails.role === "USER") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const userRole = req.cookies.get("token")?.value;

    if (!userRole) {
      return NextResponse.redirect(new URL("/unavailable", req.url));
    }

    const loginDetails = JSON.parse(userRole);

    if (pathname.startsWith("/admin") && loginDetails.role !== "ADMIN") {
      toast.error("You don't have access to this page!");
      return NextResponse.redirect(new URL("/unavailable", req.url));
    }

    if (pathname.startsWith("/doctor") && loginDetails.role !== "DOCTOR") {
      toast.error("You don't have access to this page!");
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/signin", "/signup"],
};
