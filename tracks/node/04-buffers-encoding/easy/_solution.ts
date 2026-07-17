export function solve(text: string, maxBytes: number): Uint8Array {
  const bytes = Buffer.from(text, "utf8");
  if (bytes.byteLength > maxBytes) throw new Error("Limit bajtów przekroczony");
  return bytes;
}
