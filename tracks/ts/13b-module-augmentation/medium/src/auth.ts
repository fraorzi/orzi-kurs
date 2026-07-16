import type { RequestContext } from "./request";

export type AuthUser = {
  id: number;
  roles: readonly string[];
};

// TODO: declare module "./request" i rozszerz RequestContext o user?: AuthUser.

export function attachUser(
  context: RequestContext,
  user: AuthUser,
): RequestContext {
  // TODO: nowy obiekt
  return context;
}

export function requireUser(context: RequestContext): AuthUser {
  // TODO
  throw new Error("TODO");
}
