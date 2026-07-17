import { describe, expect, it } from "vitest";
import { runJavaTask } from "@harness/java-test";

const TEST_MAIN = "public class TestMain { public static void main(String[] args) { double area=Solution.total(new Solution.Circle(2)); if (Math.abs(area-4*Math.PI)>1e-9) throw new AssertionError(); try { new Solution.Circle(0); throw new AssertionError(); } catch (Solution.InvalidShape expected) {} System.out.print(\"OK\"); } }";
describe("OOP, polimorfizm i własne wyjątki", () => { it("kompiluje się i spełnia kontrakt runtime", async () => { await expect(runJavaTask(import.meta.dirname, TEST_MAIN)).resolves.toBe("OK"); }); });
