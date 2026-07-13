export function weakBox(value) {
  const ref = new WeakRef(value);
  return { get: () => ref.deref() };
}
