import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { SyncedFields } from "./starter";

describe("SyncedFields", () => {
  it("utrzymuje jedno źródło prawdy dla obu pól", async () => {
    const { user } = renderWithUser(<SyncedFields />);
    const publicName = screen.getByRole("textbox", {
      name: "Nazwa publiczna",
    });
    const preview = screen.getByRole("textbox", {
      name: "Podgląd nazwy",
    });

    await user.type(publicName, "Ada");
    expect(publicName).toHaveValue("Ada");
    expect(preview).toHaveValue("Ada");

    await user.clear(preview);
    await user.type(preview, "Lin");
    expect(publicName).toHaveValue("Lin");
    expect(preview).toHaveValue("Lin");
  });
});
