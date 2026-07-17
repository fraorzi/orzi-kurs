import java.util.*;class Solution{interface Tx{void begin();void insert(String id,int amount);void commit();void rollback();}static void run(List<String>rows,Tx tx){}}
