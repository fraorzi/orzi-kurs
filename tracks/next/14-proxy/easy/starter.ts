import type { ProxyConfig } from "next/server";

export const config = {
  matcher: ["/((?!_next/static).*)"],
} satisfies ProxyConfig;
