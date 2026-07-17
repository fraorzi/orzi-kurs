import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("korelacja request/response", () => {
  it("dopasowuje odpowiedzi po id, także poza kolejnością", async () => {
    const manager = solve(10);
    const sent: number[] = [];
    const first = manager.request<string>((message) => sent.push(message.id));
    const second = manager.request<string>((message) => sent.push(message.id));
    expect(new Set(sent).size).toBe(2);
    const [firstId, secondId] = sent;
    manager.resolve(secondId!, "druga");
    manager.resolve(firstId!, "pierwsza");
    await expect(second).resolves.toBe("druga");
    await expect(first).resolves.toBe("pierwsza");
  });

  it("odrzuca żądanie ponad limit in-flight, a resolve zwalnia slot", async () => {
    const manager = solve(1);
    const ids: number[] = [];
    const first = manager.request<string>((m) => ids.push(m.id));
    await expect(manager.request(vi.fn())).rejects.toThrow();
    manager.resolve(ids[0]!, "ok");
    await expect(first).resolves.toBe("ok");
    const second = manager.request<string>((m) => ids.push(m.id));
    manager.resolve(ids[1]!, "po zwolnieniu");
    await expect(second).resolves.toBe("po zwolnieniu");
  });

  it("fail odrzuca wszystkie oczekujące żądania", async () => {
    const manager = solve(5);
    const a = manager.request(vi.fn());
    const b = manager.request(vi.fn());
    manager.fail(new Error("worker umarł"));
    await expect(a).rejects.toThrow("worker umarł");
    await expect(b).rejects.toThrow("worker umarł");
  });

  it("po fail manager przyjmuje nowe żądania, a spóźnione resolve są ignorowane", async () => {
    const manager = solve(2);
    const ids: number[] = [];
    const doomed = manager.request<string>((m) => ids.push(m.id));
    manager.fail(new Error("restart"));
    await expect(doomed).rejects.toThrow();
    expect(() => manager.resolve(ids[0]!, "spóźnione")).not.toThrow();
    const fresh = manager.request<string>((m) => ids.push(m.id));
    manager.resolve(ids[1]!, "nowe");
    await expect(fresh).resolves.toBe("nowe");
  });
});
