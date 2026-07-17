export function solve(error: Error & { kind?: string }): { status: number; code: string; message: string } {
  return { status: 500, code: "ERROR", message: error.message };
}

