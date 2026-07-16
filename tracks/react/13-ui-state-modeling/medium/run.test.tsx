import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { InviteForm } from "./starter";

function deferred() {
  let resolve!: () => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<void>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  return { promise, reject, resolve };
}

describe("InviteForm", () => {
  it("zachowuje dane po błędzie i usuwa błąd po udanym retry", async () => {
    const first = deferred();
    const second = deferred();
    let call = 0;
    const onInvite = vi.fn(() => (
      call++ === 0 ? first.promise : second.promise
    ));
    const { user } = renderWithUser(<InviteForm onInvite={onInvite} />);
    const input = screen.getByRole("textbox", { name: "E-mail" });
    const submit = screen.getByRole("button", {
      name: "Wyślij zaproszenie",
    });

    await user.type(input, "ada@example.com");
    await user.click(submit);
    expect(input).toBeDisabled();
    expect(submit).toBeDisabled();

    await act(async () => {
      first.reject(new Error("offline"));
      await first.promise.catch(() => {});
    });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Nie udało się wysłać zaproszenia.",
    );
    expect(input).toHaveValue("ada@example.com");

    await user.click(submit);
    await act(async () => {
      second.resolve();
      await second.promise;
    });
    expect(screen.getByText("Zaproszono ada@example.com")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
