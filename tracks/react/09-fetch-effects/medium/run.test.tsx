import { describe, expect, it, vi } from "vitest";
import {
  act,
  render,
  screen,
  within,
} from "@harness/react-test";
import { SearchResults } from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("SearchResults", () => {
  it("ignoruje odpowiedź starszego zapytania", async () => {
    const react = deferred<readonly string[]>();
    const compiler = deferred<readonly string[]>();
    const search = vi.fn((query: string) => (
      query === "react" ? react.promise : compiler.promise
    ));
    const { rerender } = render(
      <SearchResults query="react" search={search} />,
    );
    rerender(<SearchResults query="compiler" search={search} />);

    await act(async () => {
      compiler.resolve(["React Compiler"]);
      await compiler.promise;
    });
    const list = screen.getByRole("list", { name: "Wyniki" });
    expect(within(list).getByText("React Compiler")).toBeInTheDocument();

    await act(async () => {
      react.resolve(["React 18"]);
      await react.promise;
    });
    expect(within(list).getByText("React Compiler")).toBeInTheDocument();
    expect(within(list).queryByText("React 18")).not.toBeInTheDocument();
    expect(screen.queryByText("Szukanie…")).not.toBeInTheDocument();
  });
});
