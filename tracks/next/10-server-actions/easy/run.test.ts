import { describe, expect, it } from "vitest";
import { parseProjectForm } from "./starter";

function form(title: FormDataEntryValue, budget: FormDataEntryValue) {
  const data = new FormData();
  data.set("title", title);
  data.set("budget", budget);
  return data;
}

describe("parseProjectForm", () => {
  it("normalizuje poprawne dane", () => {
    expect(parseProjectForm(form("  Migracja API  ", "1200.50"))).toEqual({
      ok: true,
      value: { title: "Migracja API", budget: 1200.5 },
    });
  });

  it("zbiera błędy obu pól", () => {
    expect(parseProjectForm(form("x", "-3"))).toEqual({
      ok: false,
      fieldErrors: {
        title: "Tytuł musi mieć od 3 do 80 znaków",
        budget: "Budżet musi być nieujemną liczbą",
      },
    });
  });

  it("odrzuca File i nieskończoność", () => {
    expect(parseProjectForm(form(new File(["x"], "title.txt"), "Infinity"))).toMatchObject({
      ok: false,
      fieldErrors: { title: expect.any(String), budget: expect.any(String) },
    });
  });
});
