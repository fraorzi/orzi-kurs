import { describe, expect, it } from "vitest";
import { runJavaTask } from "@harness/java-test";

const TEST_MAIN = "public class TestMain { public static void main(String[] args) { if (Solution.add(Integer.MAX_VALUE, 1) != 2147483648L) throw new AssertionError(); if (!Solution.hasFlag(0b1011, 0b0011) || Solution.hasFlag(0b1000, 0b0011)) throw new AssertionError(); System.out.print(\"OK\"); } }";
describe("Runtime, typy i bezpieczna arytmetyka", () => { it("kompiluje się i spełnia kontrakt runtime", async () => { await expect(runJavaTask(import.meta.dirname, TEST_MAIN)).resolves.toBe("OK"); }); });
