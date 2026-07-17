import type { AppOptions } from "./types";

export function createApp(
  options: AppOptions,
): (request: Request) => Promise<Response> {
  throw new Error("TODO");
}
