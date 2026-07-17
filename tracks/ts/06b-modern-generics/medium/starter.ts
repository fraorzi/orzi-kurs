export function selectOption<const Options extends readonly string[]>(
  options: Options,
  requested: string | undefined,
  fallback: Options[number],
): Options[number] {
  // TODO: fallback ma używać NoInfer<Options[number]>
  return fallback;
}
