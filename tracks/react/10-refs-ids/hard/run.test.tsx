import { describe, expect, it, vi } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import {
  RegisteredFields,
  type FieldRegistry,
} from "./starter";

describe("RegisteredFields", () => {
  it("zwraca cleanup zewnętrznego rejestru dla każdego pola", () => {
    const detachName = vi.fn();
    const detachEmail = vi.fn();
    const registry: FieldRegistry = {
      attach: vi.fn((id) => (
        id === "name" ? detachName : detachEmail
      )),
    };
    const { unmount } = render(
      <RegisteredFields
        fields={[
          { id: "name", label: "Nazwa" },
          { id: "email", label: "E-mail" },
        ]}
        registry={registry}
      />,
    );

    expect(screen.getByRole("textbox", { name: "Nazwa" }))
      .toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "E-mail" }))
      .toBeInTheDocument();
    expect(registry.attach).toHaveBeenCalledTimes(2);

    unmount();
    expect(detachName).toHaveBeenCalledOnce();
    expect(detachEmail).toHaveBeenCalledOnce();
  });
});
