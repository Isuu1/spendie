// import { type NextRequest } from "next/server";
// import { updateSession } from "@/supabase/middleware";

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }

// export const config = {
//   matcher: [
//     // Run middleware on all routes except:
//     // '/', '/login', 'signup', 'auth' and Next.js/static asset routes
//     "/((?!api/auth|_next|favicon.ico|login|signup|auth|$).*)",
//   ],
// };
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/supabase/middleware";

export async function middleware(request: NextRequest) {
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
