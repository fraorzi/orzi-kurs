export interface Describable {
  describe(): string;
}

export abstract class Shape implements Describable {
  abstract readonly kind: string;
  abstract area(): number;

  describe(): string {
    return `${this.kind}: ${this.area().toFixed(2)}`;
  }
}

export class Circle extends Shape {
  readonly kind = "circle";

  constructor(private readonly radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

export class Rectangle extends Shape {
  readonly kind: string = "rectangle";

  constructor(
    private readonly width: number,
    private readonly height: number,
  ) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }
}

export class Square extends Rectangle {
  override readonly kind: string = "square";

  constructor(side: number) {
    super(side, side);
  }
}

export function totalArea(shapes: readonly Shape[]): number {
  const sum = shapes.reduce((total, shape) => total + shape.area(), 0);
  return Math.round(sum * 100) / 100;
}

export function largest(shapes: readonly Shape[]): Shape | null {
  let best: Shape | null = null;
  for (const shape of shapes) {
    if (best === null || shape.area() > best.area()) best = shape;
  }
  return best;
}
