import { describe, expect, it } from "vitest";
import { runJavaTask } from "@harness/java-test";

const TEST_MAIN = "import java.util.Arrays; public class TestMain { public static void main(String[] args) { int[][] input={{1,2},{3},{4,5,6}}; if (Solution.sum(input)!=21) throw new AssertionError(); if (!Arrays.equals(Solution.flatten(input), new int[]{1,2,3,4,5,6})) throw new AssertionError(); System.out.print(\"OK\"); } }";
describe("Tablice i macierze nieregularne", () => { it("kompiluje się i spełnia kontrakt runtime", async () => { await expect(runJavaTask(import.meta.dirname, TEST_MAIN)).resolves.toBe("OK"); }); });
