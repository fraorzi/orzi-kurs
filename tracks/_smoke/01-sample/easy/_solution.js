export function sumEvens(nums) {
  return nums.filter((n) => n % 2 === 0).reduce((acc, n) => acc + n, 0);
}
