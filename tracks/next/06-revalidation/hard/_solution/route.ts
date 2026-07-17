import { revalidateTag } from "next/cache";

interface PublishedArticle {
  readonly event: "article.published";
  readonly tenantId: string;
  readonly slug: string;
}

function parsePublishedArticle(value: unknown): PublishedArticle | null {
  if (
    typeof value !== "object" ||
    value === null ||
    !("event" in value) ||
    value.event !== "article.published" ||
    !("tenantId" in value) ||
    typeof value.tenantId !== "string" ||
    value.tenantId.trim() === "" ||
    !("slug" in value) ||
    typeof value.slug !== "string" ||
    value.slug.trim() === ""
  ) return null;

  return { event: value.event, tenantId: value.tenantId, slug: value.slug };
}

export async function POST(request: Request): Promise<Response> {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CMS_WEBHOOK_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const article = parsePublishedArticle(payload);
  if (!article) return Response.json({ ignored: true }, { status: 202 });

  revalidateTag("articles", { expire: 0 });
  revalidateTag(`tenant:${article.tenantId}:articles`, { expire: 0 });
  revalidateTag(`tenant:${article.tenantId}:article:${article.slug}`, { expire: 0 });
  return Response.json({ revalidated: true });
}
