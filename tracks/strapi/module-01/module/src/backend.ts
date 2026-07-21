import type { Dependencies, PublishRequest, PublishResponse } from "./types";

export async function publishArticle(
  dependencies: Dependencies,
  request: PublishRequest,
): Promise<PublishResponse> {
  void dependencies;
  void request;
  return { status: 501, body: { error: "TODO" } };
}

