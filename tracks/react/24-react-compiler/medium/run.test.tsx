import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import {
  compileReactSource,
  wasCompiled,
} from "@harness/react-compiler";
import {
  LegacyCounter,
  ModernInvoiceTable,
} from "./starter";

describe("adopcja React Compiler", () => {
  it("zachowuje wynik nowego i starego komponentu", () => {
    render(
      <>
        <ModernInvoiceTable
          invoices={[
            { id: "1", customer: "Acme", amount: 120 },
            { id: "2", customer: "Orzi", amount: 80 },
          ]}
        />
        <LegacyCounter value={7} />
      </>,
    );

    expect(screen.getByText("Razem: 200 zł")).toBeInTheDocument();
    expect(screen.getByText("Licznik legacy: 7")).toBeInTheDocument();
  });

  it("kompiluje tylko jawnie oznaczony komponent", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/24-react-compiler/medium/starter.tsx",
      ),
      "utf8",
    );
    const output = compileReactSource(source, {
      compilationMode: "annotation",
    });

    expect(wasCompiled(output, "ModernInvoiceTable")).toBe(true);
    expect(wasCompiled(output, "LegacyCounter")).toBe(false);
  });
});

