import java.util.*;
class Solution {
  enum Status { STABLE, PREVIEW }
  record Feature(String name, Status status) {}
  static List<Feature> catalog() { return List.of(); }
  static List<String> core() { return List.of(); }
}
