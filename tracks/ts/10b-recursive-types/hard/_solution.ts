export type Reverse<
  Input extends readonly unknown[],
  Acc extends readonly unknown[] = readonly [],
> = Input extends readonly [infer Head, ...infer Tail]
  ? Reverse<Tail, readonly [Head, ...Acc]>
  : Acc;

export function reverseTuple<const Input extends readonly unknown[]>(
  input: Input,
): Reverse<Input> {
  return [...input].reverse() as unknown as Reverse<Input>;
}
