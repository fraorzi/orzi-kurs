import { describe, expect, it } from "vitest";
import { runJavaTask } from "@harness/java-test";

const TEST_MAIN = "import java.nio.file.*; public class TestMain { public static void main(String[] args) throws Exception { Path file=Files.createTempFile(\"ppj\",\".txt\"); try { Files.writeString(file,\" alfa \\n\\nbeta\\n\"); if (!Solution.report(file).equals(\"ALFA\\nBETA\\n\")) throw new AssertionError(Solution.report(file)); } finally { Files.deleteIfExists(file); } System.out.print(\"OK\"); } }";
describe("Pliki, debugowanie i wydajność", () => { it("kompiluje się i spełnia kontrakt runtime", async () => { await expect(runJavaTask(import.meta.dirname, TEST_MAIN)).resolves.toBe("OK"); }); });
