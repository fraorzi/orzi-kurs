import type { Dependencies, PublishRequest, PublishResponse } from "./types";

function validate(request: PublishRequest): { title: string } | PublishResponse {
  if (!/^[A-Za-z0-9]{24}$/.test(request.documentId)) {
    return { status: 400, body: { error: "INVALID_DOCUMENT_ID" } };
  }
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(request.locale)) {
    return { status: 400, body: { error: "INVALID_LOCALE" } };
  }
  if (typeof request.title !== "string" || request.title.trim().length < 3) {
    return { status: 400, body: { error: "INVALID_TITLE" } };
  }
  return { title: request.title.trim() };
}

export async function publishArticle(
  dependencies: Dependencies,
  request: PublishRequest,
): Promise<PublishResponse> {
  if (request.role !== "editor" && request.role !== "admin") {
    return { status: 403, body: { error: "FORBIDDEN" } };
  }

  const validated = validate(request);
  if ("status" in validated) return validated;

  let mediaId: string | undefined;
  try {
    if (request.file) mediaId = await dependencies.media.upload(request.file);
    await dependencies.documents.update({
      documentId: request.documentId,
      locale: request.locale,
      data: {
        title: validated.title,
        ...(mediaId ? { cover: mediaId } : {}),
      },
    });
    const published = await dependencies.documents.publish({
      documentId: request.documentId,
      locale: request.locale,
    });
    const body = await dependencies.sanitize(published);
    await dependencies.webhook({
      documentId: request.documentId,
      locale: request.locale,
      action: "publish",
    });
    return { status: 200, body };
  } catch {
    if (mediaId) await dependencies.media.remove(mediaId);
    return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}

