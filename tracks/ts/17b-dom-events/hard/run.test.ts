// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { createActionHandler } from "./starter";

function setup(html: string, onAction = vi.fn()) {
  const container = document.createElement("div");
  container.innerHTML = html;
  container.addEventListener("click", createActionHandler(onAction));
  return { container, onAction };
}

describe("createActionHandler", () => {
  it("obsługuje kliknięcie zagnieżdżonego elementu", () => {
    const { container, onAction } = setup(`
      <button data-action="edit" data-id="42"><span>Edytuj</span></button>
    `);
    container.querySelector("span")?.dispatchEvent(
      new MouseEvent("click", { bubbles: true }),
    );
    expect(onAction).toHaveBeenCalledWith({ action: "edit", id: "42" });
  });

  it("obsługuje wszystkie dozwolone akcje", () => {
    const { container, onAction } = setup(`
      <button data-action="delete" data-id="1">Usuń</button>
      <button data-action="archive" data-id="2">Archiwizuj</button>
    `);
    container.querySelectorAll("button").forEach((button) =>
      button.dispatchEvent(new MouseEvent("click", { bubbles: true })),
    );
    expect(onAction.mock.calls).toEqual([
      [{ action: "delete", id: "1" }],
      [{ action: "archive", id: "2" }],
    ]);
  });

  it("ignoruje nieznane, niepełne i disabled akcje", () => {
    const { container, onAction } = setup(`
      <button data-action="share" data-id="1">Share</button>
      <button data-action="edit">Missing</button>
      <button data-action="delete" data-id="2" disabled>Disabled</button>
      <span>Plain</span>
    `);
    container.querySelectorAll("*").forEach((element) =>
      element.dispatchEvent(new MouseEvent("click", { bubbles: true })),
    );
    expect(onAction).not.toHaveBeenCalled();
  });
});
