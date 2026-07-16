import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  ORDER_STATUSES,
  createOrderClient,
  createTaskQueue,
  parseOrder,
  parseOrderId,
  parseOrderList,
  type ApiError,
  type FetchLike,
  type Order,
  type OrderId,
  type ParseResult,
  type Result,
} from "./src/index";

const ORDER_BODY = {
  id: "ord_a1b2c3",
  status: "paid",
  total: 129.99,
  items: [
    { sku: "TS-BOOK", quantity: 1 },
    { sku: "MUG", quantity: 2 },
  ],
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function validOrderId(): OrderId {
  const parsed = parseOrderId("ord_a1b2c3");
  if (!parsed.ok) throw new Error("fixture OrderId jest niepoprawny");
  return parsed.value;
}

describe("kontrakty compile-time", () => {
  it("statusy są readonly tuple i źródłem unii", () => {
    type _statuses = Expect<
      Equal<typeof ORDER_STATUSES, readonly ["pending", "paid", "cancelled"]>
    >;
    expect(ORDER_STATUSES).toHaveLength(3);
  });

  it("parser zachowuje typ wyniku, a zwykły string nie jest OrderId", () => {
    type _parsed = Expect<
      Equal<ReturnType<typeof parseOrder>, ParseResult<Order>>
    >;
    const illegal = (): OrderId =>
      // @ts-expect-error marka OrderId nie może powstać ze zwykłego stringa
      "ord_a1b2c3";
    expect(illegal).toBeTypeOf("function");
  });

  it("Order jest readonly również w zagnieżdżonych danych", () => {
    const parsed = parseOrder(ORDER_BODY);
    if (!parsed.ok) throw new Error("fixture Order jest niepoprawny");
    const illegal = (): void => {
      // @ts-expect-error pole domenowe jest tylko do odczytu
      parsed.value.status = "cancelled";
      // @ts-expect-error kolekcja elementów jest tylko do odczytu
      parsed.value.items.push({ sku: "X", quantity: 1 });
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("generyczna kolejka zachowuje typ wyniku zadania", () => {
    const queued = createTaskQueue().add(async () => ({ id: 7 as const }));
    type _queued = Expect<Equal<typeof queued, Promise<{ id: 7 }>>>;
    expect(queued).toBeInstanceOf(Promise);
  });

  it("klient obiecuje jawny Result<Order, ApiError>", () => {
    const fetchImpl: FetchLike = async () => jsonResponse(ORDER_BODY);
    const result = createOrderClient({
      baseUrl: "https://api.example.test",
      fetchImpl,
    }).getOrder(validOrderId());
    type _result = Expect<
      Equal<typeof result, Promise<Result<Order, ApiError>>>
    >;
    expect(result).toBeInstanceOf(Promise);
  });

  it("ApiError zawęża szczegóły po kind", () => {
    const inspect = (error: ApiError): number | string => {
      switch (error.kind) {
        case "http":
          return error.status;
        case "network":
          return error.message;
        case "invalid-response":
          return error.errors.join(", ");
        case "aborted":
          return error.reason;
      }
    };
    expect(inspect({ kind: "http", status: 404 })).toBe(404);
  });
});

describe("parsery granicy runtime", () => {
  it("parseOrderId przyjmuje wyłącznie ustalony format", () => {
    expect(parseOrderId("ord_a1b2c3")).toEqual({
      ok: true,
      value: "ord_a1b2c3",
    });
    expect(parseOrderId("ORD_a1b2c3")).toEqual({
      ok: false,
      error: ["id ma format ord_xxxxxx"],
    });
    expect(parseOrderId("ord_short")).toEqual({
      ok: false,
      error: ["id ma format ord_xxxxxx"],
    });
  });

  it("parseOrder tworzy czysty obiekt domenowy", () => {
    expect(parseOrder({ ...ORDER_BODY, debug: true })).toEqual({
      ok: true,
      value: ORDER_BODY,
    });
  });

  it("parseOrder odrzuca wartość, która nie jest rekordem", () => {
    expect(parseOrder(null)).toEqual({
      ok: false,
      error: ["order nie jest obiektem"],
    });
    expect(parseOrder([])).toEqual({
      ok: false,
      error: ["order nie jest obiektem"],
    });
  });

  it("parseOrder zbiera wszystkie błędy pól i elementów", () => {
    expect(
      parseOrder({
        id: "7",
        status: "done",
        total: Number.POSITIVE_INFINITY,
        items: [
          { sku: "", quantity: 0 },
          null,
        ],
      }),
    ).toEqual({
      ok: false,
      error: [
        "id ma format ord_xxxxxx",
        "status musi być jednym z: pending, paid, cancelled",
        "total musi być skończoną liczbą >= 0",
        "items[0].sku musi być niepustym tekstem",
        "items[0].quantity musi być dodatnią liczbą całkowitą",
        "items[1] nie jest obiektem",
      ],
    });
  });

  it("parseOrderList zachowuje kolejność i prefiksuje błędy indeksem", () => {
    expect(parseOrderList([ORDER_BODY, { ...ORDER_BODY, id: "bad" }])).toEqual({
      ok: false,
      error: ["[1].id ma format ord_xxxxxx"],
    });
    expect(parseOrderList("not-an-array")).toEqual({
      ok: false,
      error: ["orders musi być tablicą"],
    });
  });
});

describe("createTaskQueue", () => {
  it("odrzuca niepoprawny limit współbieżności", () => {
    expect(() => createTaskQueue(0)).toThrow(RangeError);
    expect(() => createTaskQueue(1.5)).toThrow(RangeError);
  });

  it("uruchamia najwyżej concurrency zadań i raportuje stan", async () => {
    const queue = createTaskQueue(2);
    let release = (): void => {};
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    let active = 0;
    let maxActive = 0;
    const jobs = [1, 2, 3, 4].map((value) =>
      queue.add(async () => {
        active += 1;
        maxActive = Math.max(maxActive, active);
        await gate;
        active -= 1;
        return value;
      }),
    );

    await Promise.resolve();
    expect({ active: queue.active, pending: queue.pending }).toEqual({
      active: 2,
      pending: 2,
    });
    release();

    await expect(Promise.all(jobs)).resolves.toEqual([1, 2, 3, 4]);
    expect(maxActive).toBe(2);
    expect({ active: queue.active, pending: queue.pending }).toEqual({
      active: 0,
      pending: 0,
    });
  });

  it("propaguje odrzucenie i uruchamia następne zadanie", async () => {
    const queue = createTaskQueue(1);
    const first = queue.add(async () => Promise.reject(new Error("boom")));
    const second = queue.add(async () => "next");
    await expect(first).rejects.toThrow("boom");
    await expect(second).resolves.toBe("next");
  });

  it("zwalnia slot również po synchronicznym wyjątku task()", async () => {
    const queue = createTaskQueue(1);
    const first = queue.add(() => {
      throw new Error("sync boom");
    });
    const second = queue.add(async () => "recovered");
    await expect(first).rejects.toThrow("sync boom");
    await expect(second).resolves.toBe("recovered");
    expect(queue.active).toBe(0);
  });
});

describe("createOrderClient", () => {
  it("pobiera i parsuje pojedyncze zamówienie", async () => {
    const calls: string[] = [];
    const fetchImpl: FetchLike = async (url) => {
      calls.push(url);
      return jsonResponse(ORDER_BODY);
    };
    const result = await createOrderClient({
      baseUrl: "https://api.example.test/",
      fetchImpl,
      retries: 0,
    }).getOrder(validOrderId());

    expect(result).toEqual({ ok: true, value: ORDER_BODY });
    expect(calls).toEqual([
      "https://api.example.test/orders/ord_a1b2c3",
    ]);
  });

  it("pobiera listę przez inny parser tego samego mechanizmu", async () => {
    const fetchImpl: FetchLike = async () =>
      jsonResponse([ORDER_BODY, { ...ORDER_BODY, id: "ord_d4e5f6" }]);
    const result = await createOrderClient({
      baseUrl: "/api",
      fetchImpl,
      retries: 0,
    }).listOrders();

    expect(result.ok && result.value).toHaveLength(2);
  });

  it("nie ponawia 4xx", async () => {
    let calls = 0;
    const fetchImpl: FetchLike = async () => {
      calls += 1;
      return jsonResponse({ message: "not found" }, 404);
    };
    const result = await createOrderClient({
      baseUrl: "/api",
      fetchImpl,
      retries: 3,
      sleep: async () => {},
    }).getOrder(validOrderId());

    expect(result).toEqual({
      ok: false,
      error: { kind: "http", status: 404 },
    });
    expect(calls).toBe(1);
  });

  it("ponawia 5xx z backoffem wykładniczym", async () => {
    let calls = 0;
    const delays: number[] = [];
    const fetchImpl: FetchLike = async () => {
      calls += 1;
      return calls < 3
        ? jsonResponse({ message: "busy" }, 503)
        : jsonResponse(ORDER_BODY);
    };
    const result = await createOrderClient({
      baseUrl: "/api",
      fetchImpl,
      retries: 2,
      backoffMs: 10,
      sleep: async (ms) => {
        delays.push(ms);
      },
    }).getOrder(validOrderId());

    expect(result).toEqual({ ok: true, value: ORDER_BODY });
    expect(calls).toBe(3);
    expect(delays).toEqual([10, 20]);
  });

  it("ponawia błąd sieci i zwraca ostatnią przyczynę po wyczerpaniu prób", async () => {
    let calls = 0;
    const fetchImpl: FetchLike = async () => {
      calls += 1;
      throw new TypeError(`network-${calls}`);
    };
    const result = await createOrderClient({
      baseUrl: "/api",
      fetchImpl,
      retries: 1,
      backoffMs: 0,
      sleep: async () => {},
    }).listOrders();

    expect(result).toEqual({
      ok: false,
      error: { kind: "network", message: "network-2" },
    });
    expect(calls).toBe(2);
  });

  it("nie ponawia niepoprawnego JSON ani danych niezgodnych z kontraktem", async () => {
    let invalidJsonCalls = 0;
    const invalidJson: FetchLike = async () => {
      invalidJsonCalls += 1;
      return new Response("{", { status: 200 });
    };
    const invalidJsonResult = await createOrderClient({
      baseUrl: "/api",
      fetchImpl: invalidJson,
      retries: 2,
      sleep: async () => {},
    }).getOrder(validOrderId());

    let invalidShapeCalls = 0;
    const invalidShape: FetchLike = async () => {
      invalidShapeCalls += 1;
      return jsonResponse({ ...ORDER_BODY, total: "129.99" });
    };
    const invalidShapeResult = await createOrderClient({
      baseUrl: "/api",
      fetchImpl: invalidShape,
      retries: 2,
      sleep: async () => {},
    }).getOrder(validOrderId());

    expect(invalidJsonResult).toEqual({
      ok: false,
      error: {
        kind: "invalid-response",
        errors: ["response nie zawiera poprawnego JSON"],
      },
    });
    expect(invalidShapeResult).toEqual({
      ok: false,
      error: {
        kind: "invalid-response",
        errors: ["total musi być skończoną liczbą >= 0"],
      },
    });
    expect([invalidJsonCalls, invalidShapeCalls]).toEqual([1, 1]);
  });

  it("propaguje zewnętrzne anulowanie bez wywołania transportu", async () => {
    let calls = 0;
    const fetchImpl: FetchLike = async () => {
      calls += 1;
      return jsonResponse(ORDER_BODY);
    };
    const controller = new AbortController();
    controller.abort();
    const result = await createOrderClient({
      baseUrl: "/api",
      fetchImpl,
    }).getOrder(validOrderId(), { signal: controller.signal });

    expect(result).toEqual({
      ok: false,
      error: { kind: "aborted", reason: "external" },
    });
    expect(calls).toBe(0);
  });

  it("propaguje anulowanie do już trwającego transportu", async () => {
    let receivedSignal: AbortSignal | undefined;
    const fetchImpl: FetchLike = async (_url, { signal }) => {
      receivedSignal = signal;
      return new Promise<Response>((_resolve, reject) => {
        signal.addEventListener(
          "abort",
          () => reject(new DOMException("Aborted", "AbortError")),
          { once: true },
        );
      });
    };
    const controller = new AbortController();
    const request = createOrderClient({
      baseUrl: "/api",
      fetchImpl,
      retries: 2,
      sleep: async () => {},
    }).getOrder(validOrderId(), { signal: controller.signal });

    await Promise.resolve();
    controller.abort();

    await expect(request).resolves.toEqual({
      ok: false,
      error: { kind: "aborted", reason: "external" },
    });
    expect(receivedSignal?.aborted).toBe(true);
  });

  it("przerywa zawieszony transport po timeout i nie robi retry", async () => {
    let calls = 0;
    const fetchImpl: FetchLike = async (_url, { signal }) => {
      calls += 1;
      return new Promise<Response>((_resolve, reject) => {
        signal.addEventListener(
          "abort",
          () => reject(new DOMException("Aborted", "AbortError")),
          { once: true },
        );
      });
    };
    const result = await createOrderClient({
      baseUrl: "/api",
      fetchImpl,
      retries: 2,
      timeoutMs: 5,
      sleep: async () => {},
    }).getOrder(validOrderId());

    expect(result).toEqual({
      ok: false,
      error: { kind: "aborted", reason: "timeout" },
    });
    expect(calls).toBe(1);
  });

  it("ogranicza współbieżność całych żądań i deleguje liczniki", async () => {
    let release = (): void => {};
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    let transportActive = 0;
    let maxTransportActive = 0;
    const fetchImpl: FetchLike = async () => {
      transportActive += 1;
      maxTransportActive = Math.max(maxTransportActive, transportActive);
      await gate;
      transportActive -= 1;
      return jsonResponse(ORDER_BODY);
    };
    const client = createOrderClient({
      baseUrl: "/api",
      fetchImpl,
      concurrency: 2,
      retries: 0,
    });
    const requests = [
      client.getOrder(validOrderId()),
      client.listOrders(),
      client.getOrder(validOrderId()),
      client.getOrder(validOrderId()),
    ];

    await Promise.resolve();
    await Promise.resolve();
    expect({ active: client.active, pending: client.pending }).toEqual({
      active: 2,
      pending: 2,
    });
    release();
    await Promise.all(requests);

    expect(maxTransportActive).toBe(2);
    expect({ active: client.active, pending: client.pending }).toEqual({
      active: 0,
      pending: 0,
    });
  });
});
