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
  throw new Error("TODO");
}
