export type Zip<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = {
  readonly [K in keyof Left]: readonly [Left[K], Right[K & keyof Right]];
};

export function zip<
  const Left extends readonly unknown[],
  const Right extends readonly unknown[] & { length: Left["length"] },
>(left: Left, right: Right): Zip<Left, Right> {
  return left.map((value, index) => [value, right[index]] as const) as Zip<
    Left,
    Right
  >;
}
