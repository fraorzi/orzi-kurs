import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  revalidateTag: vi.fn(),
  updateTag: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidateTag: mocks.revalidateTag,
  updateTag: mocks.updateTag,
}));

import { POST } from "./src/route";

function webhook(body: string, token = "secret") {
  return new Request("https://example.com/api/webhooks/cms", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body,
  });
}

describe("CMS publication webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("CMS_WEBHOOK_SECRET", "secret");
  });

  it("natychmiast wygasza tagi współdzielonych danych", async () => {
    const response = await POST(webhook(JSON.stringify({
      event: "article.published",
      tenantId: "acme",
      slug: "next-cache",
    })));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ revalidated: true });
    expect(mocks.revalidateTag.mock.calls).toEqual([
      ["articles", { expire: 0 }],
      ["tenant:acme:articles", { expire: 0 }],
      ["tenant:acme:article:next-cache", { expire: 0 }],
    ]);
    expect(mocks.updateTag).not.toHaveBeenCalled();
  });

  it.each([
    { request: webhook("{}", "wrong"), status: 401 },
    { request: webhook("not-json"), status: 400 },
    {
      request: webhook(JSON.stringify({
        event: "article.deleted",
        tenantId: "acme",
        slug: "next-cache",
      })),
      status: 202,
    },
  ])("nie unieważnia cache'u dla odpowiedzi $status", async ({ request, status }) => {
    expect((await POST(request)).status).toBe(status);
    expect(mocks.revalidateTag).not.toHaveBeenCalled();
    expect(mocks.updateTag).not.toHaveBeenCalled();
  });
});
