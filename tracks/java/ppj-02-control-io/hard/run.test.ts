import { describe, expect, it } from "vitest";
import { runJavaTask } from "@harness/java-test";

const TEST_MAIN = "public class TestMain { public static void main(String[] args) { if (!Solution.command(new String[]{\"add\",\"4\"}).equals(\"result=5\")) throw new AssertionError(); if (!Solution.command(new String[]{\"x\",\"4\"}).equals(\"unknown command\")) throw new AssertionError(); if (!Solution.command(new String[]{}).startsWith(\"usage\")) throw new AssertionError(); System.out.print(\"OK\"); } }";
describe("Sterowanie, argumenty i format wyniku", () => { it("kompiluje się i spełnia kontrakt runtime", async () => { await expect(runJavaTask(import.meta.dirname, TEST_MAIN)).resolves.toBe("OK"); }); });
