export const STATUS = {
  draft: "draft",
  review: "review",
  published: "published",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

export const LABELS: Record<Status, string> = {
  draft: "Szkic",
  review: "W recenzji",
  published: "Opublikowany",
};

export function nextStatus(current: Status): Status {
  const keys = Object.keys(
    STATUS,
  ) as (keyof typeof STATUS)[];
  const currentIndex = keys.indexOf(current);

  return currentIndex === keys.length - 1
    ? current
    : keys[currentIndex + 1];
}

export function describeStatus(current: Status): string {
  return `${LABELS[current]} (${current})`;
}
