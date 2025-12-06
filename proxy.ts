import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/supabase/middleware";

export async function proxy(request: NextRequest) {
  const publicRoutes = ["/", "/login", "/signup", "/auth"];

  // If the current URL starts with any public route, skip middleware entirely.
  if (publicRoutes.some((r) => request.nextUrl.pathname.startsWith(r))) {
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api/auth).*)"],
};
