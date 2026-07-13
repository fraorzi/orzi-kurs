export function createGate() {
  const { promise, resolve, reject } = Promise.withResolvers();
  return { opened: promise, open: resolve, fail: reject };
}
