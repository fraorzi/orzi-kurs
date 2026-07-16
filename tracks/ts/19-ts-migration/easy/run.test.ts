import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { migratePathMappings } from "./starter";

describe("migratePathMappings", () => {
  it("przenosi baseUrl do targetów i normalizuje segmenty", () => {
    const result = migratePathMappings("./src", {
      "@app/*": ["app/*", "./features/*"],
      "@shared/*": ["../shared/*"],
    });
    type _result = Expect<
      Equal<typeof result, Record<string, string[]>>
    >;
    expect(result).toEqual({
      "@app/*": ["./src/app/*", "./src/features/*"],
      "@shared/*": ["./shared/*"],
    });
  });

  it("normalizuje backslashe bez uzależnienia od systemu operacyjnego", () => {
    expect(
      migratePathMappings(".\\src\\app", {
        "@ui/*": ["..\\ui\\*"],
      }),
    ).toEqual({ "@ui/*": ["./src/ui/*"] });
  });

  it("nie mutuje konfiguracji wejściowej", () => {
    const paths = { "@app/*": ["app/*"] } as const;
    migratePathMappings("./src", paths);
    expect(paths).toEqual({ "@app/*": ["app/*"] });
  });
});
