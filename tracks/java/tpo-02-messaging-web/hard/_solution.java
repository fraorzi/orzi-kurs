import java.util.*;class Solution{static boolean handle(String id,Set<String>processed,Runnable effect){if(processed.contains(id))return false;effect.run();processed.add(id);return true;}}
