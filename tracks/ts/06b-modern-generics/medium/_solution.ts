export function selectOption<const Options extends readonly string[]>(
  options: Options,
  requested: string | undefined,
  fallback: NoInfer<Options[number]>,
): Options[number] {
  return requested !== undefined && options.includes(requested)
    ? requested
    : fallback;
}
