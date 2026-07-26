export interface RequestMeta {
  requestId: string;
  startedAt: number;
}

// TODO

export function requestLabel(meta: RequestMeta): string {
  // TODO
  return meta.requestId;
}
