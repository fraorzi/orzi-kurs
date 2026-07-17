import java.util.*; class Solution { interface Identified { String id(); } static <T extends Identified> Map<String,T> index(List<T> values){return Map.of();} }
