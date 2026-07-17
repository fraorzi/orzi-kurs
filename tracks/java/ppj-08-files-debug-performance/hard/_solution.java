import java.io.*; import java.nio.charset.StandardCharsets; import java.nio.file.*; class Solution {
  static String report(Path path) throws IOException { StringBuilder output=new StringBuilder(); try(var lines=Files.lines(path, StandardCharsets.UTF_8)){ lines.map(String::trim).filter(line -> !line.isEmpty()).map(String::toUpperCase).forEach(line -> output.append(line).append('\n')); } return output.toString(); }
}
