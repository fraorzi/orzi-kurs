// TODO: rekurencja po [Head, ...Tail] z akumulatorem.
export type Reverse<
  Input extends readonly unknown[],
  Acc extends readonly unknown[] = readonly [],
> = Input;

export function reverseTuple<const Input extends readonly unknown[]>(
  input: Input,
): Reverse<Input> {
  // TODO: utwórz odwróconą kopię
  return input;
}
