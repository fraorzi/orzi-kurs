import java.util.*; class Solution {
  record Item(String id,String name,int quantity){ Item { if(id.isBlank()||name.isBlank()||quantity<0) throw new IllegalArgumentException("invalid item"); } }
  static List<Item> parse(List<String> lines){ Map<String,Item> items=new LinkedHashMap<>(); for(String line:lines){ String[] p=line.split(",",-1); if(p.length!=3) throw new IllegalArgumentException("columns"); Item item=new Item(p[0].trim(),p[1].trim(),Integer.parseInt(p[2].trim())); if(items.putIfAbsent(item.id(),item)!=null) throw new IllegalArgumentException("duplicate"); } return List.copyOf(items.values()); }
  static String report(List<Item> items){ StringBuilder out=new StringBuilder(); items.stream().sorted(Comparator.comparing(Item::id)).forEach(item -> out.append(item.id()).append(':').append(item.quantity()).append('\n')); return out.toString(); }
}
