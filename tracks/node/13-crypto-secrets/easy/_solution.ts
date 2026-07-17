import { randomBytes } from "node:crypto";
export function solve(bytes: number): string {
  if (!Number.isInteger(bytes) || bytes < 16)
    throw new Error("Minimum 16 bajtów");
  return randomBytes(bytes).toString("base64url");
}
