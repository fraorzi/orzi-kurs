export function solve(name: string): string {
  const base = name.replaceAll("\\", "/").split("/").at(-1) ?? "";
  const dot = base.lastIndexOf(".");
  const extension = dot > 0 ? base.slice(dot + 1).toLowerCase() : "";
  if (!["jpg", "jpeg", "png", "webp"].includes(extension))
    throw new Error("Niedozwolony plik");
  const safe = base
    .slice(0, dot)
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replaceAll("ł", "l")
    .replaceAll("Ł", "L")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .split("-")
    .filter(Boolean)
    .join("-")
    .slice(0, 80);
  if (!safe) throw new Error("Pusta nazwa");
  return `${safe}.${extension === "jpeg" ? "jpg" : extension}`;
}
