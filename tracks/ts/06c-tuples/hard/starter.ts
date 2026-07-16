// TODO: mapped tuple parująca elementy o tym samym indeksie.
export type Zip<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = readonly unknown[];

export function zip<
  const Left extends readonly unknown[],
  const Right extends readonly unknown[] & { length: Left["length"] },
>(left: Left, right: Right): Zip<Left, Right> {
  // TODO: nie mutuj wejść
  return [];
}
