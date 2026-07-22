export interface Describable {
  describe(): string;
}

// TODO
export class Shape {
  kind = "";

  area(): number {
    return 0;
  }

  describe(): string {
    // TODO
    return "";
  }
}

// TODO
export class Circle extends Shape {}

// TODO
export class Rectangle extends Shape {}

// TODO
export class Square extends Rectangle {}

export function totalArea(shapes: readonly Shape[]): number {
  // TODO
  return 0;
}

export function largest(shapes: readonly Shape[]): Shape | null {
  // TODO
  return null;
}
