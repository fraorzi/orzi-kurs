export interface Input { idempotencyKey: string; title: unknown; quantity: unknown }
export interface Result { documentId: string; status: "published" }
export interface Dependencies {
  currentUser(): Promise<{ id: string; role: "seller" | "buyer" } | null>;
  findResult(key: string): Promise<Result | null>;
  reserve(quantity: number): Promise<void>;
  release(quantity: number): Promise<void>;
  createDraft(data: { title: string; ownerId: string }): Promise<string>;
  publish(documentId: string): Promise<void>;
  saveResult(key: string, result: Result): Promise<void>;
  revalidate(tag: string): void;
  log(event: object): void;
}

