export function solve(
  repo: {
    create(
      input: { title: string },
      requestId: string,
    ): Promise<{ id: string; title: string }>;
  },
  log: (entry: { requestId: string; status: number }) => void,
): (request: Request) => Promise<Response> {
  throw new Error("TODO");
}
