import java.util.Arrays;
class Solution {
  static int sum(int[][] matrix) { int total = 0; for (int[] row : matrix) for (int value : row) total = Math.addExact(total, value); return total; }
  static int[] flatten(int[][] matrix) { int size = Arrays.stream(matrix).mapToInt(row -> row.length).sum(); int[] output = new int[size]; int index = 0; for (int[] row : matrix) for (int value : row) output[index++] = value; return output; }
}
