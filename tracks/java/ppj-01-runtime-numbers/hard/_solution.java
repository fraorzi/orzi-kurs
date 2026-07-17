class Solution {
  static long add(int left, int right) { return Math.addExact((long) left, (long) right); }
  static boolean hasFlag(int value, int mask) { return (value & mask) == mask; }
}
