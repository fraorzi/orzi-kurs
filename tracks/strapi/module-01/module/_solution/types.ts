export type Role = "public" | "editor" | "admin";

export interface PublishRequest {
  role: Role;
  documentId: string;
  locale: string;
  title: unknown;
  file?: { name: string; mime: string; size: number };
}

export interface PublishResponse {
  status: number;
  body: object;
}

export interface Dependencies {
  documents: {
    update(input: object): Promise<void>;
    publish(input: object): Promise<object>;
  };
  media: {
    upload(file: NonNullable<PublishRequest["file"]>): Promise<string>;
    remove(id: string): Promise<void>;
  };
  sanitize(value: object): Promise<object>;
  webhook(event: { documentId: string; locale: string; action: "publish" }): Promise<void>;
}

