class Solution {
  static String reverse(String input) { int[] points = input.codePoints().toArray(); StringBuilder output = new StringBuilder(); for (int index = points.length - 1; index >= 0; index--) output.appendCodePoint(points[index]); return output.toString(); }
  static int length(String input) { return input.codePointCount(0, input.length()); }
}
