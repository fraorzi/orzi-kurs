import { describe, expect, it, vi } from "vitest";
import { requestJson } from "./starter";

describe("requestJson", () => {
  it("testuje pełny kontrakt request/response JSON", async () => {
    const handler = vi.fn(async (request: Request) => {
      expect(request.method).toBe("POST");
      expect(request.headers.get("content-type")).toBe("application/json");
      expect(request.headers.get("authorization")).toBe("Bearer test");
      await expect(request.json()).resolves.toEqual({ productId: "p-1" });
      return Response.json({ orderId: "o-7" }, {
        status: 201,
        headers: { Location: "/orders/o-7" },
      });
    });
    const result = await requestJson(handler, {
      method: "POST",
      url: "https://example.com/api/orders",
      headers: { Authorization: "Bearer test" },
      body: { productId: "p-1" },
    });
    expect(handler).toHaveBeenCalledOnce();
    expect(result.status).toBe(201);
    expect(result.headers.get("location")).toBe("/orders/o-7");
    expect(result.body).toEqual({ orderId: "o-7" });
  });

  it.each([
    [204, new Response(null, { status: 204 })],
    [200, new Response("plain", { headers: { "Content-Type": "text/plain" } })],
  ] as const)("nie parsuje body odpowiedzi %s", async (_status, response) => {
    const result = await requestJson(async () => response, {
      method: "DELETE",
      url: "https://example.com/api/order/o-1",
    });
    expect(result.body).toBeNull();
  });
});
