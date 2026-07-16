// TODO: generyczny Store<State> z kluczem powiązanym z wartością.
export interface Store<State extends object> {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  snapshot(): State;
}

export function createStore(initial: object): Store<object>;
