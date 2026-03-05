import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const isMoviesPage = request.nextUrl.pathname === "/movies";
  const hasQueryString = request.nextUrl.searchParams.size > 0;

  // prevent indexing of /movies route with query string
  if (isMoviesPage && hasQueryString) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: ["/movies"],
};
