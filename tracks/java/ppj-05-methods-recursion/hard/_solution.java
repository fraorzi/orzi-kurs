class Solution {
  static long factorial(int value) { if (value < 0) throw new IllegalArgumentException("negative"); if (value <= 1) return 1; return Math.multiplyExact(value, factorial(value - 1)); }
  static int sum(int... values) { int total=0; for (int value: values) total=Math.addExact(total,value); return total; }
}
