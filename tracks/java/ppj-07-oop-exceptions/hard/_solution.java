class Solution {
  static class InvalidShape extends IllegalArgumentException { InvalidShape(String message){ super(message); } }
  static abstract class Shape { abstract double area(); }
  static final class Circle extends Shape { private final double radius; Circle(double radius){ if (!(radius>0)) throw new InvalidShape("radius"); this.radius=radius; } @Override double area(){return Math.PI*radius*radius;} }
  static double total(Shape... shapes){ double total=0; for(Shape shape:shapes) total+=shape.area(); return total; }
}
