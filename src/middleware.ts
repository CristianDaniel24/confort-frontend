import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const parsedSession = JSON.parse(session.value);

    if (request.nextUrl.pathname.startsWith("/home")) {
      const isEmpleado = parsedSession.rol === "employee";
      if (!isEmpleado) {
        return NextResponse.redirect(new URL("/shop", request.url));
      }
    }
  } catch (e) {
    console.error("Error al parsear session", e);
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/home/:path*",
};
