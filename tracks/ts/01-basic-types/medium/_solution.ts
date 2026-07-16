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

const FLOW: Record<Status, Status> = {
  draft: STATUS.review,
  review: STATUS.published,
  published: STATUS.published,
};

export function nextStatus(current: Status): Status {
  return FLOW[current];
}

export function describeStatus(current: Status): string {
  return `${LABELS[current]} (${current})`;
}
