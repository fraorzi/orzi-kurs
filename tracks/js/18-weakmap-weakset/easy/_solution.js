export function makeReadTracker() {
  const read = new WeakSet();
  return {
    markRead(message) {
      read.add(message);
    },
    isRead(message) {
      return read.has(message);
    },
  };
}
