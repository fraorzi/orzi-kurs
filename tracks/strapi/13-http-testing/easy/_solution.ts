export function solve(
  store: Map<string, Record<string, unknown>>,
): (request: Request) => Promise<Response> {
  return async (request) => {
    const documentId = new URL(request.url).pathname.split("/").pop() ?? "";
    const document = store.get(documentId);

    if (!document) {
      return Response.json(
        { error: { status: 404, name: "NotFoundError", message: "Nie znaleziono dokumentu" } },
        { status: 404 },
      );
    }

    return Response.json({ data: document }, { status: 200 });
  };
}
