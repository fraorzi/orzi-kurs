export function solve(
  error: unknown,
  requestId: string,
): {
  status: number;
  body: {
    error: string;
    requestId: string;
  };
} {
  throw new Error("TODO");
}
