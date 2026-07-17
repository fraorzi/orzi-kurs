import { describe, expect, it } from "vitest";
import { runJavaTask } from "@harness/java-test";

const TEST_MAIN = "import java.util.*; public class TestMain { public static void main(String[] args) { List<String> input=new ArrayList<>(List.of(\"beta\",\"Alfa\",\"alfa\")); List<String> sorted=Solution.sort(input); if (!sorted.equals(List.of(\"Alfa\",\"alfa\",\"beta\"))) throw new AssertionError(sorted); if (Solution.find(sorted,\"beta\")!=2) throw new AssertionError(); if (!input.equals(List.of(\"beta\",\"Alfa\",\"alfa\"))) throw new AssertionError(); System.out.print(\"OK\"); } }";
describe("Sortowanie, Comparator i wyszukiwanie", () => { it("kompiluje się i spełnia kontrakt runtime", async () => { await expect(runJavaTask(import.meta.dirname, TEST_MAIN)).resolves.toBe("OK"); }); });
