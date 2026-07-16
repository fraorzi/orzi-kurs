export interface RequestMeta {
  requestId: string;
  startedAt: number;
}

export interface RequestMeta {
  userId?: number;
  roles?: readonly string[];
}

export function requestLabel(meta: RequestMeta): string {
  return meta.userId === undefined
    ? meta.requestId
    : `${meta.requestId}:user=${meta.userId}`;
}
