const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
export function solve(file: { mime: string; size: number }): boolean {
  return ALLOWED.has(file.mime) && Number.isInteger(file.size) && file.size > 0 && file.size <= 5 * 1024 * 1024;
}

