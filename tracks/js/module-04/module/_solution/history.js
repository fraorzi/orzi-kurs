export function createHistory(initial) {
  const past = [];
  let present = initial;
  const future = [];

  return {
    get present() {
      return present;
    },
    get canUndo() {
      return past.length > 0;
    },
    get canRedo() {
      return future.length > 0;
    },
    push(next) {
      past.push(present);
      present = next;
      future.length = 0;
    },
    undo() {
      if (past.length === 0) return present;
      future.push(present);
      present = past.pop();
      return present;
    },
    redo() {
      if (future.length === 0) return present;
      past.push(present);
      present = future.pop();
      return present;
    },
  };
}
