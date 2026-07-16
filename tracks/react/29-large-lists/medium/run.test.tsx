import { describe, expect, it } from "vitest";
import {
  render,
  screen,
  within,
} from "@harness/react-test";
import { VirtualLog } from "./starter";

describe("VirtualLog", () => {
  it("renderuje widoczne wiersze i overscan przy zachowaniu pełnej wysokości", () => {
    const items = Array.from({ length: 1000 }, (_, index) => `Log ${index}`);
    render(
      <VirtualLog
        items={items}
        rowHeight={20}
        viewportHeight={60}
        scrollTop={400}
        overscan={1}
      />,
    );

    const list = screen.getByRole("list", { name: "Logi" });
    const rows = within(list).getAllByRole("listitem");
    expect(rows).toHaveLength(5);
    expect(rows[0]).toHaveTextContent("Log 19");
    expect(rows[4]).toHaveTextContent("Log 23");
    expect(screen.queryByText("Log 18")).not.toBeInTheDocument();
    expect(screen.queryByText("Log 24")).not.toBeInTheDocument();
    expect(rows[0]).toHaveAttribute("aria-posinset", "20");
    expect(rows[0]).toHaveAttribute("aria-setsize", "1000");
    expect(list.firstElementChild).toHaveStyle({
      height: "20000px",
      position: "relative",
    });
  });
});
