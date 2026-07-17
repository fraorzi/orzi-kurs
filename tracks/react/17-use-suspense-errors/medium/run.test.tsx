import { describe, expect, it } from "vitest";
import {
  act,
  render,
  screen,
} from "@harness/react-test";
import {
  UserPanel,
  type User,
} from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("UserPanel", () => {
  it("pokazuje fallback, a potem dane z Promise", async () => {
    const operation = deferred<User>();
    const { rerender } = render(
      <UserPanel userPromise={operation.promise} />,
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Ładowanie użytkownika…",
    );

    await act(async () => {
      operation.resolve({ name: "Ada", role: "Administrator" });
      await operation.promise;
      rerender(<UserPanel userPromise={operation.promise} />);
    });
    expect(screen.getByRole("heading", { name: "Ada" }))
      .toBeInTheDocument();
    expect(screen.getByText("Administrator")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
