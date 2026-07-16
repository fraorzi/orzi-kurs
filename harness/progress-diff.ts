import { isDeepStrictEqual } from "node:util";
import type { Progress } from "./types";

export function changedProgressTaskIds(
  before: Progress,
  after: Progress,
): string[] {
  return [...new Set([...Object.keys(before), ...Object.keys(after)])]
    .filter((taskId) => !isDeepStrictEqual(before[taskId], after[taskId]))
    .sort((left, right) => left.localeCompare(right));
}
