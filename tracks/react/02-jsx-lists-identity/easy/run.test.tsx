import { describe, expect, it } from "vitest";
import {
  render,
  screen,
  within,
} from "@harness/react-test";
import { InboxSummary } from "./starter";

describe("InboxSummary", () => {
  it("pokazuje nazwę użytkownika i pusty stan skrzynki", () => {
    render(<InboxSummary userName="Ala" unreadCount={0} />);
    const inbox = screen
      .getByRole("heading", { name: "Witaj, Ala" })
      .closest("section")!;

    expect(
      within(inbox).getByRole("heading", {
        name: "Witaj, Ala",
      }),
    ).toBeInTheDocument();
    expect(
      within(inbox).getByText("Brak nowych wiadomości"),
    ).toBeInTheDocument();
  });

  it("odmienia komunikat dla jednej wiadomości", () => {
    render(<InboxSummary userName="Ola" unreadCount={1} />);

    expect(
      screen.getByText("1 nowa wiadomość"),
    ).toBeInTheDocument();
  });

  it("pokazuje liczbę dla wielu wiadomości", () => {
    render(<InboxSummary userName="Jan" unreadCount={7} />);

    expect(
      screen.getByText("7 nowych wiadomości"),
    ).toBeInTheDocument();
  });
});
