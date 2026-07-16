import { describe, expect, it } from "vitest";
import {
  applyProfilePatch,
  toProfilePreview,
  type Profile,
} from "./starter";

const profile: Profile = {
  id: 1,
  name: "Ala",
  email: "ala@example.com",
  role: "admin",
};

describe("toProfilePreview", () => {
  it("akceptuje strukturalnie szerszą zmienną, ale nie wycieka pól", () => {
    expect(toProfilePreview(profile)).toEqual({ id: 1, name: "Ala" });
  });

  it("świeży literał z nieznanym polem jest błędem", () => {
    const illegal = (): unknown =>
      // @ts-expect-error token nie należy do ProfilePreview
      toProfilePreview({ id: 1, name: "Ala", token: "sekret" });
    expect(illegal).toBeTypeOf("function");
  });
});

describe("applyProfilePatch", () => {
  it("aktualizuje dozwolone pola bez mutacji", () => {
    const next = applyProfilePatch(profile, { name: "Ola" });
    expect(next).toEqual({ ...profile, name: "Ola" });
    expect(profile.name).toBe("Ala");
  });

  it("pusty patch zachowuje dane w nowym obiekcie", () => {
    const next = applyProfilePatch(profile, {});
    expect(next).toEqual(profile);
    expect(next).not.toBe(profile);
  });

  it("weak type odrzuca zmienną bez wspólnego pola", () => {
    const unrelated = { active: true };
    const illegal = (): Profile =>
      // @ts-expect-error brak wspólnych właściwości z ProfilePatch
      applyProfilePatch(profile, unrelated);
    expect(illegal).toBeTypeOf("function");
  });
});
