import { describe, expect, it } from "vitest";
import { runJavaTask } from "@harness/java-test";

const TEST_MAIN = "import java.util.*; public class TestMain { public static void main(String[] args) { var items=Solution.parse(List.of(\"b,Beta,2\",\"a,Alfa,1\")); if (!Solution.report(items).equals(\"a:1\\nb:2\\n\")) throw new AssertionError(); try { Solution.parse(List.of(\"a,A,1\",\"a,B,2\")); throw new AssertionError(); } catch (IllegalArgumentException expected) {} System.out.print(\"OK\"); } }";
describe("Moduł konsolowy: parser i raport", () => { it("kompiluje się i spełnia kontrakt runtime", async () => { await expect(runJavaTask(import.meta.dirname, TEST_MAIN)).resolves.toBe("OK"); }); });
