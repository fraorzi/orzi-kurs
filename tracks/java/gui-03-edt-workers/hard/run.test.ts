import { describe, expect, it } from "vitest"; import { runJavaTask } from "@harness/java-test";
const TEST_MAIN="import javax.swing.*; public class TestMain { public static void main(String[] args){ boolean[] onEdt={false}; Solution.onEdt(() -> onEdt[0]=SwingUtilities.isEventDispatchThread()); if(!onEdt[0]) throw new AssertionError(); System.out.print(\"OK\");}}";
describe("EDT, worker i anulowanie",()=>{it("spełnia kontrakt GUI bez uruchamiania okna",async()=>{await expect(runJavaTask(import.meta.dirname,TEST_MAIN)).resolves.toBe("OK");});});
