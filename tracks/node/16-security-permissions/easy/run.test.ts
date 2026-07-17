import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("minimalne argv Permission Model", () => {
  it("buduje komplet flag w stabilnej kolejności", () => {
    expect(
      solve("dist/worker.js", {
        read: ["/data/in"],
        write: ["/data/out"],
        worker: true,
        child: true,
      }),
    ).toEqual([
      "--permission",
      "--allow-fs-read=/data/in",
      "--allow-fs-write=/data/out",
      "--allow-worker",
      "--allow-child-process",
      "dist/worker.js",
    ]);
  });

  it("pusta konfiguracja to sam --permission i entry", () => {
    expect(solve("app.js", {})).toEqual(["--permission", "app.js"]);
  });

  it("wiele ścieżek daje osobne flagi, bez wildcardów", () => {
    const args = solve("app.js", { read: ["/a", "/b"] });
    expect(args).toContain("--allow-fs-read=/a");
    expect(args).toContain("--allow-fs-read=/b");
    expect(args.join(" ")).not.toContain("*");
  });

  it("entry jest zawsze ostatnim argumentem", () => {
    expect(solve("main.js", { worker: true }).at(-1)).toBe("main.js");
  });
});
