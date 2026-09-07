// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LearningMap from "../app/components/roadmap/LearningMap";
import RoadmapPreview from "../app/components/roadmap/RoadmapPreview";
import { buildRoadmap } from "../app/lib/roadmap";
import type { TaskStatus } from "../app/lib/types";

vi.mock("motion/react", () => ({ useReducedMotion: () => false }));

function roadmap(status: TaskStatus = "not-started") {
  return buildRoadmap({
    tracks: [
      {
        id: "js",
        topics: [
          {
            id: "js/01-functions",
            title: "Funkcje",
            levels: [{ id: "easy", status, attempts: 0, masteryScore: 0 }],
          },
          {
            id: "js/02-scope",
            title: "Zakresy",
            levels: [{ id: "easy", status, attempts: 0, masteryScore: 0 }],
          },
        ],
      },
    ],
  });
}

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("roadmap UI", () => {
  it("updates the return arrow when a jump crosses the current island entirely", async () => {
    const { container } = render(
      <main>
        <LearningMap roadmap={roadmap()} />
      </main>,
    );
    const scroller = container.querySelector("main");
    const current = container.querySelector('[aria-current="step"]');
    if (!scroller || !current) throw new Error("Missing rendered map");
    Object.defineProperty(scroller, "scrollTo", { value: vi.fn() });
    vi.spyOn(scroller, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 0, 1000, 800));
    const bounds = vi
      .spyOn(current, "getBoundingClientRect")
      .mockReturnValue(new DOMRect(0, 900, 100, 100));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Wróć do aktualnego tematu" })).toHaveAttribute(
        "data-direction",
        "down",
      ),
    );
    bounds.mockReturnValue(new DOMRect(0, -200, 100, 100));
    fireEvent.scroll(scroller);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Wróć do aktualnego tematu" })).toHaveAttribute(
        "data-direction",
        "up",
      ),
    );
    bounds.mockReturnValue(new DOMRect(0, 300, 100, 100));
    fireEvent.scroll(scroller);
    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: "Wróć do aktualnego tematu" }),
      ).not.toBeInTheDocument(),
    );
  });
  it("links every island to its topic and identifies exactly one current step", () => {
    const { container } = render(<LearningMap roadmap={roadmap()} />);
    expect(container.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
    expect(screen.getByRole("link", { name: /Funkcje\. 0 z 1/ })).toHaveAttribute(
      "href",
      "/track/js/01-functions",
    );
    expect(screen.getByRole("link", { name: /Zakresy\. 0 z 1/ })).toHaveAttribute(
      "href",
      "/track/js/02-scope",
    );
    expect(screen.getByRole("link", { name: /Zakresy\. 0 z 1/ })).not.toHaveAttribute(
      "aria-disabled",
    );
  });

  it("opens the custom course menu by keyboard and restores focus on Escape", () => {
    render(<LearningMap roadmap={roadmap()} />);
    const trigger = screen.getByRole("button", { name: "Wybierz kurs, JavaScript" });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(screen.getByRole("menu", { name: "Kursy na roadmapie" })).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio")).toHaveFocus();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("shows completion without a misleading next-topic button", () => {
    render(<LearningMap roadmap={roadmap("passed-with-hint")} />);
    expect(screen.getByRole("heading", { name: "Cała mapa za Tobą" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Otwórz temat" })).not.toBeInTheDocument();
  });

  it("uses the same real progress in the home preview", () => {
    render(<RoadmapPreview roadmap={roadmap("passed")} />);
    expect(screen.getByRole("heading", { name: "Cała mapa za Tobą." })).toBeInTheDocument();
    expect(screen.getByText("2 / 2 tematów ukończonych")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Otwórz roadmapę w swoim aktualnym miejscu" }),
    ).toHaveAttribute("href", "/roadmap");
  });
});
