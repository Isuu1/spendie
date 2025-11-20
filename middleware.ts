import { type NextRequest } from "next/server";
import { updateSession } from "@/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Run middleware on all routes except:
    // '/', '/login', 'signup', 'auth' and Next.js/static asset routes
    "/((?!api/auth|_next|favicon.ico|login|signup|auth|$).*)",
  ],
};
