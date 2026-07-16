// TODO: mapa stałych — wartości mają zostać literałami (as const).
export const STATUS = {
  draft: "draft",
  review: "review",
  published: "published",
};

// TODO: unia WARTOŚCI mapy STATUS, wyprowadzona z niej (nie przepisana ręcznie).
export type Status = string;

// TODO: etykiety dla każdego statusu; typ ma wymuszać komplet (Record<Status, string>).
export const LABELS = {};

export function nextStatus(current: Status): Status {
  // TODO: draft → review → published → published
  return current;
}

export function describeStatus(current: Status): string {
  // TODO: "W recenzji (review)"
  return "";
}
