import java.util.*;class Solution{interface Fetch{String get(String key)throws Exception;}static String load(String key,Map<String,String>cache,Fetch fetch)throws Exception{return fetch.get(key);}}
