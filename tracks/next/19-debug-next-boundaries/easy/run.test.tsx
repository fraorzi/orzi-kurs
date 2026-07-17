import { render, screen, waitFor } from "@harness/react-test";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HydrationClock } from "./starter";

describe("HydrationClock", () => {
  it("renderuje stabilny HTML serwera", () => {
    expect(renderToString(
      <HydrationClock initialText="12:00" getCurrentText={() => "12:01"} />,
    )).toContain("12:00");
  });

  it("aktualizuje wartość dopiero po montażu", async () => {
    render(<HydrationClock initialText="12:00" getCurrentText={() => "12:01"} />);
    await waitFor(() => expect(screen.getByText("12:01")).toBeInTheDocument());
  });
});
