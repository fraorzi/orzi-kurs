import { describe, expect, it } from "vitest";
import {
  render,
  screen,
  within,
} from "@harness/react-test";
import { ProfileCard } from "./starter";

describe("ProfileCard", () => {
  it("renderuje semantyczną kartę z danymi użytkownika", () => {
    render(
      <ProfileCard
        name="Ala"
        role="Frontend Developer"
        online
      />,
    );
    const card = screen.getByRole("article");

    expect(
      within(card).getByRole("heading", { name: "Ala" }),
    ).toBeInTheDocument();
    expect(
      within(card).getByText("Frontend Developer"),
    ).toBeInTheDocument();
    expect(
      within(card).getByText("Dostępny"),
    ).toBeInTheDocument();
  });

  it("pokazuje Offline dla użytkownika niedostępnego", () => {
    render(
      <ProfileCard name="Ola" role="QA" online={false} />,
    );

    expect(screen.getByText("Offline")).toBeInTheDocument();
    expect(
      screen.queryByText("Dostępny"),
    ).not.toBeInTheDocument();
  });
});
