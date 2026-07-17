import { describe, expect, it } from "vitest";
import { runJavaTask } from "@harness/java-test";

const TEST_MAIN = "import java.util.*; public class TestMain { public static void main(String[] args) { var core=Solution.core(); if(!core.equals(List.of(\"module-imports\",\"compact-source-files\",\"flexible-constructor-bodies\",\"scoped-values\"))) throw new AssertionError(core); var preview=Solution.catalog().stream().filter(f -> f.status()==Solution.Status.PREVIEW).map(Solution.Feature::name).toList(); if(!preview.equals(List.of(\"structured-concurrency\",\"primitive-patterns\"))) throw new AssertionError(preview); System.out.print(\"OK\"); } }";

describe("JDK 25 migration catalog", () => {
  it("oddziela stabilny core od preview", async () => {
    await expect(runJavaTask(import.meta.dirname, TEST_MAIN)).resolves.toBe("OK");
  });
});
