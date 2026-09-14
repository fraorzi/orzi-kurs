export interface Incident {
  id: string;
  title: string;
  pending?: boolean;
}

export interface DraftStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}
