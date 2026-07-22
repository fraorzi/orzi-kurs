// TODO
export const STATUS = {
  draft: "draft",
  review: "review",
  published: "published",
};

// TODO
export type Status = string;

// TODO
export const LABELS = {};

export function nextStatus(current: Status): Status {
  // TODO
  return current;
}

export function describeStatus(current: Status): string {
  // TODO
  return "";
}
