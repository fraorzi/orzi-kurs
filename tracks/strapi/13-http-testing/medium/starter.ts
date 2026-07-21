export type Role = "anonymous" | "editor" | "admin";

const RANK: Record<Role, number> = { anonymous: 0, editor: 1, admin: 2 };

export function solve(requiredRole: Role): (request: Request) => Promise<Response> {
  return async (request) => {
    const role = (request.headers.get("x-role") ?? "admin") as Role;

    if (RANK[role] < RANK[requiredRole]) {
      return Response.json(
        { error: { status: 403, name: "ForbiddenError", message: "Brak uprawnień" } },
        { status: 403 },
      );
    }
    return Response.json({ data: { ok: true } }, { status: 200 });
  };
}
