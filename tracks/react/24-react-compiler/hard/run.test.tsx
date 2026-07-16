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
import { SearchResults } from "./starter";

describe("SearchResults", () => {
  it("nie uzależnia poprawności od niepełnego ręcznego cache'u", () => {
    const { rerender } = render(
      <SearchResults
        items={[{ id: "1", name: "React Handbook" }]}
        query="react"
      />,
    );
    expect(screen.getByText("React Handbook")).toBeInTheDocument();

    rerender(
      <SearchResults
        items={[{ id: "2", name: "React Compiler Guide" }]}
        query="react"
      />,
    );

    expect(screen.getByText("React Compiler Guide")).toBeInTheDocument();
    expect(screen.queryByText("React Handbook")).not.toBeInTheDocument();
  });

  it("po naprawie wraca pod kontrolę Compilera", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/24-react-compiler/hard/starter.tsx",
      ),
      "utf8",
    );
    const output = compileReactSource(source);

    expect(source).not.toContain('"use no memo"');
    expect(wasCompiled(output, "SearchResults")).toBe(true);
  });
});
