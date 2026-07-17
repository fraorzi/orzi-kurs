export function solve(
  entry: string,
  access: {
    read?: readonly string[];
    write?: readonly string[];
    worker?: boolean;
    child?: boolean;
  },
): string[] {
  const args = ["--permission"];
  for (const path of access.read ?? []) args.push(`--allow-fs-read=${path}`);
  for (const path of access.write ?? []) args.push(`--allow-fs-write=${path}`);
  if (access.worker) args.push("--allow-worker");
  if (access.child) args.push("--allow-child-process");
  return [...args, entry];
}
