export interface Describable {
  describe(): string;
}

// TODO: klasa abstrakcyjna implementująca Describable
export class Shape {
  kind = "";

  area(): number {
    return 0;
  }

  describe(): string {
    // TODO: "circle: 12.57"
    return "";
  }
}

// TODO: Circle(radius) — kind "circle", area = π r²
export class Circle extends Shape {}

// TODO: Rectangle(width, height) — kind "rectangle", area = w * h
export class Rectangle extends Shape {}

// TODO: Square(side) — dziedziczy po Rectangle, kind "square"
export class Square extends Rectangle {}

export function totalArea(shapes: readonly Shape[]): number {
  // TODO: suma pól zaokrąglona do dwóch miejsc
  return 0;
}

export function largest(shapes: readonly Shape[]): Shape | null {
  // TODO: największe pole; remis → pierwszy; pusta lista → null; bez mutacji wejścia
  return null;
}
