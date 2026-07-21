export function solve(
  store: Map<string, Record<string, unknown>>,
): (request: Request) => Promise<Response> {
  return async (request) => {
    const documentId = new URL(request.url).pathname.split("/").pop() ?? "";
    return Response.json({ data: store.get(documentId) }, { status: 200 });
  };
}
