class Solution {
  static String command(String[] args) {
    if (args.length != 2) return "usage: <add|mul> <number>";
    int value;
    try { value = Integer.parseInt(args[1]); } catch (NumberFormatException error) { return "invalid number"; }
    return switch (args[0]) { case "add" -> "result=" + (value + 1); case "mul" -> "result=" + (value * 2); default -> "unknown command"; };
  }
}
