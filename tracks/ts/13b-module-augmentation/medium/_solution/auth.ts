import type { RequestContext } from "./request";

export type AuthUser = {
  id: number;
  roles: readonly string[];
};

declare module "./request" {
  interface RequestContext {
    user?: AuthUser;
  }
}

export function attachUser(
  context: RequestContext,
  user: AuthUser,
): RequestContext {
  return { ...context, user };
}

export function requireUser(context: RequestContext): AuthUser {
  if (context.user === undefined) throw new Error("unauthenticated");
  return context.user;
}
