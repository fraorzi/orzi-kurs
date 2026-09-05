export interface Incident {
  readonly id: string;
  readonly title: string;
  readonly pending?: boolean;
}

export interface DraftStorage {
  readonly getItem: (key: string) => string | null;
  readonly setItem: (key: string, value: string) => void;
}
