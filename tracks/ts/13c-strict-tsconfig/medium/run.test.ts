import { describe, expect, it } from "vitest";
import {
  applyProfilePatch,
  hasProfileChanges,
  type Profile,
  type ProfilePatch,
} from "./starter";

const profile: Profile = {
  displayName: "Ala",
  avatarUrl: "https://img.test/a.png",
};

describe("ProfilePatch", () => {
  it("undefined nie jest legalnym substytutem braku klucza", () => {
    const illegal = (): ProfilePatch =>
      // @ts-expect-error flaga exactOptionalPropertyTypes odróżnia brak od undefined
      ({ displayName: undefined });
    expect(illegal).toBeTypeOf("function");
  });

  it("nakłada tylko obecne klucze bez mutacji", () => {
    expect(applyProfilePatch(profile, { displayName: "Ola" })).toEqual({
      ...profile,
      displayName: "Ola",
    });
    expect(profile.displayName).toBe("Ala");
  });

  it("jawny null usuwa avatar, pusty patch nic nie zmienia", () => {
    expect(applyProfilePatch(profile, { avatarUrl: null }).avatarUrl).toBeNull();
    const unchanged = applyProfilePatch(profile, {});
    expect(unchanged).toEqual(profile);
    expect(unchanged).not.toBe(profile);
  });

  it("rozpoznaje obecność zmiany, w tym null", () => {
    expect(hasProfileChanges({})).toBe(false);
    expect(hasProfileChanges({ avatarUrl: null })).toBe(true);
  });
});
