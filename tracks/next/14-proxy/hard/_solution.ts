import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname !== "/pricing") return NextResponse.next();

  const savedVariant = request.cookies.get("pricing-variant")?.value;
  let variant: "a" | "b";
  if (savedVariant === "a" || savedVariant === "b") {
    variant = savedVariant;
  } else {
    const bucket = [...(request.headers.get("x-anonymous-id") ?? "anonymous")]
      .reduce((sum, character) => sum + character.codePointAt(0)!, 0);
    variant = bucket % 2 === 0 ? "a" : "b";
  }
  const destination = request.nextUrl.clone();
  destination.pathname = `/pricing/${variant}`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pricing-variant", variant);
  const response = NextResponse.rewrite(destination, {
    request: { headers: requestHeaders },
  });
  response.cookies.set("pricing-variant", variant, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
