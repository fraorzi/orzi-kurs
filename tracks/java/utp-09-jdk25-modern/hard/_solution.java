import java.util.*;
class Solution {
  enum Status { STABLE, PREVIEW }
  record Feature(String name, Status status) {}
  static List<Feature> catalog() {
    return List.of(
      new Feature("module-imports", Status.STABLE),
      new Feature("compact-source-files", Status.STABLE),
      new Feature("flexible-constructor-bodies", Status.STABLE),
      new Feature("scoped-values", Status.STABLE),
      new Feature("structured-concurrency", Status.PREVIEW),
      new Feature("primitive-patterns", Status.PREVIEW)
    );
  }
  static List<String> core() {
    return catalog().stream()
      .filter(feature -> feature.status() == Status.STABLE)
      .map(Feature::name)
      .toList();
  }
}
