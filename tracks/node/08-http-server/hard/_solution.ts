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
  if (error instanceof Error && error.name === "ValidationError")
    return { status: 400, body: { error: error.message, requestId } };
  return { status: 500, body: { error: "Internal Server Error", requestId } };
}
