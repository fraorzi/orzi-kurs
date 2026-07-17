import { describe, expect, it, vi } from "vitest";
import {
  act,
  render,
  screen,
} from "@harness/react-test";
import {
  UserProfile,
  type User,
} from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  return { promise, reject, resolve };
}

describe("UserProfile", () => {
  it("pokazuje pending, a następnie dane", async () => {
    const operation = deferred<User>();
    const loadUser = vi.fn(() => operation.promise);
    render(<UserProfile userId="u1" loadUser={loadUser} />);

    expect(screen.getByText("Ładowanie profilu…")).toBeInTheDocument();

    await act(async () => {
      operation.resolve({ id: "u1", name: "Ada" });
      await operation.promise;
    });
    expect(screen.getByRole("heading", { name: "Ada" })).toBeInTheDocument();
  });

  it("pokazuje jawny stan błędu", async () => {
    const operation = deferred<User>();
    render(
      <UserProfile userId="u1" loadUser={() => operation.promise} />,
    );

    await act(async () => {
      operation.reject(new Error("offline"));
      await operation.promise.catch(() => {});
    });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Nie udało się pobrać profilu.",
    );
  });
});
