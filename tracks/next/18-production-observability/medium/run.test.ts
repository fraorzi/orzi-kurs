import { describe, expect, it, vi } from "vitest";
import { createRequestLog, registerRuntimeInstrumentation } from "./starter";

describe("production instrumentation", () => {
  it.each(["nodejs", "edge"] as const)("ładuje wyłącznie adapter %s", async (runtime) => {
    const nodeRegister = vi.fn();
    const edgeRegister = vi.fn();
    const loadNode = vi.fn(async () => ({ register: nodeRegister }));
    const loadEdge = vi.fn(async () => ({ register: edgeRegister }));
    await registerRuntimeInstrumentation(runtime, loadNode, loadEdge);
    expect(loadNode).toHaveBeenCalledTimes(runtime === "nodejs" ? 1 : 0);
    expect(loadEdge).toHaveBeenCalledTimes(runtime === "edge" ? 1 : 0);
    expect(nodeRegister).toHaveBeenCalledTimes(runtime === "nodejs" ? 1 : 0);
    expect(edgeRegister).toHaveBeenCalledTimes(runtime === "edge" ? 1 : 0);
  });

  it("pomija nieznany runtime", async () => {
    const load = vi.fn(async () => ({ register: vi.fn() }));
    await registerRuntimeInstrumentation(undefined, load, load);
    expect(load).not.toHaveBeenCalled();
  });

  it("loguje tylko allow-listę bez query i sekretów", () => {
    expect(createRequestLog({
      requestId: "req-7",
      method: "GET",
      url: "https://example.com/account?token=secret",
      status: 503,
      durationMs: 12.7,
      errorCode: "UPSTREAM_TIMEOUT",
      headers: { authorization: "Bearer secret", cookie: "session=secret" },
    })).toEqual({
      requestId: "req-7",
      method: "GET",
      pathname: "/account",
      status: 503,
      durationMs: 13,
      errorCode: "UPSTREAM_TIMEOUT",
    });
  });
});
