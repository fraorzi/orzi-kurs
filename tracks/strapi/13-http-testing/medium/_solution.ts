export type Role = "anonymous" | "editor" | "admin";

const RANK: Record<Role, number> = { anonymous: 0, editor: 1, admin: 2 };

export function solve(requiredRole: Role): (request: Request) => Promise<Response> {
  return async (request) => {
    const role = (request.headers.get("x-role") ?? "anonymous") as Role;

    if (role === "anonymous" && requiredRole !== "anonymous") {
      return Response.json(
        { error: { status: 401, name: "UnauthorizedError", message: "Brak uwierzytelnienia" } },
        { status: 401 },
      );
    }
    if (RANK[role] < RANK[requiredRole]) {
      return Response.json(
        { error: { status: 403, name: "ForbiddenError", message: "Brak uprawnień" } },
        { status: 403 },
      );
    }
    return Response.json({ data: { ok: true } }, { status: 200 });
  };
}
