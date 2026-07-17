import { describe, expect, it } from "vitest";
import { runJavaTask } from "@harness/java-test";

const TEST_MAIN = "public class TestMain { public static void main(String[] args) { if (Solution.factorial(5)!=120 || Solution.factorial(0)!=1) throw new AssertionError(); try { Solution.factorial(-1); throw new AssertionError(); } catch (IllegalArgumentException expected) {} if (Solution.sum(1,2,3)!=6) throw new AssertionError(); System.out.print(\"OK\"); } }";
describe("Metody, varargs i rekurencja", () => { it("kompiluje się i spełnia kontrakt runtime", async () => { await expect(runJavaTask(import.meta.dirname, TEST_MAIN)).resolves.toBe("OK"); }); });
