export function selectOption<const Options extends readonly string[]>(
  options: Options,
  requested: string | undefined,
  fallback: Options[number],
): Options[number] {
  // TODO
  return fallback;
}
