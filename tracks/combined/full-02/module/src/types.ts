export interface Webhook { id: string; secret: string; documentIds: string[] }
export interface Dependencies { fetchMany(ids: string[]): Promise<Record<string, string>>; apply(values: string[]): Promise<void>; log(event: object): void }

