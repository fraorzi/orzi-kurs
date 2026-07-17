export function keyBy(
  items: readonly unknown[],
  keyOf: (item: unknown) => PropertyKey,
): Map<PropertyKey, unknown> {
  // TODO: generyczne T i K extends PropertyKey
  return new Map(items.map((item) => [keyOf(item), item]));
}
