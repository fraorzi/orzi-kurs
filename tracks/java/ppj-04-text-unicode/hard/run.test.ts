import { describe, expect, it } from "vitest";
import { runJavaTask } from "@harness/java-test";

const TEST_MAIN = "public class TestMain { public static void main(String[] args) { String input=\"A😀B\"; if (!Solution.reverse(input).equals(\"B😀A\")) throw new AssertionError(Solution.reverse(input)); if (Solution.length(input)!=3) throw new AssertionError(); System.out.print(\"OK\"); } }";
describe("String, StringBuilder i Unicode", () => { it("kompiluje się i spełnia kontrakt runtime", async () => { await expect(runJavaTask(import.meta.dirname, TEST_MAIN)).resolves.toBe("OK"); }); });
