import { createHistory } from "./history.js";

export function createStore(initialState = {}) {
  const history = createHistory({ ...initialState });
  const listeners = new Set();

  function notify() {
    const state = history.present;
    for (const listener of [...listeners]) {
      listener(state);
    }
  }

  function commit(next) {
    history.push(next);
    notify();
  }

  return {
    getState() {
      return history.present;
    },
    get(key) {
      return history.present[key];
    },
    set(key, value) {
      if (history.present[key] === value) return;
      commit({ ...history.present, [key]: value });
    },
    update(key, updater) {
      const value = updater(history.present[key]);
      if (history.present[key] === value) return;
      commit({ ...history.present, [key]: value });
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    undo() {
      if (!history.canUndo) return;
      history.undo();
      notify();
    },
    redo() {
      if (!history.canRedo) return;
      history.redo();
      notify();
    },
    get canUndo() {
      return history.canUndo;
    },
    get canRedo() {
      return history.canRedo;
    },
  };
}
