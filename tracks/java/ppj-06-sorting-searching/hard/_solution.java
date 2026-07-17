import java.util.*; class Solution {
  private static final Comparator<String> ORDER = Comparator
    .comparing((String value) -> value.toLowerCase(Locale.ROOT))
    .thenComparing(Comparator.naturalOrder());
  static List<String> sort(List<String> values) { List<String> copy = new ArrayList<>(values); copy.sort(ORDER); return List.copyOf(copy); }
  static int find(List<String> values, String target) { return Collections.binarySearch(values, target, ORDER); }
}
