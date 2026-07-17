export interface HandlerContext {
  readonly requestId: string;
  readonly body?: unknown;
}

export interface HandlerResult {
  readonly status: number;
  readonly body: unknown;
}

export interface Route {
  readonly method: string;
  readonly path: string;
  handler(context: HandlerContext): Promise<HandlerResult>;
}

export type RouteMatch =
  | { readonly kind: "match"; readonly route: Route }
  | { readonly kind: "method-mismatch"; readonly allow: readonly string[] }
  | { readonly kind: "not-found" };

export interface ResponseSnapshot {
  readonly status: number;
  readonly body: unknown;
}

export interface IdempotencyStore {
  get(key: string): ResponseSnapshot | undefined;
  remember(key: string, snapshot: ResponseSnapshot): void;
}

export interface AppOptions {
  readonly routes: readonly Route[];
  readonly maxBodyBytes: number;
  generateId(): string;
}
