// TODO
export type Reverse<
  Input extends readonly unknown[],
  Acc extends readonly unknown[] = readonly [],
> = Input;

export function reverseTuple<const Input extends readonly unknown[]>(
  input: Input,
): Reverse<Input> {
  // TODO
  return input;
}
