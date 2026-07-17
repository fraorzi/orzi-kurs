import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { getAtPath, type Paths, type PathValue } from "./starter";

type AppConfig = {
  server: {
    host: string;
    port: number;
    tls: { enabled: boolean };
  };
  features: {
    checkout: boolean;
  };
  tags: string[];
};

const config: AppConfig = {
  server: {
    host: "localhost",
    port: 3000,
    tls: { enabled: false },
  },
  features: { checkout: true },
  tags: ["local"],
};

describe("Paths i PathValue", () => {
  it("generuje ścieżki obiektów, ale nie indeksy tablic", () => {
    type Expected =
      | "server"
      | "server.host"
      | "server.port"
      | "server.tls"
      | "server.tls.enabled"
      | "features"
      | "features.checkout"
      | "tags";
    type _paths = Expect<Equal<Paths<AppConfig>, Expected>>;
    type _port = Expect<Equal<PathValue<AppConfig, "server.port">, number>>;
    type _tls = Expect<
      Equal<PathValue<AppConfig, "server.tls.enabled">, boolean>
    >;
    expect(true).toBe(true);
  });
});

describe("getAtPath", () => {
  it("zwraca wynik właściwego typu", () => {
    const port = getAtPath(config, "server.port");
    const enabled = getAtPath(config, "server.tls.enabled");
    const tags = getAtPath(config, "tags");
    type _port = Expect<Equal<typeof port, number>>;
    type _enabled = Expect<Equal<typeof enabled, boolean>>;
    type _tags = Expect<Equal<typeof tags, string[]>>;
    expect([port, enabled, tags]).toEqual([3000, false, ["local"]]);
  });

  it("odrzuca nieistniejącą ścieżkę i indeks tablicy", () => {
    const missing = (): unknown =>
      // @ts-expect-error nie ma server.timeout
      getAtPath(config, "server.timeout");
    const arrayIndex = (): unknown =>
      // @ts-expect-error tablice są liśćmi
      getAtPath(config, "tags.0");
    expect([missing, arrayIndex]).toHaveLength(2);
  });
});
