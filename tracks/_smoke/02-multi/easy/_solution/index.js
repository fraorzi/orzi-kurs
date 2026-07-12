import { sum } from "./math.js";

export function average(nums) {
  if (nums.length === 0) return 0;
  return sum(nums) / nums.length;
}
