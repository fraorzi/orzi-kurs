import { timingSafeEqual } from "node:crypto";
export function solve(leftHex: string, rightHex: string): boolean {
  if (
    !/^(?:[0-9a-f]{2})+$/i.test(leftHex) ||
    !/^(?:[0-9a-f]{2})+$/i.test(rightHex)
  )
    return false;
  const left = Buffer.from(leftHex, "hex");
  const right = Buffer.from(rightHex, "hex");
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
