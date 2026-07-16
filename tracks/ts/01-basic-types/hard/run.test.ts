import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  CONFIG,
  hasFeature,
  describeApi,
  withTimeout,
  type Config,
  type FeatureFlag,
  type ApiConfig,
} from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("CONFIG jest głęboko readonly i trzyma literały", () => {
    type _t = Expect<
      Equal<
        Config,
        {
          readonly api: {
            readonly baseUrl: "https://api.example.com";
            readonly timeoutMs: 5000;
            readonly retries: 3;
          };
          readonly features: readonly ["search", "export", "darkMode"];
        }
      >
    >;
    expect(CONFIG.api.timeoutMs).toBe(5000);
  });

  it("FeatureFlag jest unią flag z CONFIG.features", () => {
    type _t = Expect<Equal<FeatureFlag, "search" | "export" | "darkMode">>;
    expect(CONFIG.features).toHaveLength(3);
  });

  it("ApiConfig to typ CONFIG.api", () => {
    type _t = Expect<Equal<ApiConfig, Config["api"]>>;
    expect(CONFIG.api.baseUrl).toBe("https://api.example.com");
  });

  it("nie da się nadpisać zagnieżdżonego pola konfiguracji", () => {
    const illegal = (): void => {
      // @ts-expect-error CONFIG.api.timeoutMs jest readonly
      CONFIG.api.timeoutMs = 1;
    };
    expect(illegal).toBeTypeOf("function");
    expect(CONFIG.api.timeoutMs).toBe(5000);
  });

  it("nie da się dopisać flagi do CONFIG.features", () => {
    const illegal = (): void => {
      // @ts-expect-error readonly tuple nie ma metody push
      CONFIG.features.push("sms");
    };
    expect(illegal).toBeTypeOf("function");
    expect(CONFIG.features).toHaveLength(3);
  });

  it("hasFeature odrzuca flagę spoza unii", () => {
    const illegal = (): void => {
      // @ts-expect-error "sms" nie jest FeatureFlag
      hasFeature("sms");
    };
    expect(illegal).toBeTypeOf("function");
    expect(hasFeature("search")).toBe(true);
  });
});

describe("hasFeature", () => {
  it("zwraca true dla flagi obecnej w konfiguracji", () => {
    expect(hasFeature("darkMode")).toBe(true);
  });
});

describe("describeApi", () => {
  it("opisuje konfigurację API jednym zdaniem", () => {
    expect(
      describeApi(CONFIG.api),
      "format: '<baseUrl> (timeout <timeoutMs>ms, <retries> próby)'",
    ).toBe("https://api.example.com (timeout 5000ms, 3 próby)");
  });

  it("czyta wszystkie trzy pola z konfiguracji", () => {
    expect(describeApi(CONFIG.api)).toContain(String(CONFIG.api.retries));
    expect(describeApi(CONFIG.api)).toContain(CONFIG.api.baseUrl);
  });
});

describe("withTimeout", () => {
  it("zwraca nowy obiekt z podmienionym timeoutem", () => {
    expect(withTimeout(CONFIG.api, 100)).toEqual({
      baseUrl: "https://api.example.com",
      timeoutMs: 100,
      retries: 3,
    });
  });

  it("nie mutuje oryginalnej konfiguracji", () => {
    withTimeout(CONFIG.api, 100);
    expect(
      CONFIG.api.timeoutMs,
      "CONFIG jest readonly — jedyna droga to kopia, nie zapis do wejścia",
    ).toBe(5000);
  });

  it("wynik jest mutowalny (zwykły obiekt, nie readonly)", () => {
    const cfg = withTimeout(CONFIG.api, 100);
    cfg.retries = 5;
    expect(cfg.retries).toBe(5);
  });
});
