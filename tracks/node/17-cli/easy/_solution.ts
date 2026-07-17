export function solve(
  result:
    | {
        ok: true;
        data: unknown;
      }
    | {
        ok: false;
        kind: "usage" | "internal";
        message: string;
      },
  json: boolean,
): {
  stdout: string;
  stderr: string;
  exitCode: number;
} {
  if (result.ok)
    return {
      stdout: json
        ? JSON.stringify(result.data) + "\n"
        : String(result.data) + "\n",
      stderr: "",
      exitCode: 0,
    };
  const exitCode = result.kind === "usage" ? 2 : 1;
  return {
    stdout: "",
    stderr:
      (json
        ? JSON.stringify({ error: result.message, code: result.kind })
        : `Error: ${result.message}`) + "\n",
    exitCode,
  };
}
