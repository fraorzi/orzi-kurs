import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname !== "/pricing") return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = "/pricing/a";
  return NextResponse.rewrite(destination);
}
