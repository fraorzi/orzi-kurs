export function solve(
  file: string,
  packageType: "module" | "commonjs",
): "esm" | "cjs" {
  const ext = file.slice(file.lastIndexOf("."));
  if ([".mjs", ".mts"].includes(ext)) return "esm";
  if ([".cjs", ".cts"].includes(ext)) return "cjs";
  return packageType === "module" ? "esm" : "cjs";
}
