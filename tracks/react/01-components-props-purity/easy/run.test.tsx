import { describe, expect, it } from "vitest";
import {
  render,
  screen,
  within,
} from "@harness/react-test";
import {
  ProfileCard,
  type ProfileCardProps,
} from "./starter";

describe("ProfileCard", () => {
  it("renderuje semantyczną kartę z danymi użytkownika", () => {
    render(<ProfileCard name="Ala" role="Frontend Developer" online />);
    const card = screen.getByRole("article", { name: "Profil Ala" });

    expect(within(card).getByRole("heading", { name: "Ala" }))
      .toBeInTheDocument();
    expect(within(card).getByText("Frontend Developer")).toBeInTheDocument();
    expect(within(card).getByText("Dostępny")).toBeInTheDocument();
  });

  it("pokazuje Offline dla użytkownika niedostępnego", () => {
    render(<ProfileCard name="Ola" role="QA" online={false} />);

    expect(screen.getByText("Offline")).toBeInTheDocument();
    expect(screen.queryByText("Dostępny")).not.toBeInTheDocument();
  });

  it("propsy są kontraktem tylko do odczytu", () => {
    const illegal = (props: ProfileCardProps): void => {
      // @ts-expect-error komponent nie może zmieniać propsów rodzica
      props.name = "Inna osoba";
    };

    expect(illegal).toBeTypeOf("function");
  });
});
