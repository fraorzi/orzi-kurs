import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ createItem: vi.fn() }));
vi.mock("./src/item-store", () => ({ createItem: mocks.createItem }));

import { OPTIONS, POST } from "./src/route";

function request(body: string, headers: Readonly<Record<string, string | undefined>> = {}) {
  const requestHeaders = new Headers({
    origin: "https://partner.example",
    "x-api-key": "secret",
    "content-type": "application/json",
  });
  for (const [name, value] of Object.entries(headers)) {
    if (value !== undefined) requestHeaders.set(name, value);
  }

  return new Request("https://app.example/api/items", {
    method: "POST",
    headers: requestHeaders,
    body,
  });
}

describe("partner items route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("PARTNER_API_KEY", "secret");
    mocks.createItem.mockImplementation(async (name: string) => ({ id: "i-7", name }));
  });

  it("obsługuje preflight tylko dla allow-listy", async () => {
    const response = await OPTIONS(new Request("https://app.example/api/items", {
      method: "OPTIONS",
      headers: { origin: "https://partner.example" },
    }));
    expect(response.status).toBe(204);
    expect(response.headers.get("access-control-allow-origin"))
      .toBe("https://partner.example");
    expect(response.headers.get("access-control-allow-methods")).toBe("POST, OPTIONS");
  });

  it("tworzy zwalidowany zasób i ustawia Location", async () => {
    const response = await POST(request(JSON.stringify({ name: "  Monitor  " })));
    expect(response.status).toBe(201);
    expect(response.headers.get("location")).toBe("/api/items/i-7");
    expect(mocks.createItem).toHaveBeenCalledWith("Monitor");
  });

  it.each([
    { headers: { origin: "https://evil.example" }, body: "{}", status: 403 },
    { headers: { "x-api-key": "wrong" }, body: "{}", status: 401 },
    { headers: { "content-length": "2048" }, body: "{}", status: 413 },
    { headers: { "content-type": "text/plain" }, body: "{}", status: 415 },
    { headers: {}, body: "not-json", status: 400 },
    { headers: {}, body: JSON.stringify({ name: "" }), status: 400 },
  ])("odrzuca request statusem $status", async ({ headers, body, status }) => {
    expect((await POST(request(body, headers))).status).toBe(status);
    expect(mocks.createItem).not.toHaveBeenCalled();
  });
});
