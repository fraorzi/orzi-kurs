import { describe, expect, it } from "vitest";
import {
  createRenderCounter,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { TicketWorkspace } from "./starter";

describe("TicketWorkspace", () => {
  it("lokalizuje draft poza właścicielem drogiej listy", async () => {
    const listRenders = createRenderCounter();
    const { user } = renderWithUser(
      <TicketWorkspace
        tickets={[
          { id: "1", title: "Błąd płatności" },
          { id: "2", title: "Zmiana adresu" },
        ]}
        onTicketListRender={listRenders.onRender}
      />,
    );
    listRenders.reset();

    await user.type(
      screen.getByRole("textbox", { name: "Notatka wewnętrzna" }),
      "Oddzwonić jutro",
    );

    expect(screen.getByText("Błąd płatności")).toBeInTheDocument();
    expect(screen.getByText("Zmiana adresu")).toBeInTheDocument();
    expect(listRenders.commits).toBe(0);
  });
});
