import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Pages that need a logged-in user.
const PRIVATE_PATHS = ["/dashboard", "/reset-password"];
// Pages a logged-in user doesn't need to see.
const LOGGED_OUT_PATHS = ["/login", "/signup"];
// Headers Supabase asks us to send so login cookies are never cached.
const CACHE_HEADERS = ["Cache-Control", "Expires", "Pragma"];

// Runs before every page: refreshes the login session if it has expired,
// then sends visitors to the right place. Pages still check the user
// themselves; this is only a quick first check.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) =>
            response.headers.set(key, value),
          );
        },
      },
    },
  );

  // Don't add code between createServerClient and getClaims: this call is
  // what refreshes the session.
  const { data } = await supabase.auth.getClaims();
  const isLoggedIn = Boolean(data?.claims);
  const path = request.nextUrl.pathname;

  const isPrivate = PRIVATE_PATHS.some(
    (p) => path === p || path.startsWith(`${p}/`),
  );
  if (!isLoggedIn && isPrivate) {
    return redirectKeepingCookies(request, response, "/login");
  }
  if (isLoggedIn && LOGGED_OUT_PATHS.includes(path)) {
    return redirectKeepingCookies(request, response, "/dashboard");
  }

  return response;
}

function redirectKeepingCookies(
  request: NextRequest,
  response: NextResponse,
  pathname: string,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";

  const redirect = NextResponse.redirect(url);
  response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  CACHE_HEADERS.forEach((key) => {
    const value = response.headers.get(key);
    if (value) redirect.headers.set(key, value);
  });
  return redirect;
}
