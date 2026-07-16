export interface RequestContext {
  requestId: string;
  path: string;
}

export function createRequestContext(
  requestId: string,
  path: string,
): RequestContext {
  return { requestId, path };
}
