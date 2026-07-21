import { describe, expect, it } from "vitest";
import { observe } from "./starter";

const base = {
  requestId: "r1",
  method: "GET",
  url: "/articles?email=a@example.com&token=xyz",
  status: 503,
  durationMs: 42,
  userId: "u1",
  error: "db password=secret",
};

describe("observability", () => {
  it("loguje ścieżkę bez query stringa i koreluje przez requestId", () => {
    const { log } = observe(base);
    expect(log.path).toBe("/articles");
    expect(log.requestId).toBe("r1");
    expect(JSON.stringify(log)).not.toContain("email");
  });

  it("bucketuje status zamiast używać surowego kodu jako labelki", () => {
    expect(observe({ ...base, status: 503 }).metric.labels.statusClass).toBe("5xx");
    expect(observe({ ...base, status: 200 }).metric.labels.statusClass).toBe("2xx");
    expect(observe({ ...base, status: 404 }).metric.labels.statusClass).toBe("4xx");
  });

  it("outcome jest spójne z klasą statusu", () => {
    expect(observe({ ...base, status: 200 }).log.outcome).toBe("ok");
    expect(observe({ ...base, status: 499 }).log.outcome).toBe("ok");
    expect(observe({ ...base, status: 500 }).log.outcome).toBe("error");
  });

  it("nie przecieka userId ani treści błędu do żadnego artefaktu", () => {
    const serialized = JSON.stringify(observe(base));
    expect(serialized).not.toContain("u1");
    expect(serialized).not.toContain("password");
    expect(serialized).not.toContain("secret");
  });

  it("metryka niesie durationMs jako wartość i route bez query", () => {
    const { metric } = observe(base);
    expect(metric.name).toBe("http_server_duration_ms");
    expect(metric.value).toBe(42);
    expect(metric.labels.route).toBe("/articles");
  });
});
