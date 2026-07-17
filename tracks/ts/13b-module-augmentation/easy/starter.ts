export interface RequestMeta {
  requestId: string;
  startedAt: number;
}

// TODO: druga deklaracja interface RequestMeta z userId i roles.

export function requestLabel(meta: RequestMeta): string {
  // TODO
  return meta.requestId;
}
