import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  defineWorkerConfig,
  type Exact,
  type WorkerConfig,
} from "./starter";

describe("Exact", () => {
  it("zachowuje poprawny kształt", () => {
    type Candidate = {
      queue: "emails";
      concurrency: 4;
      retry: true;
    };
    type ExactCandidate = Exact<WorkerConfig, Candidate>;
    type _keys = Expect<Equal<keyof ExactCandidate, keyof Candidate>>;
    const candidate: ExactCandidate = {
      queue: "emails",
      concurrency: 4,
      retry: true,
    };
    expect(candidate.queue).toBe("emails");
  });

  it("odrzuca dodatkowy klucz także ze zmiennej", () => {
    const config = {
      queue: "emails",
      concurrency: 4,
      retry: true,
      retries: 3,
    };
    const illegal = (): unknown =>
      // @ts-expect-error retries nie występuje w WorkerConfig
      defineWorkerConfig(config);
    expect(illegal).toBeTypeOf("function");
  });
});

describe("defineWorkerConfig", () => {
  it("zachowuje literalny typ wejścia", () => {
    const config = defineWorkerConfig({
      queue: "emails" as const,
      concurrency: 4,
      retry: true,
    });
    type _queue = Expect<Equal<typeof config.queue, "emails">>;
    expect(config.queue).toBe("emails");
  });

  it("zwraca zamrożoną kopię", () => {
    const input = { queue: "jobs", concurrency: 2, retry: false };
    const config = defineWorkerConfig(input);
    expect(config).not.toBe(input);
    expect(Object.isFrozen(config)).toBe(true);
  });
});
